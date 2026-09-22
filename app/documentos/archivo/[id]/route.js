import { abrirFlujoLectura } from "@/lib/almacenamientoDocumentos";
import { obtenerDocumentoPorId } from "@/lib/repositorioDocumentos";
import { extensionDeNombre, infoTipoMime } from "@/lib/tiposMime";

// Los headers HTTP solo aceptan Latin-1: un nombre con "—", comillas
// tipográficas o emojis tira ERR_INVALID_CHAR (500). Se manda un nombre ASCII
// de respaldo + filename* en UTF-8 (RFC 6266), que es el que usan los
// navegadores actuales.
function contentDisposition(disposicion, nombreOriginal) {
  const nombreAscii =
    nombreOriginal
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\x20-\x7e]/g, "_")
      .replace(/["\\]/g, "_") || "archivo";
  // encodeURIComponent deja pasar ' ( ) *, que RFC 5987 no permite sin codificar.
  const nombreUtf8 = encodeURIComponent(nombreOriginal).replace(
    /['()*]/g,
    (caracter) => `%${caracter.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return `${disposicion}; filename="${nombreAscii}"; filename*=UTF-8''${nombreUtf8}`;
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const documento = await obtenerDocumentoPorId(id);

  if (!documento) {
    return new Response("No encontrado", { status: 404 });
  }

  const info = infoTipoMime(extensionDeNombre(documento.id));

  let flujo;
  try {
    flujo = await abrirFlujoLectura(documento.id);
  } catch (error) {
    // Está en el índice pero el archivo no está en disco.
    if (error.code === "ENOENT") {
      return new Response("No encontrado", { status: 404 });
    }
    throw error;
  }

  return new Response(flujo, {
    headers: {
      "Content-Type": documento.tipoMime || "application/octet-stream",
      "Content-Disposition": contentDisposition(
        info?.disposicion ?? "attachment",
        documento.nombreOriginal
      ),
      "X-Content-Type-Options": "nosniff",
    },
  });
}
