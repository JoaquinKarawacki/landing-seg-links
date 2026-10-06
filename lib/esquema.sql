-- Esquema (DDL) de la base de datos de usuarios (login de empleados).
-- Este archivo es la fuente de verdad del modelo de datos. lib/baseDatos.js lo
-- lee y lo ejecuta al abrir la conexión; es idempotente (IF NOT EXISTS), así que
-- correrlo muchas veces no rompe nada. Para evolucionar el esquema más adelante,
-- agregar acá las sentencias nuevas (siempre idempotentes).

CREATE TABLE IF NOT EXISTS usuarios (
  id                TEXT PRIMARY KEY,
  email             TEXT NOT NULL UNIQUE,  -- guardado siempre en minúsculas
  nombre            TEXT,
  hash_password     TEXT NOT NULL,         -- formato: scrypt$<salt_hex>$<hash_hex>
  rol               TEXT NOT NULL DEFAULT 'empleado',
  activo            INTEGER NOT NULL DEFAULT 1,  -- 1 = activo, 0 = desactivado
  -- Rate limit de login (anti fuerza bruta):
  intentos_fallidos INTEGER NOT NULL DEFAULT 0,  -- fallos seguidos desde el último login ok
  bloqueado_hasta   TEXT,                         -- ISO; si está en el futuro, no puede loguear
  creado_en         TEXT NOT NULL,
  actualizado_en    TEXT NOT NULL
);

-- El login busca por email; el índice único de arriba ya cubre esa consulta.
