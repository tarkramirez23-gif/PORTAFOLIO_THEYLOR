<?php
declare(strict_types=1);

// =============================================================
// Configuración. Los SECRETOS viven en backend/config.local.php
// (no se sube a Git y el servidor web NO lo sirve: ver .htaccess).
// Copia config.local.example.php -> config.local.php y rellénalo.
// =============================================================

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $archivo = __DIR__ . '/config.local.php';
        if (!is_file($archivo)) {
            throw new RuntimeException('Falta backend/config.local.php');
        }
        $cfg = require $archivo;
    }
    return $cfg;
}

function conectarDB(): PDO
{
    $c = config();
    $dsn = 'mysql:host=' . $c['db_host'] . ';dbname=' . $c['db_name'] . ';charset=utf8mb4';
    return new PDO($dsn, $c['db_user'], $c['db_pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false, // prepared statements reales
    ]);
}
