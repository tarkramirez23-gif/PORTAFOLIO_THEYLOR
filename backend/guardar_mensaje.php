<?php
declare(strict_types=1);

// =============================================================
// Recibe el formulario de contacto (JSON) y lo guarda en MySQL.
// Controles: CORS por lista blanca, validación estricta, honeypot,
// trampa de tiempo, rate limiting por IP (hash HMAC), prepared
// statements y errores genéricos hacia el cliente.
// =============================================================

ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function responder(int $codigo, array $cuerpo): never
{
    http_response_code($codigo);
    echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE);
    exit;
}

require __DIR__ . '/config.php';

try {
    $cfg = config();
} catch (Throwable $e) {
    error_log('[portafolio] ' . $e->getMessage());
    responder(500, ['ok' => false, 'error' => 'Error de configuración del servidor']);
}

// ---- CORS: solo orígenes autorizados --------------------------------------
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Vary: Origin');
if ($origen !== '' && in_array($origen, $cfg['allowed_origins'] ?? [], true)) {
    header('Access-Control-Allow-Origin: ' . $origen);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
}

$metodo = $_SERVER['REQUEST_METHOD'] ?? '';
if ($metodo === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($metodo !== 'POST') {
    header('Allow: POST, OPTIONS');
    responder(405, ['ok' => false, 'error' => 'Método no permitido']);
}

// ---- Entrada: tipo, tamaño y formato --------------------------------------
$tipo = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (!str_starts_with($tipo, 'application/json')) {
    responder(415, ['ok' => false, 'error' => 'Content-Type debe ser application/json']);
}

$crudo = file_get_contents('php://input', false, null, 0, 8193);
if ($crudo === false || strlen($crudo) > 8192) {
    responder(413, ['ok' => false, 'error' => 'Solicitud demasiado grande']);
}

$datos = json_decode($crudo, true);
if (!is_array($datos)) {
    responder(400, ['ok' => false, 'error' => 'JSON no válido']);
}

$texto = static fn(mixed $v): string => is_string($v) ? trim($v) : '';

$nombre  = $texto($datos['nombre']  ?? null);
$correo  = $texto($datos['correo']  ?? null);
$mensaje = $texto($datos['mensaje'] ?? null);
$trampa  = $texto($datos['website'] ?? null);
$tiempo  = is_int($datos['t'] ?? null) ? $datos['t'] : 0;

// ---- Anti-bots: honeypot y trampa de tiempo (respuesta "ok" silenciosa) ----
if ($trampa !== '' || $tiempo < 2000) {
    responder(200, ['ok' => true]);
}

// ---- Validación -----------------------------------------------------------
if ($nombre === '' || $correo === '' || $mensaje === '') {
    responder(422, ['ok' => false, 'error' => 'Todos los campos son obligatorios']);
}
if (mb_strlen($nombre) > 100 || mb_strlen($correo) > 150 || mb_strlen($mensaje) > 2000 || mb_strlen($mensaje) < 10) {
    responder(422, ['ok' => false, 'error' => 'Longitud de campos no válida']);
}
// Sin saltos de línea en campos de una línea (evita inyección de cabeceras si algún día se reenvía por correo)
if (preg_match('/[\r\n]/', $nombre . $correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['ok' => false, 'error' => 'El correo no es válido']);
}
// Elimina caracteres de control (conserva \n y \t en el mensaje)
$mensaje = preg_replace('/[^\P{C}\n\t]/u', '', $mensaje) ?? '';
$nombre  = preg_replace('/\p{C}/u', '', $nombre) ?? '';
if ($mensaje === '' || $nombre === '') {
    responder(422, ['ok' => false, 'error' => 'Contenido no válido']);
}

// ---- Rate limiting por IP (se guarda solo un hash, nunca la IP) ------------
$ip     = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ipHash = hash_hmac('sha256', $ip, (string) ($cfg['ip_salt'] ?? ''));
$max    = (int) ($cfg['rate_max'] ?? 3);
$ventana = (int) ($cfg['rate_window'] ?? 600);

try {
    $pdo = conectarDB();

    $q = $pdo->prepare(
        'SELECT COUNT(*) FROM mensajes
         WHERE ip_hash = :ip AND creado_en > (NOW() - INTERVAL ' . $ventana . ' SECOND)'
    );
    $q->execute([':ip' => $ipHash]);
    if ((int) $q->fetchColumn() >= $max) {
        header('Retry-After: ' . $ventana);
        responder(429, ['ok' => false, 'error' => 'Demasiados mensajes. Intenta más tarde.']);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO mensajes (nombre, correo, mensaje, ip_hash)
         VALUES (:nombre, :correo, :mensaje, :ip)'
    );
    $stmt->execute([
        ':nombre'  => $nombre,
        ':correo'  => $correo,
        ':mensaje' => $mensaje,
        ':ip'      => $ipHash,
    ]);

    responder(200, ['ok' => true]);
} catch (PDOException $e) {
    error_log('[portafolio] ' . $e->getMessage()); // detalle solo en el log del servidor
    responder(500, ['ok' => false, 'error' => 'No se pudo guardar el mensaje']);
}
