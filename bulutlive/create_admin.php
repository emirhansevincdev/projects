<?php

$appId = 'OyDdJW1aDy7EY0r75XOlkvz88Vq2I0qAVkJcNlLs';
$masterKey = 'tyiADEyHghmqrKZxdrM5uKtWXMDn1vKr0usGm9RZ';

$email = 'superadmin@bulutlive.com';
$password = 'OrbitC1.';

$url = 'https://parseapi.back4app.com/users';

$data = json_encode([
    'username' => $email,
    'email' => $email,
    'password' => $password,
    'role' => 'admin'
]);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_HTTPHEADER => [
        'X-Parse-Application-Id: ' . $appId,
        'X-Parse-Master-Key: ' . $masterKey,
        'Content-Type: application/json'
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo "HTTP: " . $httpCode . PHP_EOL;
echo $response;
