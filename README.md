# Central de Proyectos — SEG Ingeniería

Landing interna que centraliza los links a todos los sistemas, dashboards y
herramientas desarrollados para SEG Ingeniería, para que cualquier empleado
los encuentre rápido desde un solo lugar.

**Producción:** https://landing-links-seg-production.up.railway.app

## Stack

- **Next.js 16** (App Router) — JavaScript puro, sin TypeScript.
- **Tailwind CSS v4**.
- **React 19**.
- Sin base de datos: la grilla pública vive en un archivo del repo
  (`datos/proyectos.js`); los documentos (Documentos y Capital humano) se
  guardan en disco — un Volumen de Railway — con un índice JSON, y se
  administran desde el panel `/admin-documentos` (Server Actions de Next).
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

Para probar las secciones con clave (directivos, dashboard gerencial y el
panel de documentos) en local hace falta un `.env.local`
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

## Cómo sumar/eliminar un documento de Documentos (`/documentos`)

Los documentos **no se commitean al repo** (la vieja carpeta
`public/documentos/` ya se migró al Volumen y se eliminó): se administran desde el panel
interno `/admin-documentos` (subir/eliminar), protegido por clave. Los
archivos y su metadata se persisten fuera del repo, en la carpeta que indique
`RUTA_ALMACENAMIENTO_DOCUMENTOS` (en Railway, el mount path del **Volumen**
adjunto al servicio; en local, `./almacenamiento/documentos` si esa variable
no está seteada) — sobreviven a los redeploys sin necesidad de `git push`.

Las secciones/categorías sí siguen fijas en código, en
`datos/documentos.js` (`CATEGORIAS_DOCUMENTOS`: hoy `Procedimientos →`
un sector por categoría (Administración, AE, Consulting, ECR, Heliotec,
Indicadores, ISO, Renovables, Ventas, SEG eMove) y `Marketing → Logos /
Templates / Formatos de presentación`). Para sumar una categoría o sección
nueva alcanza con editar ese objeto — el panel y la página pública se arman
solos a partir de él. El panel solo acepta categorías que existan ahí (lo
valida también en el servidor).

Ojo al **renombrar** una categoría que ya tiene archivos: cada documento
guarda el nombre de su categoría en el índice, así que con el nombre nuevo
dejan de mostrarse hasta volver a subirlos (o corregir `indice.json`).

Arquitectura (ver `lib/`):

- `lib/almacenamientoDocumentos.js`: guarda/borra/lee los bytes en disco.
- `lib/repositorioDocumentos.js`: índice de metadata (`indice.json`, en la
  misma carpeta que los archivos) — alta, baja y listado de documentos.
- `lib/tiposMime.js`: whitelist de extensiones permitidas al subir (pdf,
  doc/docx, xls/xlsx, ppt/pptx, png/jpg/jpeg/gif, cdr, zip) y su
  Content-Type/disposición al servirlos.
- `app/documentos/archivo/[id]/route.js`: sirve los archivos al público
  (PDF e imágenes se abren en el navegador, el resto se descarga). Solo
  sirve ids que estén en el índice.

Si en algún momento hay que migrar a otro backend de storage (o a una base
real en vez del índice JSON), solo hay que reescribir esos dos archivos de
`lib/` — nada de la UI ni de las Server Actions cambia.

## Capital humano (`/capital-humano`)

Segunda sección de documentos, con el mismo formato que `/documentos` y un
pill propio en la barra de filtros de la home. La página principal agrupa
Organigrama, Cumpleaños y Sociedades y emergencias.

Comparte todo con Documentos: el mismo almacenamiento (`indice.json` y el
Volumen), la misma ruta de descarga (`/documentos/archivo/[id]`) y el mismo
panel `/admin-documentos`, donde aparece como un grupo más en el selector de
categoría. Cada página muestra solo las secciones de su propia taxonomía:
`CATEGORIAS_DOCUMENTOS` y `CATEGORIAS_CAPITAL_HUMANO` en
`datos/documentos.js` (para sumar o renombrar categorías, se edita ahí). El
listado en sí vive en `components/ListadoDocumentos.js`, usado por todas las
páginas.

### Documentación personal (`/capital-humano/documentacion-personal`)

Las **Cédulas de identidad** y los **Carnés de salud** (datos personales más
sensibles) no se muestran en la página principal: viven en una página aparte,
a la que se llega por un link/título al pie de `/capital-humano`. En el índice
se guardan igual bajo la sección `Capital humano` (así el panel las sigue
subiendo en el mismo grupo y no hay que re-subir nada); la página aparte las
filtra por categoría y las reetiqueta bajo el título "Documentación personal"
(`CATEGORIAS_DOCUMENTACION_PERSONAL` en `datos/documentos.js`).

