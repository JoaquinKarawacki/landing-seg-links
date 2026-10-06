import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

// ORQUESTADOR DE LA BASE DE DATOS.
// Este archivo es el único lugar que decide el backend de almacenamiento: QUÉ
// motor se usa y DÓNDE vive la base. Nada más del sistema sabe esto.
//
// Hoy:
//   - MOTOR: SQLite en un archivo (sin servidor de BD aparte → Postgres = no).
//   - La base entera (tabla usuarios, filas, índices) vive en UN archivo dentro
//     del Volumen, al lado del indice.json de documentos. Mismo modelo mental que
//     ese indice.json, pero con SQL real.
//
// Si el día de mañana se quiere mover a Postgres (u otro motor), el cambio es
// barato y acotado: se reescribe solo este archivo y lib/repositorioUsuarios.js.
// El resto del sistema (login, panel, DAL) no cambia.

export const MOTOR = "sqlite"; // ← cambiar acá si algún día se migra a "postgres"

function rutaBaseDatos() {
  return (
    process.env.RUTA_BASE_DATOS ||
    path.join(process.cwd(), "almacenamiento", "usuarios.db")
  );
}

// El esquema vive como archivo .sql versionado en el repo. Se lee desde el disco
// (no se empaqueta en el build): en Railway el repo está presente en runtime, y
// process.cwd() es la raíz del proyecto.
function leerEsquema() {
  return readFileSync(path.join(process.cwd(), "lib", "esquema.sql"), "utf-8");
}

// Conexión singleton: abrir SQLite es barato, pero mantener un solo handle evita
// problemas de locking y es más eficiente en un server de una sola instancia.
let db = null;

export function obtenerDb() {
  if (db) return db;

  const ruta = rutaBaseDatos();
  mkdirSync(path.dirname(ruta), { recursive: true });

  db = new DatabaseSync(ruta);
  // WAL: mejor concurrencia lectura/escritura y menos bloqueos que el modo por
  // defecto. foreign_keys por prolijidad, por si el esquema crece con relaciones.
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  // DDL idempotente: crea la tabla la primera vez, no hace nada las siguientes.
  db.exec(leerEsquema());

  return db;
}
