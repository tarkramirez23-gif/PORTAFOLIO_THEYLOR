<?php
// Copia este archivo como config.local.php y completa los valores.
// NUNCA subas config.local.php a Git.
return [
    'db_host' => 'sqlXXX.infinityfree.com',
    'db_name' => 'if0_XXXXXXXX_portafolio',
    'db_user' => 'if0_XXXXXXXX',
    'db_pass' => 'CAMBIA-ESTA-CLAVE',

    // Cadena aleatoria larga para hashear IPs (genera una con: openssl rand -hex 32)
    'ip_salt' => 'CAMBIA-ESTO-POR-UNA-CADENA-ALEATORIA',

    // Orígenes autorizados a llamar al endpoint (CORS). Sin barra final.
    'allowed_origins' => [
        'https://theylorramirez.lovestoblog.com',
        'http://localhost:4200', // ng serve
    ],

    // Límite de envíos por IP en la ventana indicada
    'rate_max'    => 3,
    'rate_window' => 600, // segundos (10 min)
];
