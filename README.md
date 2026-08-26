# Central de Proyectos — SEG Ingeniería

Landing interna que centraliza los links a todos los sistemas, dashboards y
herramientas desarrollados para SEG Ingeniería, para que cualquier empleado
los encuentre rápido desde un solo lugar.

**Producción:** https://landing-links-seg-production.up.railway.app

## Stack

- **Next.js 16** (App Router) — JavaScript puro, sin TypeScript.
- **Tailwind CSS v4**.
- **React 19**.
- Sin base de datos ni backend propio: los datos de la grilla pública viven
  en un archivo del repo (`datos/proyectos.js`).
- Despliegue en **Railway** (no Vercel).

El diseño sigue al pie de la letra `GUIA_ESTILOS.md` (paleta, tipografía,
patrones de componentes). Cualquier cambio visual debe respetar esa guía.

## Cómo correr el proyecto en local

```bash
npm install
npm run dev
```

Por defecto levanta en `http://localhost:3000` (si el puerto está ocupado,
Next elige el siguiente disponible y lo avisa en la consola).

Para probar la sección de directivos en local hace falta un `.env.local`
(ver [Variables de entorno](#variables-de-entorno) más abajo) — no está
commiteado por seguridad.

```bash
npm run build   # build de producción, útil para chequear que no rompió nada
npm run lint     # ESLint
```

## Cómo sumar un proyecto nuevo a la grilla pública

Todo el contenido de la grilla sale de **un solo archivo**:
`datos/proyectos.js`. Para agregar un proyecto, sumar un objeto al array
`PROYECTOS`:

```js
{
  id: "slug-unico",
  titulo: "Nombre del proyecto",
  descripcion: "Una o dos oraciones que expliquen qué hace.",
  url: "https://mi-proyecto-production.up.railway.app",
  categoria: "Dashboards" | "Sistemas de gestión" | "Herramientas" | "una categoría nueva",
  estado: "activo" | "en-desarrollo",
}
```

No hace falta tocar ningún componente: las categorías de los filtros y los
contadores de la barra de búsqueda se calculan solos a partir de este
array. Si se usa una categoría nueva que no sea una de las tres actuales,
conviene sumarle también un ícono en
`components/iconos/IconoCategoria.js` (si no, cae en el ícono genérico de
"Sistemas de gestión" por defecto).

Los estados solo se diferencian por texto + un punto de color (rojo
"Activo" / gris "En desarrollo"), nunca por colores temáticos — así lo
exige `GUIA_ESTILOS.md`.

## Sección oculta para directivos (`/directivos`)

Gerencia general y directores tienen una ruta con el link al **CMI
Dashboard** (información sensible de la empresa). Esta ruta:

- **No está linkeada en ningún lado visible** (ni header, ni footer, ni
  sitemap) — se accede solo escribiendo `/directivos` directamente, y
  tiene `robots: noindex` para que tampoco la indexen buscadores.
- Pide una **clave compartida**, verificada en el servidor
  (`app/directivos/acciones.js`) con comparación en tiempo constante
  (`crypto.timingSafeEqual`) — la clave nunca se compara en el navegador.
- Si la clave es correcta, se crea una **cookie de sesión firmada**
  (HMAC-SHA256, `app/directivos/sesion.js`), `httpOnly`, válida 8 horas, sin
  necesidad de base de datos.
- El link al CMI Dashboard está hardcodeado en
  `app/directivos/page.js` (constante `URL_CMI_DASHBOARD`), separado a
  propósito de `datos/proyectos.js` para que nunca termine apareciendo en
  la grilla pública por error.

### Variables de entorno

Copiar `.env.example` a `.env.local` para desarrollo, y cargar las mismas
variables en Railway para producción:

| Variable | Para qué sirve |
|---|---|
| `CLAVE_DIRECTIVOS` | La clave que van a tipear gerencia/directores para entrar a `/directivos`. |
| `CLAVE_DIRECTIVOS_SECRETO` | Secreto usado para firmar la cookie de sesión. Generar uno random y no reutilizarlo de otro proyecto, por ejemplo con `openssl rand -hex 32`. |

Si falta cualquiera de las dos, la ruta `/directivos` no va a poder
autenticar a nadie (mejor eso a que falle en silencio).

Para cambiar la clave de directivos más adelante, alcanza con actualizar
`CLAVE_DIRECTIVOS` en las variables de entorno de Railway y volver a
desplegar — no requiere tocar código.

## Estructura del proyecto

```
app/
  layout.js            → shell HTML, fuente, Header y Footer globales
  page.js              → Home (Hero + grilla de proyectos)
  globals.css          → estilos globales y animaciones
  directivos/
    page.js             → formulario de clave o panel, según haya sesión
    acciones.js          → Server Actions: verificar clave / cerrar sesión
    sesion.js             → firma y validación de la cookie de sesión
components/            → componentes de UI (ver GUIA_ESTILOS.md para los patrones)
components/iconos/     → íconos SVG inline propios del proyecto
datos/proyectos.js     → fuente única de la grilla pública
.claude/skills/         → skills de Claude Code usadas para el diseño frontend
```

## Despliegue en Railway

Ya está desplegado: proyecto **landing-links-seg** en Railway, servicio del
mismo nombre, con `CLAVE_DIRECTIVOS` y `CLAVE_DIRECTIVOS_SECRETO` cargadas
como variables de entorno del servicio (valores reales, distintos a los de
`.env.local`). Railway lo detecta y construye solo vía Railpack (`next
build` / `next start`), sin configuración adicional.

El servicio está conectado al repo de GitHub
([`JoaquinKarawacki/landing-seg-links`](https://github.com/JoaquinKarawacki/landing-seg-links),
rama `main`): cada `git push` a `main` dispara un redeploy automático, no
hace falta correr nada manualmente. Si en algún momento hay que
reconectarlo o cambiar de repo/rama:

```bash
railway service source connect --repo <owner>/<repo> --branch main --service landing-links-seg
```
