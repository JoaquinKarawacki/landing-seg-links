"use client";

import { useMemo, useState } from "react";
import BarraFiltros from "./BarraFiltros";
import GrillaProyectos from "./GrillaProyectos";

export default function SeccionProyectos({ proyectos }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const categorias = useMemo(
    () => ["Todos", ...new Set(proyectos.map((proyecto) => proyecto.categoria))],
    [proyectos]
  );

  const proyectosPorBusqueda = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return proyectos;
    return proyectos.filter(
      (proyecto) =>
        proyecto.titulo.toLowerCase().includes(termino) ||
        proyecto.descripcion.toLowerCase().includes(termino)
    );
  }, [proyectos, busqueda]);

  const conteos = useMemo(() => {
    const mapa = { Todos: proyectosPorBusqueda.length };
    for (const proyecto of proyectosPorBusqueda) {
      mapa[proyecto.categoria] = (mapa[proyecto.categoria] ?? 0) + 1;
    }
    return mapa;
  }, [proyectosPorBusqueda]);

  const proyectosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") return proyectosPorBusqueda;
    return proyectosPorBusqueda.filter(
      (proyecto) => proyecto.categoria === categoriaActiva
    );
  }, [proyectosPorBusqueda, categoriaActiva]);

  return (
    <section id="proyectos" className="scroll-mt-[92px]">
      <BarraFiltros
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        conteos={conteos}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <GrillaProyectos proyectos={proyectosFiltrados} />
      </div>
    </section>
  );
}
