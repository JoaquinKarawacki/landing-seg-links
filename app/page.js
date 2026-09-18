import Hero from "@/components/Hero";
import SeccionProyectos from "@/components/SeccionProyectos";
import { PROYECTOS } from "@/datos/proyectos";

export default function Home() {
  const total = PROYECTOS.length;
  const activos = PROYECTOS.filter(
    (proyecto) => proyecto.estado === "activo"
  ).length;

  return (
    <>
      <Hero
        estadisticaValor={total}
        estadisticaLabel={`sistemas · ${activos} activos`}
      />
      <SeccionProyectos proyectos={PROYECTOS} />
    </>
  );
}
