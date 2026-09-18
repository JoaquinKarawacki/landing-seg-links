// Script de un solo uso: migra los documentos hoy hardcodeados en
// datos/documentos.js (con archivos físicos en public/documentos/) hacia
// el nuevo sistema persistente (lib/repositorioDocumentos.js +
// lib/almacenamientoDocumentos.js).
//
// Uso local:   node scripts/migrar-documentos.mjs
// Uso Railway: railway run node scripts/migrar-documentos.mjs
//              (corriendo contra el servicio con el Volumen ya montado y
//              RUTA_ALMACENAMIENTO_DOCUMENTOS ya seteada)
import { readFile } from "node:fs/promises";
import path from "node:path";
import { DOCUMENTOS } from "../datos/documentos.js";
import { agregarDocumento, listarDocumentos } from "../lib/repositorioDocumentos.js";

async function main() {
  const yaMigrados = await listarDocumentos();
  if (yaMigrados.length > 0) {
    console.log(
      `Ya hay ${yaMigrados.length} documento(s) en el almacenamiento persistente. Cancelando para no duplicar.`
    );
    return;
  }

  let migrados = 0;
  for (const documento of DOCUMENTOS) {
    const rutaFisica = path.join(process.cwd(), "public", documento.archivo);
    const buffer = await readFile(rutaFisica);
    const nombreOriginal = path.basename(documento.archivo);

    const archivoFalso = {
      name: nombreOriginal,
      arrayBuffer: async () => buffer,
    };

    await agregarDocumento({
      titulo: documento.titulo,
      seccion: documento.seccion,
      categoria: documento.categoria,
      archivo: archivoFalso,
    });

    migrados += 1;
    console.log(`✓ ${documento.titulo}`);
  }

  console.log(`\nMigrados ${migrados} documento(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
