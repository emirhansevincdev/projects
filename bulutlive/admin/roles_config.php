<?php

/**
 * Central definition of the staff/admin role system.
 *
 * A staff account is a Parse "_User" row with a "staff_role" field set to
 * one of the codes below. Roles G (Gifter/Destekçi) and V (Yayıncı) are
 * app-facing badges only (shown on a user's profile in the app) and never
 * grant dashboard access — they are listed here only so
 * staff_role_label() can render them wherever a user's role badge is shown.
 *
 * BLT (Tam yetki) always has access to every page, regardless of what the
 * permission matrix below says, and is the only role allowed to change
 * another account's staff_role (see account_management.php).
 */

const STAFF_ROLE_FULL_ACCESS = 'BLT';       // Tam yetki
const STAFF_ROLE_SUPER_ADMIN = 'SY';        // Süper admin
const STAFF_ROLE_ADMIN = 'Y';               // Admin
const STAFF_ROLE_COIN_SELLER = 'CS';        // Coins satıcısı
const STAFF_ROLE_AGENCY_OWNER = 'R';        // Ajans sahibi
const STAFF_ROLE_GIFTER = 'G';              // Gifter (Destekçi) - app badge only
const STAFF_ROLE_STREAMER = 'V';            // Yayıncı - app badge only

// Roles that are allowed to log into this dashboard at all.
const DASHBOARD_ROLES = [
    STAFF_ROLE_FULL_ACCESS,
    STAFF_ROLE_SUPER_ADMIN,
    STAFF_ROLE_ADMIN,
    STAFF_ROLE_COIN_SELLER,
    STAFF_ROLE_AGENCY_OWNER,
];

// Every assignable role code, dashboard or app-badge-only, in display order.
const ALL_STAFF_ROLES = [
    STAFF_ROLE_FULL_ACCESS,
    STAFF_ROLE_SUPER_ADMIN,
    STAFF_ROLE_ADMIN,
    STAFF_ROLE_COIN_SELLER,
    STAFF_ROLE_AGENCY_OWNER,
    STAFF_ROLE_GIFTER,
    STAFF_ROLE_STREAMER,
];

function staff_role_label(string $role): string
{
    switch ($role) {
        case STAFF_ROLE_FULL_ACCESS:
            return 'Tam yetki (BLT)';
        case STAFF_ROLE_SUPER_ADMIN:
            return 'Süper admin (SY)';
        case STAFF_ROLE_ADMIN:
            return 'Admin (Y)';
        case STAFF_ROLE_COIN_SELLER:
            return 'Coins satıcısı (CS)';
        case STAFF_ROLE_AGENCY_OWNER:
            return 'Ajans sahibi (R)';
        case STAFF_ROLE_GIFTER:
            return 'Gifter / Destekçi (G)';
        case STAFF_ROLE_STREAMER:
            return 'Yayıncı (V)';
        default:
            return $role;
    }
}

/**
 * page key => roles allowed to see/use that page, besides BLT which can
 * always access everything. Add a page's key here (and to
 * left_sidebar_admin.php) when a new role-gated page is added.
 */
const PAGE_PERMISSIONS = [
    'coins_panel' => [STAFF_ROLE_SUPER_ADMIN, STAFF_ROLE_COIN_SELLER],
    'agency_panel' => [STAFF_ROLE_SUPER_ADMIN, STAFF_ROLE_ADMIN, STAFF_ROLE_AGENCY_OWNER],
    'account_management' => [STAFF_ROLE_SUPER_ADMIN],
    'team_chat' => [STAFF_ROLE_SUPER_ADMIN, STAFF_ROLE_ADMIN, STAFF_ROLE_COIN_SELLER, STAFF_ROLE_AGENCY_OWNER],
    'vip_control_panel' => [STAFF_ROLE_SUPER_ADMIN, STAFF_ROLE_ADMIN],
];

function staff_role_can_access(string $role, string $pageKey): bool
{
    if ($role === STAFF_ROLE_FULL_ACCESS) {
        return true;
    }

    if (!isset(PAGE_PERMISSIONS[$pageKey])) {
        // Unknown page key: default to the pre-existing behaviour of this
        // panel (any logged-in dashboard role can see general pages).
        return in_array($role, DASHBOARD_ROLES, true);
    }

    return in_array($role, PAGE_PERMISSIONS[$pageKey], true);
}
