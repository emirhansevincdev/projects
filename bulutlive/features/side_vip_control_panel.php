<?php

require_once '../admin/auth_guard.php';
require_page_access('vip_control_panel');

use Parse\ParseQuery;
use Parse\ParseException;

// Maps the panel's tier codes to the actual field names the app already
// reads (UserModel.keyNormalVip / keySuperVip / keyDiamondVip). "Diamond"
// is this app's Aristokrasi tier.
const VIP_TIERS = [
    'normal_vip' => 'VIP',
    'super_vip' => 'SVIP',
    'diamond_vip' => 'Aristokrasi',
];

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

// GRANT / EXTEND A TIER --------------------------------------
if (isset($_POST['grant_target_id']) && isset($_POST['tier']) && isset($_POST['days'])) {
    $tier = $_POST['tier'];
    $days = (int)$_POST['days'];

    if (!array_key_exists($tier, VIP_TIERS)) {
        $actionError = 'Unknown tier.';
    } elseif ($days <= 0) {
        $actionError = 'Days must be greater than zero.';
    } else {
        try {
            $query = new ParseQuery('_User');
            $target = $query->get($_POST['grant_target_id'], true);

            $existing = $target->get($tier);
            $now = new \DateTime();
            $base = ($existing instanceof \DateTime && $existing > $now) ? $existing : $now;
            $newExpiry = (clone $base)->modify('+' . $days . ' days');

            $target->set($tier, $newExpiry);
            $target->save(true);

            $actionMessage = htmlspecialchars($target->get('username')) . ' now has ' .
                VIP_TIERS[$tier] . ' until ' . $newExpiry->format('d/m/Y') . '.';
            $searchedUser = $target;
        } catch (ParseException $e) {
            $actionError = $e->getMessage();
        }
    }
}

// REVOKE A TIER -----------------------------------------------
if (isset($_POST['revoke_target_id']) && isset($_POST['revoke_tier'])) {
    $tier = $_POST['revoke_tier'];
    if (array_key_exists($tier, VIP_TIERS)) {
        try {
            $query = new ParseQuery('_User');
            $target = $query->get($_POST['revoke_target_id'], true);
            $target->delete($tier);
            $target->save(true);

            $actionMessage = VIP_TIERS[$tier] . ' revoked for ' . htmlspecialchars($target->get('username')) . '.';
            $searchedUser = $target;
        } catch (ParseException $e) {
            $actionError = $e->getMessage();
        }
    }
}

function tierStatus($user, $tierField)
{
    $expiry = $user->get($tierField);
    if ($expiry instanceof \DateTime && $expiry > new \DateTime()) {
        return 'Active until ' . $expiry->format('d/m/Y H:i');
    }
    return 'Not active';
}

?>

<div class="page-wrapper">
    <div class="row page-titles">
        <div class="col">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Management</a></li>
                <li class="breadcrumb-item active">VIP / SVIP / Aristokrasi</li>
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
                        <h4 class="card-title">Find a user</h4>
                        <form class="form-inline" method="post" action="">
                            <input type="text" class="form-control mr-2" name="search_username" placeholder="Exact username" required style="min-width:220px;">
                            <button type="submit" class="btn text-white" style="background:#5d0375;">Search</button>
                        </form>
                    </div>
                </div>

                <?php if ($searchedUser): ?>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">
                                <?php echo htmlspecialchars($searchedUser->get('name') ?? $searchedUser->get('username')); ?>
                                (@<?php echo htmlspecialchars($searchedUser->get('username')); ?>)
                            </h4>

                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Tier</th>
                                    <th>Status</th>
                                    <th>Grant / extend</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach (VIP_TIERS as $field => $label): ?>
                                    <tr>
                                        <td><strong><?php echo $label; ?></strong></td>
                                        <td><?php echo tierStatus($searchedUser, $field); ?></td>
                                        <td>
                                            <form method="post" action="" class="form-inline">
                                                <input type="hidden" name="grant_target_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                                <input type="hidden" name="tier" value="<?php echo $field; ?>">
                                                <input type="number" min="1" name="days" class="form-control mr-2" placeholder="Days" required style="width:100px;">
                                                <button type="submit" class="btn btn-sm text-white" style="background:#5d0375;">Grant/Extend</button>
                                            </form>
                                        </td>
                                        <td>
                                            <form method="post" action="">
                                                <input type="hidden" name="revoke_target_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                                <input type="hidden" name="revoke_tier" value="<?php echo $field; ?>">
                                                <button type="submit" class="btn btn-sm btn-outline-danger">Revoke</button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>

    </div>
</div>
