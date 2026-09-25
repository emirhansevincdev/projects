<?php

/**
 * Shared session + role guard for role-gated dashboard pages.
 *
 * Usage, at the very top of a dashboard page (before any HTML output):
 *
 *   require_once '../admin/auth_guard.php';
 *   require_page_access('coins_panel');
 *
 * $currUser and $staffRole are available afterwards for the page to use.
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Configs.php';
require_once __DIR__ . '/roles_config.php';

use Parse\ParseUser;

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$currUser = ParseUser::getCurrentUser();

if (!$currUser) {
    header('Refresh:0; url=../index.php');
    exit;
}

$staffRole = $currUser->get('staff_role');

// Backward compatibility: accounts created before this role system existed
// only carry the old flat role === 'admin' flag. Treat them as full access
// (BLT) so the existing admin account is never locked out.
if (empty($staffRole) && $currUser->get('role') === 'admin') {
    $staffRole = STAFF_ROLE_FULL_ACCESS;
}

if (empty($staffRole) || !in_array($staffRole, DASHBOARD_ROLES, true)) {
    header('Refresh:0; url=../auth/logout.php');
    exit;
}

$_SESSION['token'] = $currUser->getSessionToken();

/**
 * Redirects away from the current page if $staffRole may not access
 * $pageKey (see admin/roles_config.php). Call once, right after including
 * this file, on any page that should be restricted to specific roles.
 */
function require_page_access(string $pageKey): void
{
    global $staffRole;
    if (!staff_role_can_access($staffRole, $pageKey)) {
        header('Refresh:0; url=../dashboard/panel.php');
        exit;
    }
}
