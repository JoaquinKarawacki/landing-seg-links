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
    "Cédulas de identidad",
    "Carnés de salud",
    "Organigrama",
    "Cumpleaños",
    "Emergencias",
  ],
};

// Todas las secciones que se administran desde /admin-documentos.
export const TODAS_LAS_CATEGORIAS = {
  ...CATEGORIAS_DOCUMENTOS,
  ...CATEGORIAS_CAPITAL_HUMANO,
};