**Importante:** es pública, igual que `/documentos` (sin clave). Contiene
datos personales del equipo (CI, carnés de salud, contactos de emergencia),
así que esos archivos **nunca se commitean al repo**: se suben solo desde el
panel.

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
- El link al CMI Dashboard vive en `datos/enlaces-restringidos.js`
  (constante `URL_CMI_DASHBOARD`), separado a propósito de
  `datos/proyectos.js` para que nunca termine apareciendo en la grilla
  pública por error.

## Etiqueta "Dashboard Gerencial" (`/dashboard-gerencial`)

Además de `/directivos`, hay una segunda puerta de entrada al mismo CMI
Dashboard, esta vez **visible**: un pill "Dashboard Gerencial" al lado de
los filtros de categoría en la home (`components/BarraFiltros.js`), pensado
para que gerencia lo encuentre sin tener que conocer una URL oculta.

Funciona con el mismo esquema que `/directivos` (clave compartida + cookie
de sesión firmada de 8 horas, sin base de datos), pero con su propia clave
y su propio secreto (`app/dashboard-gerencial/sesion.js` y
`acciones.js`). Ambas rutas comparten la URL del CMI Dashboard vía
`datos/enlaces-restringidos.js`, así que solo hay que actualizarla en un
lugar.

Al ingresar la clave correcta se muestra una `TarjetaProyecto` (el mismo
componente de card que usa la grilla pública) con el link al CMI
Dashboard — es la única `TarjetaProyecto` que existe fuera de
`datos/proyectos.js`, justamente para que ese proyecto nunca aparezca en
la grilla pública.

**Importante:** esto deja dos claves distintas abriendo el mismo
dashboard sensible. Tratarlas con el mismo cuidado.

## Dashboard de Rodamientos protegido (`/dashboard-rodamientos`)

El **Dashboard de Rodamientos** sigue apareciendo como tarjeta en la sección
Dashboards de la grilla, pero ya no abre directo: pide una **clave compartida**
antes de mostrar el link, con el mismo esquema que `/dashboard-gerencial`
(clave verificada en el servidor con `crypto.timingSafeEqual` + cookie de
sesión firmada HMAC-SHA256 de 8 horas, sin base de datos), con su propia
clave/secreto (`app/dashboard-rodamientos/`) — a propósito **no** comparte
código con las otras rutas gateadas, para no acoplarlas.

- En la grilla, la tarjeta gateada se reconoce porque en vez de url trae
  `rutaInterna` (en `datos/proyectos.js`): muestra un candado + "Acceso con
  clave" y su botón lleva a `/dashboard-rodamientos` (misma pestaña), no a la
  URL externa.
- La **URL real** del dashboard vive en `datos/enlaces-restringidos.js`
  (`URL_DASHBOARD_RODAMIENTOS`), **no** en `datos/proyectos.js`: como la data de
  proyectos se serializa al cliente, dejarla ahí filtraría la URL aunque la
  tarjeta estuviera gateada.
- Si la clave es correcta, se muestra una `TarjetaProyecto` con el link real y
  un "Cerrar sesión". La ruta tiene `robots: noindex`.

Para tratar cualquier dashboard más como gateado, alcanza con darle
`rutaInterna` en `datos/proyectos.js` (en vez de `url`) y crear su ruta con el
mismo patrón.

## Panel de administración de Documentos (`/admin-documentos`)

Acceso escondido en un link chico y de bajo contraste al final del Footer
("Acceso interno"). Mismo esquema que `/directivos` y
`/dashboard-gerencial` (clave compartida + cookie de sesión firmada
HMAC-SHA256 de 8 horas, sin base de datos), con su propia clave/secreto
(`app/admin-documentos/sesion.js`) — a propósito **no** comparte código con
esas otras dos rutas, para no acoplarlas.

Desde ahí se puede subir un documento nuevo (título + categoría existente +
archivo) o eliminar uno existente. Las Server Actions
(`app/admin-documentos/acciones.js`) vuelven a validar la cookie de sesión
al principio de cada una — no alcanza con que la página esté gateada,
porque son acciones destructivas sobre archivos reales.

### Variables de entorno

Copiar `.env.example` a `.env.local` para desarrollo, y cargar las mismas
variables en Railway para producción:

