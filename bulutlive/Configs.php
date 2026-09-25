<?php
require 'vendor/autoload.php';

$app_name = 'Bulut Live Admin Panel';
$default_icon_color = 'text-white'; // use Bootstrap text color sintax

use Parse\ParseClient;
use Parse\ParseSessionStorage;

session_start();

try {
    ParseClient::initialize(
        'OyDdJW1aDy7EY0r75XOlkvz88Vq2I0qAVkJcNlLs',/*APP ID*/
        'jtDlWh77CLJH8pxI1m8oJTWlDiHctbpAenYVFfHr', /*REST API key*/
        'tyiADEyHghmqrKZxdrM5uKtWXMDn1vKr0usGm9RZ'/*MASTER key*/
    );
    ParseClient::setServerURL('https://parseapi.back4app.com/','/'); // For back4app use: https://parseapi.back4app.com/'
    ParseClient::setStorage( new ParseSessionStorage());
} catch (Exception $e) {
}

$health = ParseClient::getServerHealth();
if($health['status'] !== 200) {

}

// Website root url
$GLOBALS['WEBSITE_PATH'] = 'https://parseapi.back4app.com'; 