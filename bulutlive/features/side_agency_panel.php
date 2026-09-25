<?php

require_once '../admin/auth_guard.php';
require_page_access('agency_panel');

use Parse\ParseQuery;
use Parse\ParseException;

$actionMessage = null;
$actionError = null;

// TOGGLE AGENCY ON/OFF -------------------------------------
if (isset($_POST['toggle_agency_id'])) {
    try {
        $query = new ParseQuery('_User');
        $agent = $query->get($_POST['toggle_agency_id'], true);

        $currentlyEnabled = $agent->get('agency_enabled');
        // Unset means "always was enabled" (this flag didn't exist before).
        $newState = $currentlyEnabled === false ? true : false;

        $agent->set('agency_enabled', $newState);
        $agent->save(true);

        $actionMessage = htmlspecialchars($agent->get('username')) . '\'s agency is now ' .
            ($newState ? 'ENABLED' : 'DISABLED') . '.';
    } catch (ParseException $e) {
        $actionError = $e->getMessage();
    }
}

// LIST ALL AGENCIES ------------------------------------------
$agents = [];
try {
    $query = new ParseQuery('_User');
    $query->equalTo('agency_role', 'agent');
    $query->descending('createdAt');
    $agents = $query->find(true);
} catch (ParseException $e) {
    $actionError = $actionError ?? $e->getMessage();
}

function countAgencyMembers($agentObjectId)
{
    try {
        $q = new ParseQuery('_User');
        $q->equalTo('my_agent_id', $agentObjectId);
        return $q->count(true);
    } catch (ParseException $e) {
        return 0;
    }
}

?>

<div class="page-wrapper">
    <div class="row page-titles">
        <div class="col">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Management</a></li>
                <li class="breadcrumb-item active">Agencies</li>
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

        <div class="row">
            <div class="col-lg">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">All agencies</h4>
                        <div class="table-responsive">
                            <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                <thead class="bg-light">
                                <tr>
                                    <th style="color:#242526;">Agency owner</th>
                                    <th style="color:#242526;">Username</th>
                                    <th style="color:#242526;">Members</th>
                                    <th style="color:#242526;">Total agency diamonds</th>
                                    <th style="color:#242526;">Status</th>
                                    <th style="color:#242526;">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($agents as $agent):
                                    $enabled = $agent->get('agency_enabled') !== false;
                                    ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($agent->get('name') ?? $agent->get('username')); ?></td>
                                        <td><?php echo htmlspecialchars($agent->get('username')); ?></td>
                                        <td><?php echo countAgencyMembers($agent->getObjectId()); ?></td>
                                        <td><?php echo (int)($agent->get('diamondsAgencyTotal') ?? 0); ?></td>
                                        <td>
                                            <?php if ($enabled): ?>
                                                <span class="badge badge-success">Enabled</span>
                                            <?php else: ?>
                                                <span class="badge badge-danger">Disabled</span>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <form method="post" action="" style="display:inline;">
                                                <input type="hidden" name="toggle_agency_id" value="<?php echo htmlspecialchars($agent->getObjectId()); ?>">
                                                <button type="submit" class="btn btn-sm text-white" style="background:<?php echo $enabled ? '#c0392b' : '#27ae60'; ?>;">
                                                    <?php echo $enabled ? 'Disable' : 'Enable'; ?>
                                                </button>
                                            </form>
                                        </td>
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
