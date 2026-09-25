<?php

require_once '../admin/auth_guard.php';
require_page_access('account_management');

use Parse\ParseQuery;
use Parse\ParseException;

// Only BLT may hand out staff roles or permanently delete an account;
// Süper admin can still use this page for search/suspend.
$canManageRoles = $staffRole === STAFF_ROLE_FULL_ACCESS;

$searchedUser = null;
$searchError = null;
$actionMessage = null;
$actionError = null;

// SEARCH ------------------------------------------------
if (isset($_POST['search_username']) && $_POST['search_username'] !== '') {
    $searchUsername = trim($_POST['search_username']);
    try {
        $query = new ParseQuery('_User');
        $query->equalTo('username', $searchUsername);
        $searchedUser = $query->first(true);
        if (!$searchedUser) {
            $searchError = 'No user found with username "' . htmlspecialchars($searchUsername) . '".';
        }
    } catch (ParseException $e) {
        $searchError = $e->getMessage();
    }
}

// SET STAFF ROLE ------------------------------------------
if ($canManageRoles && isset($_POST['role_target_id'])) {
    try {
        $query = new ParseQuery('_User');
        $target = $query->get($_POST['role_target_id'], true);

        $newRole = $_POST['new_staff_role'];
        if ($newRole === '') {
            $target->set('staff_role', null);
        } else {
            $target->set('staff_role', $newRole);
        }
        $target->save(true);

        $actionMessage = 'Updated role for ' . htmlspecialchars($target->get('username')) . '.';
        $searchedUser = $target;
    } catch (ParseException $e) {
        $actionError = $e->getMessage();
    }
}

// TOGGLE SUSPEND/ACTIVATE ----------------------------------
if (isset($_POST['suspend_target_id'])) {
    try {
        $query = new ParseQuery('_User');
        $target = $query->get($_POST['suspend_target_id'], true);

        $currentlyDisabled = $target->get('activationStatus') === true;
        $target->set('activationStatus', !$currentlyDisabled);
        $target->save(true);

        $actionMessage = htmlspecialchars($target->get('username')) . ' is now ' .
            (!$currentlyDisabled ? 'SUSPENDED' : 'ACTIVE') . '.';
        $searchedUser = $target;
    } catch (ParseException $e) {
        $actionError = $e->getMessage();
    }
}

// DELETE ACCOUNT --------------------------------------------
if ($canManageRoles && isset($_POST['delete_target_id'])) {
    try {
        $query = new ParseQuery('_User');
        $target = $query->get($_POST['delete_target_id'], true);
        $deletedUsername = $target->get('username');
        $target->destroy(true);

        $actionMessage = 'Deleted account ' . htmlspecialchars($deletedUsername) . '.';
        $searchedUser = null;
    } catch (ParseException $e) {
        $actionError = $e->getMessage();
    }
}

// ALL CURRENT STAFF ------------------------------------------
$staffAccounts = [];
try {
    $query = new ParseQuery('_User');
    $query->containedIn('staff_role', ALL_STAFF_ROLES);
    $query->descending('createdAt');
    $staffAccounts = $query->find(true);
} catch (ParseException $e) {
}

?>

<div class="page-wrapper">
    <div class="row page-titles">
        <div class="col">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Management</a></li>
                <li class="breadcrumb-item active">Account Management</li>
            </ol>
        </div>
    </div>

    <div class="container-fluid">

        <?php if ($actionMessage): ?>
            <div class="alert alert-success"><?php echo $actionMessage; ?></div>
        <?php endif; ?>
        <?php if ($actionError): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($actionError); ?></div>
        <?php endif; ?>
        <?php if ($searchError): ?>
            <div class="alert alert-warning"><?php echo $searchError; ?></div>
        <?php endif; ?>

        <div class="row">
            <div class="col-12 col-md-8" style="margin-left:auto; margin-right:auto;">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Find an account</h4>
                        <form class="form-inline" method="post" action="">
                            <input type="text" class="form-control mr-2" name="search_username" placeholder="Exact username" required style="min-width:220px;">
                            <button type="submit" class="btn text-white" style="background:#5d0375;">Search</button>
                        </form>
                    </div>
                </div>

                <?php if ($searchedUser):
                    $isDisabled = $searchedUser->get('activationStatus') === true;
                    $currentRole = $searchedUser->get('staff_role') ?? '';
                    ?>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">
                                <?php echo htmlspecialchars($searchedUser->get('name') ?? $searchedUser->get('username')); ?>
                                (@<?php echo htmlspecialchars($searchedUser->get('username')); ?>)
                            </h4>
                            <p>
                                Email: <?php echo htmlspecialchars($searchedUser->get('email') ?? '-'); ?><br>
                                Coins: <?php echo (int)$searchedUser->get('credit'); ?><br>
                                Agency role: <?php echo htmlspecialchars($searchedUser->get('agency_role') ?? 'no_agency'); ?><br>
                                Current staff role: <strong><?php echo $currentRole !== '' ? htmlspecialchars(staff_role_label($currentRole)) : 'None'; ?></strong><br>
                                Account status:
                                <?php if ($isDisabled): ?>
                                    <span class="badge badge-danger">Suspended</span>
                                <?php else: ?>
                                    <span class="badge badge-success">Active</span>
                                <?php endif; ?>
                            </p>

                            <?php if ($canManageRoles): ?>
                                <form method="post" action="" class="form-inline mb-3">
                                    <input type="hidden" name="role_target_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                    <select name="new_staff_role" class="form-control mr-2">
                                        <option value="">-- No staff role --</option>
                                        <?php foreach (ALL_STAFF_ROLES as $roleCode): ?>
                                            <option value="<?php echo $roleCode; ?>" <?php echo $currentRole === $roleCode ? 'selected' : ''; ?>>
                                                <?php echo htmlspecialchars(staff_role_label($roleCode)); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <button type="submit" class="btn text-white" style="background:#5d0375;">Set role</button>
                                </form>
                            <?php endif; ?>

                            <form method="post" action="" style="display:inline;">
                                <input type="hidden" name="suspend_target_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                <button type="submit" class="btn btn-sm text-white" style="background:<?php echo $isDisabled ? '#27ae60' : '#c0392b'; ?>;">
                                    <?php echo $isDisabled ? 'Reactivate account' : 'Suspend account'; ?>
                                </button>
                            </form>

                            <?php if ($canManageRoles): ?>
                                <form method="post" action="" style="display:inline;" onsubmit="return confirm('Permanently delete this account? This cannot be undone.');">
                                    <input type="hidden" name="delete_target_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                    <button type="submit" class="btn btn-sm btn-dark">Delete account</button>
                                </form>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <div class="row">
            <div class="col-lg">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Current staff accounts</h4>
                        <div class="table-responsive">
                            <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                <thead class="bg-light">
                                <tr>
                                    <th style="color:#242526;">Name</th>
                                    <th style="color:#242526;">Username</th>
                                    <th style="color:#242526;">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($staffAccounts as $staff): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($staff->get('name') ?? '-'); ?></td>
                                        <td><?php echo htmlspecialchars($staff->get('username')); ?></td>
                                        <td><?php echo htmlspecialchars(staff_role_label($staff->get('staff_role'))); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
