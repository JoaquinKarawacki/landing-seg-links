// Formateo de fechas para mostrar a personas, en hora de Uruguay.
// En la base se guarda SIEMPRE en UTC (ISO 8601); acá se convierte a la zona
// local solo al mostrar. Se usa el nombre IANA "America/Montevideo" en vez de un
// offset -3 fijo: así sigue siendo correcto si cambian las reglas de horario.

const ZONA = "America/Montevideo";

export function formatearFechaHora(fechaIso) {
  if (!fechaIso) return "";
  const fecha = new Date(fechaIso);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toLocaleString("es-UY", {
    timeZone: ZONA,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatearFecha(fechaIso) {
  if (!fechaIso) return "";
  const fecha = new Date(fechaIso);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toLocaleDateString("es-UY", {
    timeZone: ZONA,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
