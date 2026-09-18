import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  eliminarArchivo,
  guardarArchivo,
  rutaBase,
} from "./almacenamientoDocumentos.js";
import {
  extensionDeNombre,
  extensionPermitida,
  infoTipoMime,
} from "./tiposMime.js";

// Único responsable de la metadata de los documentos (qué existe, título,
// sección, categoría). No sabe nada de cómo se guardan los bytes en disco
// (eso es almacenamientoDocumentos.js) ni de sesiones/permisos (eso es
// app/admin-documentos/sesion.js). Si el día de mañana hay que reemplazar
// este índice JSON por una base de datos real, solo se reescribe este
// archivo — nada más del sistema depende de que sea JSON.

function rutaIndice() {
  return path.join(rutaBase(), "indice.json");
}

async function leerIndice() {
  try {
    const contenido = await readFile(rutaIndice(), "utf-8");
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function escribirIndice(documentos) {
  await mkdir(rutaBase(), { recursive: true });
  await writeFile(rutaIndice(), JSON.stringify(documentos, null, 2), "utf-8");
}

// Serializa las escrituras al índice para que dos altas/bajas casi
// simultáneas no se pisen (lectura-modificación-escritura no es atómica).
let colaEscritura = Promise.resolve();
function conBloqueo(tarea) {
  const resultado = colaEscritura.then(tarea, tarea);
  colaEscritura = resultado.then(
    () => undefined,
    () => undefined
  );
  return resultado;
}

export async function listarDocumentos() {
  return leerIndice();
}

export async function obtenerDocumentoPorId(id) {
  const documentos = await leerIndice();
  return documentos.find((documento) => documento.id === id) ?? null;
}

export async function agregarDocumento({ titulo, seccion, categoria, archivo }) {
  const extension = extensionDeNombre(archivo.name);
  if (!extensionPermitida(extension)) {
    throw new Error(`Extensión no permitida: .${extension}`);
  }

  const id = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await archivo.arrayBuffer());
  await guardarArchivo(id, buffer);

  const documento = {
    id,
    titulo,
    seccion,
    categoria,
    nombreOriginal: archivo.name,
    tipoMime: infoTipoMime(extension).contentType,
    tamanioBytes: buffer.length,
    fechaSubida: new Date().toISOString(),
  };

  await conBloqueo(async () => {
    const documentos = await leerIndice();
    documentos.push(documento);
    await escribirIndice(documentos);
  });

  return documento;
}

export async function eliminarDocumento(id) {
  await conBloqueo(async () => {
    const documentos = await leerIndice();
    const restantes = documentos.filter((documento) => documento.id !== id);
    if (restantes.length === documentos.length) return;
    await escribirIndice(restantes);
    await eliminarArchivo(id);
  });
}
