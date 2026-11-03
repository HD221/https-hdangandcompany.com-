<?php
// Receives the enquiry and subscribe forms and emails them to the firm.
// Works on Hostinger shared hosting with PHP mail().

declare(strict_types=1);

const TO_ADDRESS = 'info@hdangandcompany.com';
const FROM_ADDRESS = 'info@hdangandcompany.com';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, string $message): void {
    http_response_code($code);
    echo json_encode(['ok' => $code === 200, 'message' => $message]);
    exit;
}

function field(string $name, int $max = 200): string {
    $value = isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
    $value = str_replace(["\r", "\n"], ($max > 300 ? ["", "\n"] : [' ', ' ']), $value);
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, 'Use POST.');
}

// Spam trap: real visitors never fill this hidden field.
if (field('company-website') !== '') {
    respond(200, 'Thank you.');
}

$form = field('form-name', 40);
$email = field('email', 200);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Please enter a valid email address.');
}

if ($form === 'subscribe') {
    $subject = 'New website subscriber';
    $body = "A visitor subscribed to updates on hdangandcompany.com.\n\nEmail: {$email}\n";
} elseif ($form === 'enquiry') {
    $name = field('name', 120);
    $message = field('message', 5000);
    if ($name === '' || $message === '') {
        respond(422, 'Please add your name and a message.');
    }
    $business = field('business', 160);
    $country = field('country', 80);
    $service = field('service', 120);
    $subject = 'Website enquiry: ' . ($service !== '' ? $service : 'General') . ' – ' . $name;
    $body = "New enquiry from hdangandcompany.com\n\n"
        . "Name: {$name}\n"
        . "Business: " . ($business !== '' ? $business : '-') . "\n"
        . "Email: {$email}\n"
        . "Country: " . ($country !== '' ? $country : '-') . "\n"
        . "Service required: " . ($service !== '' ? $service : '-') . "\n\n"
        . "Message:\n{$message}\n";
} else {
    respond(400, 'Unknown form.');
}

$headers = [
    'From: H Dang and Company Website <' . FROM_ADDRESS . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
if (!mail(TO_ADDRESS, $encodedSubject, $body, implode("\r\n", $headers), '-f' . FROM_ADDRESS)) {
    respond(500, 'The message could not be sent.');
}

respond(200, 'Thank you.');
