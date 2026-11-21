-- =============================================================
-- Base de datos del portafolio — Theylor Ramírez (v2)
-- =============================================================
-- En hosting (InfinityFree) la base ya la crea el panel: ejecuta solo
-- desde "CREATE TABLE" hacia abajo, dentro de la base que te asignaron.
-- En local (XAMPP) puedes ejecutar todo el archivo.
-- =============================================================

CREATE DATABASE IF NOT EXISTS portafolio_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portafolio_db;

CREATE TABLE IF NOT EXISTS mensajes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL,
  correo    VARCHAR(150) NOT NULL,
  mensaje   TEXT NOT NULL,
  ip_hash   CHAR(64) NULL,                -- HMAC-SHA256 de la IP (nunca la IP en claro)
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rate_limit (ip_hash, creado_en)
) ENGINE=InnoDB;
