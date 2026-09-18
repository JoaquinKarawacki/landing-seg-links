// Config de secciones/categorías de Documentos.
// Para sumar una categoría nueva (o una sección nueva), alcanza con editar este objeto.
export const CATEGORIAS_DOCUMENTOS = {
  Procedimientos: ["Administración"],
  Marketing: ["Logos", "Templates", "Formatos de presentación"],
};

// LEGACY: ya no es la fuente de los documentos (eso es lib/repositorioDocumentos.js).
// Se deja acá únicamente para que scripts/migrar-documentos.mjs pueda migrar
// estos documentos a producción vía `railway ssh`. Una vez confirmada esa
// migración, borrar este array + los archivos de public/documentos/.
export const DOCUMENTOS = [
  // --- Procedimientos / Administración ---
  {
    id: "procedimiento-oc",
    titulo: "A001 · Procedimiento de Órdenes de Compra",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo: "/documentos/procedimientos/administracion/a001-procedimiento-oc.pdf",
  },
  {
    id: "procedimiento-licencias",
    titulo: "A002 · Procedimiento de Licencias",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo:
      "/documentos/procedimientos/administracion/a002-procedimiento-licencias.pdf",
  },
  {
    id: "procedimiento-rdeg",
    titulo: "A003 · Procedimiento de Rendición de Gastos",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo: "/documentos/procedimientos/administracion/a003-procedimiento-rdeg.pdf",
  },
  {
    id: "procedimiento-of",
    titulo: "A004 · Procedimiento OF",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo: "/documentos/procedimientos/administracion/a004-procedimiento-of.pdf",
  },
  {
    id: "formulario-alta-cliente",
    titulo: "Formulario de Alta de Cliente",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo:
      "/documentos/procedimientos/administracion/formulario-alta-cliente.docx",
  },
  {
    id: "formulario-alta-cliente-publico",
    titulo: "Formulario de Alta de Cliente Público",
    seccion: "Procedimientos",
    categoria: "Administración",
    archivo:
      "/documentos/procedimientos/administracion/formulario-alta-cliente-publico.docx",
  },

  // --- Marketing / Logos ---
  {
    id: "logo-seg-ingenieria-principal",
    titulo: "SEG Ingeniería — Logo (PNG)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/seg-ingenieria-logo.png",
  },
  {
    id: "logo-seg-ingenieria-pantone",
    titulo: "SEG Ingeniería — Logo Pantone (PDF)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/logo-seg-pantone.pdf",
  },
  {
    id: "logo-seg-ingenieria-cmyk-rgb-pantone",
    titulo: "SEG Ingeniería — Logo CMYK/RGB/Pantone",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/cmyk-rgb-pantone-logo.pdf",
  },
  {
    id: "logo-seg-ingenieria-pie-hoja",
    titulo: "SEG Ingeniería — Pie de hoja Pantone",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/pie-hoja-pantone.pdf",
  },
  {
    id: "logo-seg-ingenieria-corel",
    titulo: "SEG Ingeniería — Logo fuente (CorelDRAW)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo:
      "/documentos/marketing/logos/seg-ingenieria/logo-seg-corel-cool-gray-10c.cdr",
  },
  {
    id: "logo-seg-ingenieria-pantone-485-c",
    titulo: "SEG Ingeniería — Muestra Pantone 485 C",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/pantone-485-c.jpeg",
  },
  {
    id: "logo-seg-ingenieria-pantone-485-u",
    titulo: "SEG Ingeniería — Muestra Pantone 485 U (papel mate)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo:
      "/documentos/marketing/logos/seg-ingenieria/pantone-485-u-papel-mate.jpeg",
  },
  {
    id: "logo-seg-ingenieria-cool-gray-11c",
    titulo: "SEG Ingeniería — Muestra Cool Gray 11C",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-ingenieria/cool-gray-11c.jpeg",
  },
  {
    id: "logo-seg-emove",
    titulo: "SEG eMove — Logo (JPG)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-emove/logo-seg-emove.jpg",
  },
  {
    id: "logo-seg-emove-final",
    titulo: "SEG eMove — Logo final (PDF)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-emove/logo-seg-emove-final.pdf",
  },
  {
    id: "logo-seg-emove-alternativo",
    titulo: "SEG eMove — Logo alternativo (PDF)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-emove/logo-seg-emove-alternativo.pdf",
  },
  {
    id: "logo-seg-greenpower-jpg",
    titulo: "SEG GreenPower — Logo (JPG)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-renovables/logo-seg-greenpower.jpg",
  },
  {
    id: "logo-seg-greenpower-pdf",
    titulo: "SEG GreenPower — Logo (PDF)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-renovables/logo-seg-greenpower.pdf",
  },
  {
    id: "logo-seg-greenpower-anterior",
    titulo: "SEG GreenPower — Logo (versión anterior)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo:
      "/documentos/marketing/logos/seg-renovables/logo-seg-greenpower-anterior.pdf",
  },
  {
    id: "logo-seg-smart",
    titulo: "SEG Smart — Logo (PNG)",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-smart/logo-seg-smart.png",
  },
  {
    id: "logo-seg-smart-boceto",
    titulo: "SEG Smart Solutions — Boceto de logo",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-smart/logo-seg-smart-boceto.pdf",
  },
  {
    id: "logo-segheliotec",
    titulo: "SEG Heliotec — Logo",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-heliotec/logo-segheliotec.pdf",
  },
  {
    id: "logo-segheliotec-horizontal",
    titulo: "SEG Heliotec — Logo horizontal",
    seccion: "Marketing",
    categoria: "Logos",
    archivo: "/documentos/marketing/logos/seg-heliotec/logo-segheliotec-horizontal.pdf",
  },

  // --- Marketing / Templates ---
  {
    id: "template-propuesta-trabajo-inicial",
    titulo: "Propuesta de trabajo inicial",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/propuesta-trabajo-inicial.docx",
  },
  {
    id: "template-informe-docx",
    titulo: "Informe (Word)",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/informe.docx",
  },
  {
    id: "template-informe-pdf",
    titulo: "Informe (PDF)",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/informe.pdf",
  },
  {
    id: "template-anexo-tecnico-propuesta-comercial",
    titulo: "Anexo técnico de propuesta comercial",
    seccion: "Marketing",
    categoria: "Templates",
    archivo:
      "/documentos/marketing/templates/anexo-tecnico-propuesta-comercial.docx",
  },
  {
    id: "template-propuesta-comercial-inversion",
    titulo: "Propuesta comercial (inversión)",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/propuesta-comercial-inversion.docx",
  },
  {
    id: "template-propuesta-comercial-areas-negocio",
    titulo: "Propuesta comercial por áreas de negocio (precio fijo)",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/propuesta-comercial-areas-negocio.docx",
  },
  {
    id: "template-caratula-informes-propuesta",
    titulo: "Carátula de informes/propuestas",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/caratula-informes-propuesta.docx",
  },
  {
    id: "template-firma-de-mail",
    titulo: "Firma de mail",
    seccion: "Marketing",
    categoria: "Templates",
    archivo: "/documentos/marketing/templates/firma-de-mail.png",
  },

  // --- Marketing / Formatos de presentación ---
  {
    id: "formato-presentacion-corporativa-pptx",
    titulo: "Presentación corporativa (PowerPoint)",
    seccion: "Marketing",
    categoria: "Formatos de presentación",
    archivo: "/documentos/marketing/formatos-presentacion/presentacion-corporativa.pptx",
  },
  {
    id: "formato-presentacion-corporativa-pdf",
    titulo: "Presentación corporativa (PDF)",
    seccion: "Marketing",
    categoria: "Formatos de presentación",
    archivo: "/documentos/marketing/formatos-presentacion/presentacion-corporativa.pdf",
  },
  {
    id: "formato-ppt-molino",
    titulo: "Formato SEG PPT (Molino)",
    seccion: "Marketing",
    categoria: "Formatos de presentación",
    archivo: "/documentos/marketing/formatos-presentacion/formato-ppt-molino.pptx",
  },
  {
    id: "formato-ppt-minimalista",
    titulo: "Formato SEG PPT Minimalista",
    seccion: "Marketing",
    categoria: "Formatos de presentación",
    archivo: "/documentos/marketing/formatos-presentacion/formato-ppt-minimalista.pptx",
  },
  {
    id: "formato-iconos-presentacion",
    titulo: "Set de íconos para presentaciones",
    seccion: "Marketing",
    categoria: "Formatos de presentación",
    archivo: "/documentos/marketing/formatos-presentacion/iconos-presentacion.pptx",
  },
];
