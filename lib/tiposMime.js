// Extensiones permitidas para subir vía el panel de administración.
// Cualquier extensión que no esté acá se rechaza al subir (evita
// almacenar .html/.svg/.js que el navegador podría ejecutar bajo el
// dominio del sitio).
const TIPOS_MIME = {
  pdf: { contentType: "application/pdf", disposicion: "inline" },
  png: { contentType: "image/png", disposicion: "inline" },
  jpg: { contentType: "image/jpeg", disposicion: "inline" },
  jpeg: { contentType: "image/jpeg", disposicion: "inline" },
  gif: { contentType: "image/gif", disposicion: "inline" },
  doc: { contentType: "application/msword", disposicion: "attachment" },
  docx: {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    disposicion: "attachment",
  },
  xls: { contentType: "application/vnd.ms-excel", disposicion: "attachment" },
  xlsx: {
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    disposicion: "attachment",
  },
  ppt: {
    contentType: "application/vnd.ms-powerpoint",
    disposicion: "attachment",
  },
  pptx: {
    contentType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    disposicion: "attachment",
  },
  cdr: { contentType: "application/octet-stream", disposicion: "attachment" },
  zip: { contentType: "application/zip", disposicion: "attachment" },
};

export function extensionPermitida(extension) {
  return Object.prototype.hasOwnProperty.call(
    TIPOS_MIME,
    extension.toLowerCase()
  );
}

export function infoTipoMime(extension) {
  return TIPOS_MIME[extension.toLowerCase()] ?? null;
}

export function extensionDeNombre(nombreArchivo) {
  return nombreArchivo.split(".").pop().toLowerCase();
}
