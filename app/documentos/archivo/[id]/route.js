import { abrirFlujoLectura } from "@/lib/almacenamientoDocumentos";
import { obtenerDocumentoPorId } from "@/lib/repositorioDocumentos";
import { extensionDeNombre, infoTipoMime } from "@/lib/tiposMime";

export async function GET(_request, { params }) {
  const { id } = await params;
  const documento = await obtenerDocumentoPorId(id);

  if (!documento) {
    return new Response("No encontrado", { status: 404 });
  }

  const info = infoTipoMime(extensionDeNombre(documento.id));
  const flujo = await abrirFlujoLectura(documento.id);

  return new Response(flujo, {
    headers: {
      "Content-Type": documento.tipoMime || "application/octet-stream",
      "Content-Disposition": `${info?.disposicion ?? "attachment"}; filename="${documento.nombreOriginal}"`,
    },
  });
}
