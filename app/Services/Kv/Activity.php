<?php

namespace App\Services\Kv;

use App\Models\Kv\ActivityEntry;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * Activity log of a member company ("Aktivite" tab, visible to people with the `team` permission).
 *
 *   Activity::log($companyId, $userId, 'team.invite', ['name' => 'Ayşe', 'role' => 'ops']);
 *
 * Other panel features call it only as  if (class_exists(\App\Services\Kv\Activity::class)) { \App\Services\Kv\Activity::log(...); }
 * Logging must never break the action it describes: every failure is swallowed (and reported without the metadata).
 * Never put secrets (tokens, passwords, e-mail bodies) into $meta; strings are cut at 160 characters.
 */
class Activity
{
    /** Actions that exist today (free text is accepted: features of the panel may add their own). */
    public const KNOWN = [
        'team.invite', 'team.resend', 'team.update', 'team.remove', 'team.disable', 'team.enable',
        'credits.purchase', 'credits.grant', 'person.reveal', 'firm.reveal', 'consent.change',
        'profile.update', 'doc.upload', 'message.start', 'auth.login',
    ];

    public static function log(?int $companyId, ?int $userId, string $action, array $meta = []): void
    {
        try {
            $action = mb_substr((string) preg_replace('/[^A-Za-z0-9._-]/', '', $action), 0, 40);
            if ($action === '') {
                return;
            }
            $ip = null;
            if (! app()->runningInConsole() || app()->runningUnitTests()) {
                $ip = app()->bound('request') ? (mb_substr((string) request()->ip(), 0, 45) ?: null) : null;
            }
            ActivityEntry::create([
                'company_id' => $companyId,
                'user_id' => $userId,
                'action' => $action,
                'meta' => $meta ? self::clean($meta) : null,
                'ip' => $ip,
            ]);
        } catch (\Throwable $e) {
            Log::warning('kv: activity log failed', ['action' => $action ?? '', 'err' => $e->getMessage()]);
        }
    }

    /** The newest entries of one company, newest first, with the acting person's name (never an e-mail or an IP). */
    public static function recent(int $companyId, int $limit = 100): array
    {
        $rows = ActivityEntry::where('company_id', $companyId)->orderByDesc('id')->limit(max(1, min(500, $limit)))->get();
        $names = User::whereIn('id', $rows->pluck('user_id')->filter()->unique()->all())->pluck('name', 'id');
        return $rows->map(function (ActivityEntry $r) use ($names) {
            $meta = $r->meta ?: [];
            $support = ! empty($meta['support']);          // an admin acted for Kervea support: never expose the admin's identity
            return [
                'id' => $r->id,
                'action' => $r->action,
                'meta' => (object) $meta,
                'at' => $r->created_at?->toIso8601String(),
                'user_id' => $support ? null : $r->user_id,
                'by' => $support ? null : ($r->user_id ? ($names[$r->user_id] ?? null) : null),
                'support' => $support,
            ];
        })->values()->all();
    }

    /** @param list<int> $userIds @return array<int, string> user id => ISO time of the last sign-in */
    public static function lastLogins(array $userIds): array
    {
        if (! $userIds) {
            return [];
        }
        return ActivityEntry::where('action', 'auth.login')->whereIn('user_id', $userIds)
            ->selectRaw('user_id, max(created_at) as last_at')->groupBy('user_id')->pluck('last_at', 'user_id')
            ->map(fn ($t) => Carbon::parse($t)->toIso8601String())->all();     // stored in the app time zone, parsed back in it
    }

    public static function prune(int $days): int
    {
        return ActivityEntry::where('created_at', '<', now()->subDays(max(1, $days)))->delete();
    }

    /** scalars and (shallow) lists only, strings shortened, at most ~1.5 KB of JSON. */
    private static function clean(array $meta, int $depth = 0): array
    {
        $out = [];
        foreach (array_slice($meta, 0, 20, true) as $k => $v) {
            $k = is_int($k) ? $k : mb_substr((string) preg_replace('/[^A-Za-z0-9_.-]/', '', (string) $k), 0, 40);
            if (is_string($v)) {
                $out[$k] = mb_substr($v, 0, 160);
            } elseif (is_int($v) || is_float($v) || is_bool($v) || $v === null) {
                $out[$k] = $v;
            } elseif (is_array($v) && $depth < 1) {
                $out[$k] = self::clean($v, $depth + 1);
            }
        }
        while ($out && strlen((string) json_encode($out, JSON_UNESCAPED_UNICODE)) > 1500) {
            array_pop($out);
        }
        return $out;
    }
}
