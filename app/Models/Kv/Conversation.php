<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** One conversation per pair of companies. company_a_id is always the smaller id. */
class Conversation extends Model
{
    protected $table = 'kv_conversations';
    protected $guarded = ['id'];
    protected $casts = [
        'last_message_at' => 'datetime', 'a_archived_at' => 'datetime', 'b_archived_at' => 'datetime',
        'a_notified_at' => 'datetime', 'b_notified_at' => 'datetime',
    ];

    public function companyA() { return $this->belongsTo(Company::class, 'company_a_id'); }
    public function companyB() { return $this->belongsTo(Company::class, 'company_b_id'); }
    public function messages() { return $this->hasMany(Message::class, 'conversation_id'); }

    /** Canonical order of a pair of company ids. @return array{0:int,1:int} */
    public static function pair(int $x, int $y): array
    {
        return $x < $y ? [$x, $y] : [$y, $x];
    }

    public static function between(int $x, int $y): ?self
    {
        [$a, $b] = self::pair($x, $y);
        return static::where('company_a_id', $a)->where('company_b_id', $b)->first();
    }

    public function involves(int $companyId): bool
    {
        return (int) $this->company_a_id === $companyId || (int) $this->company_b_id === $companyId;
    }

    /** 'a' or 'b' for the given participant (null when the company is not part of the conversation). */
    public function side(int $companyId): ?string
    {
        return (int) $this->company_a_id === $companyId ? 'a' : ((int) $this->company_b_id === $companyId ? 'b' : null);
    }

    public function otherId(int $companyId): int
    {
        return (int) $this->company_a_id === $companyId ? (int) $this->company_b_id : (int) $this->company_a_id;
    }

    public function isArchivedFor(int $companyId): bool
    {
        $s = $this->side($companyId);
        return $s !== null && $this->{$s.'_archived_at'} !== null;
    }

    public function lastReadFor(int $companyId): int
    {
        $s = $this->side($companyId);
        return $s === null ? 0 : (int) $this->{$s.'_last_read_message_id'};
    }
}
