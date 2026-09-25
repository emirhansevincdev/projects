<?php

require_once '../admin/auth_guard.php';
require_page_access('team_chat');

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseException;

$sendError = null;

// SEND MESSAGE ------------------------------------------------
if (isset($_POST['message']) && trim($_POST['message']) !== '') {
    try {
        $chatMessage = ParseObject::create('StaffChatMessage');
        $chatMessage->set('author', $currUser);
        $chatMessage->set('author_name', $currUser->get('name') ?? $currUser->get('username'));
        $chatMessage->set('author_role', $staffRole);
        $chatMessage->set('message', trim($_POST['message']));
        $chatMessage->save(true);
    } catch (ParseException $e) {
        $sendError = $e->getMessage();
    }
}

// LOAD LAST 200 MESSAGES, OLDEST FIRST ------------------------
$messages = [];
try {
    $query = new ParseQuery('StaffChatMessage');
    $query->descending('createdAt');
    $query->limit(200);
    $messages = array_reverse($query->find(true));
} catch (ParseException $e) {
    $sendError = $sendError ?? $e->getMessage();
}

?>

<div class="page-wrapper">
    <div class="row page-titles">
        <div class="col">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Management</a></li>
                <li class="breadcrumb-item active">Team Chat</li>
            </ol>
        </div>
    </div>

    <div class="container-fluid">

        <?php if ($sendError): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($sendError); ?></div>
        <?php endif; ?>

        <div class="row">
            <div class="col-12 col-md-8" style="margin-left:auto; margin-right:auto;">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Yönetim ekibi sohbeti</h4>
                        <p class="text-muted">Sadece giriş yapan yönetim ekibi üyeleri (<?php echo implode(', ', DASHBOARD_ROLES); ?>) bu kanalı görebilir.</p>

                        <div id="team-chat-log" style="max-height:420px; overflow-y:auto; border:1px solid #eee; border-radius:6px; padding:15px; background:#fafafa;">
                            <?php if (empty($messages)): ?>
                                <p class="text-muted">Henüz mesaj yok. İlk mesajı sen gönder.</p>
                            <?php endif; ?>
                            <?php foreach ($messages as $msg):
                                $isMine = $msg->get('author') && $msg->get('author')->getObjectId() === $currUser->getObjectId();
                                ?>
                                <div style="margin-bottom:12px; text-align:<?php echo $isMine ? 'right' : 'left'; ?>;">
                                    <div style="display:inline-block; max-width:80%; padding:8px 14px; border-radius:14px; background:<?php echo $isMine ? '#5d0375' : '#e4e6eb'; ?>; color:<?php echo $isMine ? '#fff' : '#242526'; ?>;">
                                        <div style="font-size:11px; opacity:0.75; margin-bottom:2px;">
                                            <?php echo htmlspecialchars($msg->get('author_name')); ?>
                                            &middot;
                                            <?php echo htmlspecialchars(staff_role_label($msg->get('author_role') ?? '')); ?>
                                            &middot;
                                            <?php echo $msg->getCreatedAt() ? $msg->getCreatedAt()->format('d/m H:i') : ''; ?>
                                        </div>
                                        <div><?php echo nl2br(htmlspecialchars($msg->get('message'))); ?></div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <form method="post" action="" class="form-inline mt-3">
                            <input type="text" name="message" class="form-control mr-2" placeholder="Mesaj yaz..." style="flex:1; min-width:250px;" required autocomplete="off">
                            <button type="submit" class="btn text-white" style="background:#5d0375;">Gönder</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<script>
    (function () {
        var log = document.getElementById('team-chat-log');
        if (log) {
            log.scrollTop = log.scrollHeight;
        }
    })();
</script>
