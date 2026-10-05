<?php

namespace App\Services\Kv;

use App\Models\User;
use Illuminate\Support\Facades\Schema;

/**
 * The template's SQL-imported `users` table has extra NOT NULL columns without defaults (type, status, …).
 * When Kervea creates an account we fill them exactly like the template does (customer: type=customer,status=1;
 * admin: type=admin,status=0) and give any other required column a harmless empty value, so inserts never fail.
 */
class LegacyUserColumns
{
    private const OWN = ['id', 'name', 'email', 'password', 'role'];

    public static function apply(User $user, string $kind = 'customer'): void
    {
        $columns = collect(Schema::getColumns('users'))->keyBy('name');
        $known = $kind === 'admin' ? ['type' => 'admin', 'status' => 0] : ['type' => 'customer', 'status' => 1];

        foreach ($known as $name => $value) {
            if ($columns->has($name) && $user->getAttribute($name) === null) {
                $user->setAttribute($name, $value);
            }
        }
        foreach ($columns as $name => $c) {
            if (in_array($name, self::OWN, true) || $user->getAttribute($name) !== null) {
                continue;
            }
            if (($c['nullable'] ?? true) || ($c['default'] ?? null) !== null || ! empty($c['auto_increment'])) {
                continue;
            }
            $user->setAttribute($name, self::emptyValue(strtolower((string) ($c['type_name'] ?? $c['type'] ?? ''))));
        }
    }

    private static function emptyValue(string $type): mixed
    {
        return match (true) {
            (bool) preg_match('/int|decimal|numeric|float|double|real|bool|bit/', $type) => 0,
            (bool) preg_match('/timestamp|datetime|date|time|year/', $type) => now(),
            str_contains($type, 'json') => '[]',
            default => '',
        };
    }
}
