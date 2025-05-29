

<?php
// Headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Error handling
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');
error_reporting(E_ALL);

// Validate input
if (!isset($_GET['tag']) || empty($_GET['tag'])) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Player tag is required']);
    exit;
}

$tag = ltrim($_GET['tag'], '#');
if (!preg_match('/^[0-9A-Za-z]{3,15}$/', $tag)) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Invalid player tag format']);
    exit;
}

// API Configuration
$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM0OTU1NWFhLThhMTEtNGM0Zi1hZDcwLTE2ZWMyZTEzZjFmYyIsImlhdCI6MTc0ODQ1ODQ5NCwic3ViIjoiZGV2ZWxvcGVyL2ExZmM4NjljLTQ4OGMtN2I0MS0wNmRjLWVkOTBhNzhiMzhkMyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzcuMTExLjE5MC44OCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.MdlZhLi0Jm38So77iJRcQiVTObICyHAx-YGgnFuA1GTmcE3rckp99jSA8SiZziAEET7XumvGKBPKc1Ijdsc8Vw';
$url = "https://api.brawlstars.com/v1/players/%23" . $tag;

// Initialize cURL
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $token",
        "Accept: application/json"
    ],
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => 'Failed to connect to Brawl Stars API']);
    exit;
}

// Forward the API response
http_response_code($httpCode);
echo $response;
?>