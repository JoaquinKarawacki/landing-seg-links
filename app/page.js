import Hero from "@/components/Hero";
import SeccionProyectos from "@/components/SeccionProyectos";
import { PROYECTOS } from "@/datos/proyectos";

export default function Home() {
  return (
    <>
      <Hero />
      <SeccionProyectos proyectos={PROYECTOS} />
    </>
  );
}
