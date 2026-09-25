<?php

require_once '../admin/auth_guard.php';
require_page_access('coins_panel');

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseException;

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

// ADJUST COINS --------------------------------------------
if (isset($_POST['target_object_id']) && isset($_POST['amount']) && isset($_POST['direction'])) {
    $targetObjectId = $_POST['target_object_id'];
    $amount = (int)$_POST['amount'];
    $direction = $_POST['direction'] === 'remove' ? -1 : 1;
    $note = isset($_POST['note']) ? trim($_POST['note']) : '';

    if ($amount <= 0) {
        $actionError = 'Amount must be greater than zero.';
    } else {
        try {
            $targetQuery = new ParseQuery('_User');
            $target = $targetQuery->get($targetObjectId, true);

            $signedAmount = $amount * $direction;
            $target->increment('credit', $signedAmount);
            $target->save(true);

            $newBalance = (int)$target->get('credit');

            $transaction = ParseObject::create('CoinsTransactions');
            $transaction->set('author', $currUser);
            $transaction->set('author_id', $currUser->getObjectId());
            $transaction->set('receiver', $target);
            $transaction->set('receiver_id', $target->getObjectId());
            $transaction->set('transacted_amount', $signedAmount);
            $transaction->set('amount_after_transaction', $newBalance);
            $transaction->set('transaction_type', $direction > 0 ? 'AdminTopUp' : 'AdminDeduct');
            if ($note !== '') {
                $transaction->set('note', $note);
            }
            $transaction->save(true);

            $actionMessage = ($direction > 0 ? 'Added ' : 'Removed ') . $amount .
                ' coins ' . ($direction > 0 ? 'to ' : 'from ') .
                htmlspecialchars($target->get('username')) . '. New balance: ' . $newBalance . '.';

            $searchedUser = $target;
        } catch (ParseException $e) {
            $actionError = $e->getMessage();
        }
    }
}

// RECENT TRANSACTIONS --------------------------------------
$recentTransactions = [];
try {
    $txQuery = new ParseQuery('CoinsTransactions');
    $txQuery->includeKey('author');
    $txQuery->includeKey('receiver');
    $txQuery->descending('createdAt');
    $txQuery->limit(50);
    $recentTransactions = $txQuery->find(true);
} catch (ParseException $e) {
}

?>

<div class="page-wrapper">
    <div class="row page-titles">
        <div class="col">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Management</a></li>
                <li class="breadcrumb-item active">Coins Panel</li>
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
                            <p>Current balance: <strong><?php echo (int)$searchedUser->get('credit'); ?> coins</strong></p>

                            <form method="post" action="" class="form-inline">
                                <input type="hidden" name="target_object_id" value="<?php echo htmlspecialchars($searchedUser->getObjectId()); ?>">
                                <input type="number" min="1" name="amount" class="form-control mr-2" placeholder="Amount" required style="width:140px;">
                                <select name="direction" class="form-control mr-2">
                                    <option value="add">Add coins</option>
                                    <option value="remove">Remove coins</option>
                                </select>
                                <input type="text" name="note" class="form-control mr-2" placeholder="Note (optional)" style="min-width:200px;">
                                <button type="submit" class="btn text-white" style="background:#5d0375;">Apply</button>
                            </form>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <div class="row">
            <div class="col-lg">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Recent coin transactions</h4>
                        <div class="table-responsive">
                            <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                <thead class="bg-light">
                                <tr>
                                    <th style="color:#242526;">Date</th>
                                    <th style="color:#242526;">By</th>
                                    <th style="color:#242526;">User</th>
                                    <th style="color:#242526;">Amount</th>
                                    <th style="color:#242526;">Balance after</th>
                                    <th style="color:#242526;">Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($recentTransactions as $tx):
                                    $author = $tx->get('author');
                                    $receiver = $tx->get('receiver');
                                    $amount = (int)$tx->get('transacted_amount');
                                    $amountLabel = $amount > 0 ? ('+' . $amount) : $amount;
                                    $amountClass = $amount > 0 ? 'text-success' : 'text-danger';
                                    ?>
                                    <tr>
                                        <td><?php echo $tx->getCreatedAt() ? $tx->getCreatedAt()->format('d/m/Y H:i') : ''; ?></td>
                                        <td><?php echo htmlspecialchars($author ? ($author->get('username') ?? $author->getObjectId()) : '-'); ?></td>
                                        <td><?php echo htmlspecialchars($receiver ? ($receiver->get('username') ?? $receiver->getObjectId()) : '-'); ?></td>
                                        <td class="<?php echo $amountClass; ?> font-weight-bold"><?php echo $amountLabel; ?></td>
                                        <td><?php echo (int)$tx->get('amount_after_transaction'); ?></td>
                                        <td><?php echo htmlspecialchars($tx->get('transaction_type')); ?></td>
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
