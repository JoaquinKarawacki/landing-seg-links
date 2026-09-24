// URLs sensibles que nunca deben aparecer en la grilla pública (datos/proyectos.js).
// Usado por las rutas gateadas /directivos y /dashboard-gerencial.
export const URL_CMI_DASHBOARD = "https://cmi-dashboard-production.up.railway.app";

// URL del Dashboard de Rodamientos: se sirve solo tras clave desde la ruta
// gateada /dashboard-rodamientos, por eso vive acá y no en datos/proyectos.js
// (la data de proyectos se serializa al cliente y filtraría la URL).
export const URL_DASHBOARD_RODAMIENTOS =
  "https://rodamientos-dashboard-production.up.railway.app";
