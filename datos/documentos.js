// Config de secciones/categorías de Documentos.
// Para sumar una categoría nueva (o una sección nueva), alcanza con editar este objeto.
export const CATEGORIAS_DOCUMENTOS = {
  Procedimientos: [
    "Administración",
    "AE",
    "Consulting",
    "ECR",
    "Heliotec",
    "Indicadores",
    "ISO",
    "Renovables",
    "Ventas",
    "SEG eMove",
  ],
  Marketing: ["Logos", "Templates", "Formatos de presentación"],
};

// Config de Capital humano (/capital-humano). Comparte almacenamiento y panel
// de administración con Documentos: solo cambia la página que las muestra.
export const CATEGORIAS_CAPITAL_HUMANO = {
  "Capital humano": [
    "Organigrama",
    "Cumpleaños",
    "Sociedades y emergencias",
  ],
};

// Cédulas y carnés de salud: datos personales sensibles. Se muestran en una
// página aparte (/capital-humano/documentacion-personal), a la que se llega por
// un link desde Capital humano. En el índice se guardan igual bajo la sección
// "Capital humano" (así el panel de administración los sigue subiendo en el
// mismo lugar y no hay que re-subir lo ya cargado): esta sección "Documentación
// personal" es solo el título con el que se listan en esa página aparte.
export const CATEGORIAS_DOCUMENTACION_PERSONAL = {
  "Documentación personal": [
    "Cédulas de identidad",
    "Carnés de salud",
  ],
};

// Categorías de Capital humano que se guardan en el índice bajo la sección
// "Capital humano" pero se muestran en la página aparte de documentación
// personal (no en la principal de Capital humano).
export const CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO =
  CATEGORIAS_DOCUMENTACION_PERSONAL["Documentación personal"];

// Todas las secciones que se administran desde /admin-documentos.
// Cédulas y carnés viven bajo "Capital humano" en el índice, así que el panel
// las agrupa ahí junto al resto de Capital humano.
export const TODAS_LAS_CATEGORIAS = {
  ...CATEGORIAS_DOCUMENTOS,
  "Capital humano": [
    ...CATEGORIAS_CAPITAL_HUMANO["Capital humano"],
    ...CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO,
  ],
};
