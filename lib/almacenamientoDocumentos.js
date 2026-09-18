import { mkdir, open, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Solo sabe leer/escribir bytes en disco. No sabe nada de títulos,
// secciones ni categorías (eso vive en repositorioDocumentos.js) — así,
// si el día de mañana hay que migrar a otro backend de storage (ej. algo
// S3-compatible), solo se reescribe este archivo.
export function rutaBase() {
  return (
    process.env.RUTA_ALMACENAMIENTO_DOCUMENTOS ||
    path.join(process.cwd(), "almacenamiento", "documentos")
  );
}

async function asegurarDirectorio() {
  await mkdir(rutaBase(), { recursive: true });
}

export async function guardarArchivo(nombreArchivo, buffer) {
  await asegurarDirectorio();
  // La ruta depende de una variable de entorno (volumen externo montado en
  // runtime, ej. en Railway): no hay que rastrearla/empaquetarla en el build.
  await writeFile(
    path.join(/* turbopackIgnore: true */ rutaBase(), nombreArchivo),
    buffer
  );
}

export async function eliminarArchivo(nombreArchivo) {
  try {
    await unlink(path.join(/* turbopackIgnore: true */ rutaBase(), nombreArchivo));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

// Streaming sin cargar el archivo entero en memoria (patrón oficial de
// Next.js 16 para Route Handlers: FileHandle.readableWebStream()).
export async function abrirFlujoLectura(nombreArchivo) {
  const handle = await open(
    path.join(/* turbopackIgnore: true */ rutaBase(), nombreArchivo)
  );
  return handle.readableWebStream();
}