| Variable | Para qué sirve |
|---|---|
| `CLAVE_DIRECTIVOS` | La clave que van a tipear gerencia/directores para entrar a `/directivos`. |
| `CLAVE_DIRECTIVOS_SECRETO` | Secreto usado para firmar la cookie de sesión de `/directivos`. Generar uno random y no reutilizarlo de otro proyecto, por ejemplo con `openssl rand -hex 32`. |
| `CLAVE_DASHBOARD_GERENCIAL` | La clave para entrar a `/dashboard-gerencial` desde la etiqueta de la home. |
| `CLAVE_DASHBOARD_GERENCIAL_SECRETO` | Secreto usado para firmar la cookie de sesión de `/dashboard-gerencial`. Generar uno distinto al de directivos, por ejemplo con `openssl rand -hex 32`. |
| `CLAVE_DASHBOARD_RODAMIENTOS` | La clave para entrar a `/dashboard-rodamientos` (Dashboard de Rodamientos, gateado desde la grilla). |
| `CLAVE_DASHBOARD_RODAMIENTOS_SECRETO` | Secreto usado para firmar la cookie de sesión de `/dashboard-rodamientos`. Generar uno distinto a los de arriba, por ejemplo con `openssl rand -hex 32`. |
| `CLAVE_ADMIN_DOCUMENTOS` | La clave para entrar a `/admin-documentos` (subir/eliminar documentos). |
| `CLAVE_ADMIN_DOCUMENTOS_SECRETO` | Secreto usado para firmar la cookie de sesión de `/admin-documentos`. Generar uno distinto a los de arriba. |
| `RUTA_ALMACENAMIENTO_DOCUMENTOS` | Carpeta donde se guardan los documentos subidos (archivos + índice de metadata). En Railway, el mount path del **Volumen** persistente del servicio (ej. `/data/documentos`). Si se deja vacía, en local usa `./almacenamiento/documentos` dentro del repo. |

Si falta alguna de las variables de una ruta, esa ruta no va a poder
autenticar a nadie (mejor eso a que falle en silencio).

Para cambiar cualquiera de las claves más adelante, alcanza con actualizar
la variable correspondiente en Railway y volver a desplegar — no requiere
tocar código.

**Ojo:** cambiar solo la clave (`CLAVE_*`) **no cierra las sesiones ya
abiertas** — las cookies siguen siendo válidas hasta que vencen (8 horas),
porque se firman con el secreto, no con la clave. Si la clave se filtró,
rotar también el `*_SECRETO` correspondiente: eso invalida todas las
sesiones de esa ruta al instante.

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
  dashboard-gerencial/
    page.js             → mismo patrón que directivos/, clave propia
    acciones.js          → Server Actions: verificar clave / cerrar sesión
    sesion.js             → firma y validación de la cookie de sesión
  admin-documentos/
    page.js             → formulario de clave, o panel de alta/baja de documentos
    acciones.js          → Server Actions: clave, subir documento, eliminar documento
    sesion.js             → firma y validación de la cookie de sesión (propia, no compartida)
  documentos/
    page.js             → sección Documentos (lee lib/repositorioDocumentos.js)
    archivo/[id]/route.js → sirve los archivos subidos al público
  capital-humano/
    page.js             → sección Capital humano (mismo almacenamiento que Documentos)
    documentacion-personal/page.js → cédulas y carnés de salud, en página aparte con link
lib/
  almacenamientoDocumentos.js → bytes en disco (guardar/eliminar/leer)
  repositorioDocumentos.js     → metadata de documentos (índice JSON)
  tiposMime.js                  → extensiones permitidas + Content-Type
components/            → componentes de UI (ver GUIA_ESTILOS.md para los patrones)
components/ListadoDocumentos.js → listado por sección/categoría (Documentos y Capital humano)
components/iconos/     → íconos SVG inline propios del proyecto
components/admin/      → componentes del panel de administración
datos/proyectos.js     → fuente única de la grilla pública
datos/documentos.js    → taxonomía de secciones/categorías de Documentos y Capital humano
datos/enlaces-restringidos.js → URLs sensibles que no van en la grilla pública
.claude/skills/         → skills de Claude Code usadas para el diseño frontend
```

## Despliegue en Railway

Ya está desplegado: proyecto **landing-links-seg** en Railway, servicio del
mismo nombre, con `CLAVE_DIRECTIVOS`, `CLAVE_DIRECTIVOS_SECRETO`,
`CLAVE_DASHBOARD_GERENCIAL`, `CLAVE_DASHBOARD_GERENCIAL_SECRETO`,
`CLAVE_ADMIN_DOCUMENTOS`, `CLAVE_ADMIN_DOCUMENTOS_SECRETO` y
`RUTA_ALMACENAMIENTO_DOCUMENTOS` cargadas como variables de entorno del
servicio (valores reales, distintos a los de `.env.local`). Railway lo
detecta y construye solo vía Railpack (`next build` / `next start`), sin
configuración adicional.

**Volumen para los documentos:** el servicio necesita un **Volumen**
persistente montado (por ejemplo en `/data`) para que los documentos
subidos desde `/admin-documentos` sobrevivan a los redeploys —
`RUTA_ALMACENAMIENTO_DOCUMENTOS` tiene que apuntar dentro de ese mount path
(ej. `/data/documentos`). Se crea desde el dashboard de Railway, en la
pestaña del servicio → Volumes.

El servicio está conectado al repo de GitHub
([`JoaquinKarawacki/landing-seg-links`](https://github.com/JoaquinKarawacki/landing-seg-links),
rama `main`): cada `git push` a `main` dispara un redeploy automático, no
hace falta correr nada manualmente. Si en algún momento hay que
reconectarlo o cambiar de repo/rama:

```bash
railway service source connect --repo <owner>/<repo> --branch main --service landing-links-seg
```
