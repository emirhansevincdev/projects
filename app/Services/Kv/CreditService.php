<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\CreditLedger;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * THE credit ledger. Nobody else writes kv_credit_ledger or kv_companies.credit_balance.
 *
 * Rules
 *  - Credits belong to a COMPANY (its whole team shares them); every call names the company explicitly.
 *  - Every change is ONE transaction: lock the company row (SELECT … FOR UPDATE) → re-check the idempotency key →
 *    guarded UPDATE (credit_balance must still be what we read) → ledger row with balance_after. SUM(delta) == balance.
 *  - Never negative: spend() throws InsufficientCreditsException before anything is written.
 *  - Idempotent: a grant/spend carrying a `key` is applied at most once, however often (and however concurrently) it is
 *    retried; the second call returns the original ledger row with applied=false. The key is also UNIQUE in the table.
 *  - Amounts come from config('kervea.credits'), never from the browser.
 *
 * Options ($o): user_id (actor), ref_type + ref_id (what it was for), key (idempotency), meta (array), silent (no Activity log).
 */
class CreditService
{
    /** @return int current balance (0 for an unknown company) */
    public static function balance(int $companyId): int
    {
        return (int) (DB::table('kv_companies')->where('id', $companyId)->value('credit_balance') ?? 0);
    }

    /** @return array{applied: bool, balance: int, entry: CreditLedger} */
    public static function grant(int $companyId, int $amount, string $reason, array $o = []): array
    {
        if ($amount < 1) {
            throw new \InvalidArgumentException('grant() needs a positive amount');
        }
        return self::apply($companyId, $amount, $reason, $o);
    }

    /**
     * @return array{applied: bool, balance: int, entry: CreditLedger}
     * @throws InsufficientCreditsException when the balance is too low (nothing is written)
     */
    public static function spend(int $companyId, int $amount, string $reason, array $o = []): array
    {
        if ($amount < 1) {
            throw new \InvalidArgumentException('spend() needs a positive amount');
        }
        return self::apply($companyId, -$amount, $reason, $o);
    }

    /** Signed manual correction by an admin (reason text is mandatory and kept in the ledger meta). */
    public static function adjust(int $companyId, int $delta, string $note, int $adminUserId, ?string $key = null): array
    {
        $note = trim($note);
        if ($delta === 0 || $note === '') {
            throw new \InvalidArgumentException('adjust() needs a non-zero delta and a reason');
        }
        $o = ['user_id' => $adminUserId, 'key' => $key, 'meta' => ['note' => mb_substr($note, 0, 255)]];
        return $delta > 0 ? self::grant($companyId, $delta, 'admin_adjust', $o) : self::spend($companyId, -$delta, 'admin_adjust', $o);
    }

    /** The signup gift for an approved company ("üye olduğunda otomatik 50 kredi"): once per company, ever. */
    public static function grantSignup(Company $company, ?int $actorId = null, bool $silent = false): array
    {
        $amount = (int) config('kervea.credits.signup', 0);
        if ($amount < 1) {
            return ['applied' => false, 'balance' => self::balance($company->id), 'entry' => null];
        }
        return self::grant($company->id, $amount, 'signup', [
            'user_id' => $actorId, 'key' => 'signup:'.$company->id, 'ref_type' => 'company', 'ref_id' => $company->id, 'silent' => $silent,
        ]);
    }

    /** Backfill for companies approved before credits existed. Idempotent. @return int how many companies received credits now */
    public static function backfillSignup(bool $dryRun = false): int
    {
        $n = 0;
        $given = CreditLedger::where('reason', 'signup')->pluck('company_id')->flip();
        Company::where('status', Company::STATUS_APPROVED)->orderBy('id')->chunkById(200, function ($rows) use (&$n, $given, $dryRun) {
            foreach ($rows as $c) {
                if ($given->has($c->id)) {
                    continue;
                }
                if ($dryRun) {
                    $n++;
                    continue;
                }
                if (self::grantSignup($c, null, true)['applied']) {
                    $n++;
                }
            }
        });
        return $n;
    }

    /** Newest first. @return Collection<int, CreditLedger> */
    public static function recent(int $companyId, int $limit = 50): Collection
    {
        return CreditLedger::where('company_id', $companyId)->orderByDesc('id')->limit(max(1, min(500, $limit)))->get();
    }

    /** Reconciliation: does the ledger add up to the stored balance? */
    public static function audit(int $companyId): array
    {
        $sum = (int) CreditLedger::where('company_id', $companyId)->sum('delta');
        $bal = self::balance($companyId);
        return ['sum' => $sum, 'balance' => $bal, 'ok' => $sum === $bal];
    }

    // ── packs / prices (config only) ─────────────────────────────────────────────

