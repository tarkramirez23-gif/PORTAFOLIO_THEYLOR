-- Si YA tienes la tabla `mensajes` de la versión anterior, ejecuta esto una sola vez:
ALTER TABLE mensajes
  ADD COLUMN ip_hash CHAR(64) NULL AFTER mensaje,
  ADD INDEX idx_rate_limit (ip_hash, creado_en);
