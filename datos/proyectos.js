// Fuente única de la grilla de proyectos.
// Para sumar un proyecto nuevo, agregar un objeto al array: no hace falta tocar ningún componente.
export const PROYECTOS = [
  {
    id: "dashboard-rodamientos",
    titulo: "Dashboard de Rodamientos",
    descripcion:
      "Seguimiento del estado de los rodamientos de los parques Peralta y Cerro Grande.",
    url: "https://rodamientos-dashboard-production.up.railway.app",
    categoria: "Dashboards",
    estado: "activo",
  },
  {
    id: "dashboard-segemove",
    titulo: "Dashboard SEG eMove",
    descripcion: "Control y monitoreo de los cargadores de SEG eMove.",
    url: "https://dashboard-segemove-production.up.railway.app",
    categoria: "Dashboards",
    estado: "activo",
  },
  {
    id: "dashboard-parques",
    titulo: "Dashboard de Parques",
    descripcion:
      "Estado general de Cerro Grande y Peralta: disponibilidad, pérdida y producción (Power BI).",
    url: "https://app.powerbi.com/groups/a48b234a-f14c-4f81-8936-fd0f296beb8f/reports/31bee31d-cb92-44c5-8e96-5b8599f93d7a/b958f2f0c697405130fc?experience=power-bi",
    categoria: "Dashboards",
    estado: "activo",
  },
  {
    id: "gestion-licencias",
    titulo: "Gestión de Licencias",
    descripcion: "Sistema de gestión de licencias de SEG Ingeniería.",
    url: "https://mvp-licecias-seg-frontend-production.up.railway.app",
    categoria: "Sistemas de gestión",
    estado: "activo",
  },
  {
    id: "control-de-equipos",
    titulo: "Control de Equipos",
    descripcion:
      "Sistema para el control de equipos. En etapa de prueba, próximamente en producción.",
    url: "https://frontend-control-de-equipos-seg-production.up.railway.app",
    categoria: "Sistemas de gestión",
    estado: "en-desarrollo",
  },
  {
    id: "gestion-interna",
    titulo: "Gestión Interna",
    descripcion:
      "Órdenes de compra, propuestas de inversión, clientes y proveedores. Próximamente en producción.",
    url: "https://frontend-production-cbe52.up.railway.app",
    categoria: "Sistemas de gestión",
    estado: "en-desarrollo",
  },
  {
    id: "extractor-facturas",
    titulo: "Extractor de Facturas",
    descripcion:
      "Subís una factura en PDF y devuelve un Excel con todos los datos extraídos.",
    url: "https://parser-facturas-production.up.railway.app",
    categoria: "Herramientas",
    estado: "activo",
  },
  {
    id: "compras-estatales",
    titulo: "Compras Estatales",
    descripcion:
      "Releva las compras estatales de Uruguay y permite marcarlas como solicitadas o descartarlas.",
    url: "https://scraper-compras-estatales-uruguay-production.up.railway.app",
    categoria: "Herramientas",
    estado: "activo",
  },
];