    /** Credit packs for display and purchase: [{pack, credits, price_usd, price_cents, per_credit, save_pct}] sorted by size. */
    public static function packs(): array
    {
        $cfg = (array) config('kervea.credits.packs', []);
        ksort($cfg);
        $out = [];
        $basePer = null;
        foreach ($cfg as $credits => $usd) {
            $credits = (int) $credits;
            $usd = (float) $usd;
            if ($credits < 1 || $usd <= 0) {
                continue;
            }
            $per = $usd / $credits;
            $basePer ??= $per;
            $out[] = [
                'pack' => (string) $credits, 'credits' => $credits, 'price_usd' => $usd, 'price_cents' => (int) round($usd * 100),
                'per_credit' => round($per, 4), 'save_pct' => $basePer > 0 ? max(0, (int) round((1 - $per / $basePer) * 100)) : 0,
            ];
        }
        return $out;
    }

    public static function pack(string|int|null $code): ?array
    {
        foreach (self::packs() as $p) {
            if ($p['pack'] === (string) $code) {
                return $p;
            }
        }
        return null;
    }

    /** Cost in credits of opening one channel of a person. */
    public static function revealCost(string $channel): int
    {
        return max(1, (int) config($channel === 'phone' ? 'kervea.credits.reveal_phone' : 'kervea.credits.reveal_email', 1));
    }

    // ── the one place that changes a balance ─────────────────────────────────────

    private static function apply(int $companyId, int $delta, string $reason, array $o): array
    {
        if (! in_array($reason, CreditLedger::REASONS, true)) {
            throw new \InvalidArgumentException("unknown credit reason {$reason}");
        }
        $key = isset($o['key']) && $o['key'] !== '' ? (string) $o['key'] : null;

        $run = function () use ($companyId, $delta, $reason, $o, $key): array {
            // 1) lock the company row: every credit operation of one company is serialised here
            $row = DB::table('kv_companies')->where('id', $companyId)->lockForUpdate()->first(['id', 'credit_balance']);
            if (! $row) {
                throw new \Illuminate\Database\Eloquent\ModelNotFoundException("company {$companyId} not found");
            }
            $bal = (int) $row->credit_balance;

            // 2) idempotency (after the lock, so a concurrent twin sees the committed original)
            if ($key !== null && ($ex = CreditLedger::where('idempotency_key', $key)->first())) {
                return ['applied' => false, 'balance' => $bal, 'entry' => $ex];
            }

            $new = $bal + $delta;
            if ($new < 0) {
                throw new InsufficientCreditsException($bal, -$delta);
            }
            // 3) guarded update: refuses to write if the balance moved since we read it (belt and braces; also covers engines without row locks)
            $n = DB::table('kv_companies')->where('id', $companyId)->where('credit_balance', $bal)->update(['credit_balance' => $new]);
            if ($n !== 1) {
                // the wording makes Laravel's transaction() treat it as a concurrency error and retry the whole closure
                throw new \Illuminate\Database\DeadlockException('Deadlock found when trying to get lock (credit balance changed concurrently)');
            }
            $entry = CreditLedger::create([
                'company_id' => $companyId, 'user_id' => $o['user_id'] ?? null, 'delta' => $delta, 'balance_after' => $new,
                'reason' => $reason, 'ref_type' => $o['ref_type'] ?? null, 'ref_id' => $o['ref_id'] ?? null,
                'idempotency_key' => $key, 'meta' => $o['meta'] ?? null, 'created_at' => now(),
            ]);
            return ['applied' => true, 'balance' => $new, 'entry' => $entry];
        };

        try {
            $res = DB::transaction($run, 5);   // retried on deadlocks / lock-wait timeouts
        } catch (UniqueConstraintViolationException $e) {
            // two requests with the same key raced past the check on an engine without row locks: the loser reads the winner's row
            if ($key !== null && ($ex = CreditLedger::where('idempotency_key', $key)->first())) {
                return ['applied' => false, 'balance' => self::balance($companyId), 'entry' => $ex];
            }
            throw $e;
        }

        if ($res['applied'] && empty($o['silent'])) {
            self::log($companyId, $o['user_id'] ?? null, $reason, $delta, $res['entry']);
        }
        return $res;
    }

    /** Activity feed entry (written by the TEAM feature, so only when it exists). Never lets logging break a credit operation. */
    private static function log(int $companyId, ?int $userId, string $reason, int $delta, CreditLedger $entry): void
    {
        $action = match (true) {
            $reason === 'purchase' => 'credits.purchase',
            $delta > 0 && $reason !== 'person_reveal' => 'credits.grant',
            default => null,
        };
        if ($action === null || ! class_exists(\App\Services\Kv\Activity::class)) {
            return;
        }
        DB::afterCommit(function () use ($companyId, $userId, $action, $reason, $delta, $entry) {
            try {
                \App\Services\Kv\Activity::log($companyId, $userId, $action, ['credits' => $delta, 'reason' => $reason, 'ledger_id' => $entry->id]);
            } catch (\Throwable $e) {
                Log::warning('kv: activity log failed', ['action' => $action, 'err' => $e->getMessage()]);
            }
        });
    }
}
