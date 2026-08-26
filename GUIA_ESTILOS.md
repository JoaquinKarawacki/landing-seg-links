# Guía de Estilos — SEG Ingeniería

> Referencia visual y técnica para el desarrollo coherente del sitio web.
> Stack: Next.js 16 · Tailwind CSS v4 · App Router · Sin TypeScript

---

## 1. Paleta de Colores

La identidad de SEG usa **tres colores base**. No se permite ningún color fuera de esta paleta salvo los grises neutros de Tailwind.

### Colores primarios

| Nombre       | Hex       | Clase Tailwind          | Uso principal |
|---|---|---|---|
| Rojo SEG     | `#ca3517` | `bg-[#ca3517]` / `text-[#ca3517]` | Acción, énfasis, fondos de sección, íconos activos |
| Rojo oscuro  | `#a82d12` | `bg-[#a82d12]`          | Hover del rojo SEG en botones rellenos |
| Rojo profundo| `#8a2410` | `bg-[#8a2410]`          | Degradados, variaciones PHVA |
| Negro        | `#000000` | `bg-black`              | Hero de páginas interiores, CTA final, nav |
| Casi negro   | `#1a1a1a` | `bg-[#1a1a1a]`          | Fondo del footer |

### Grises neutros (Tailwind estándar)

| Uso | Clase |
|---|---|
| Fondo de sección alternada | `bg-gray-50` |
| Borde de cards | `border-gray-100` / `border-gray-200` |
| Texto principal | `text-gray-900` |
| Texto cuerpo | `text-gray-600` |
| Texto secundario / fechas | `text-gray-400` / `text-gray-500` |
| Placeholders de imagen | `bg-gray-200` / `bg-gray-300` |
| Nav interna | `bg-gray-100` |

### ❌ Colores PROHIBIDOS

Nunca usar colores temáticos de Tailwind para diferenciar secciones o tipos de contenido:

```
❌ bg-sky-*, text-sky-*       (azul cielo)
❌ bg-amber-*, text-amber-*   (amarillo)
❌ bg-green-*, text-green-*   (verde)
❌ bg-blue-*, text-blue-*     (azul)
❌ bg-purple-*, text-purple-* (violeta)
```

> **Regla:** si necesitás diferenciar visualmente varios ítems del mismo tipo
> (ej: 4 tipos de energía), diferenciálos por contenido e ícono, no por color.
> Todos van con el mismo esquema rojo + neutro.

---

## 2. Tipografía

### Fuente

**Red Hat Display** — importada via `next/font/google` en `app/layout.js`.

```js
// app/layout.js
import { Red_Hat_Display } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
```

La variable CSS `--font-red-hat` se aplica al `<html>` y se usa en el body via `globals.css`:

```css
body {
  font-family: var(--font-red-hat, "Red Hat Display", Arial, sans-serif);
}
```

### Escala tipográfica

| Elemento | Clases | Peso |
|---|---|---|
| H1 hero (páginas interiores) | `text-4xl sm:text-5xl lg:text-6xl` | `font-black` |
| H1 hero slider (home) | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` | `font-bold` |
| H2 de sección | `text-3xl` | `font-bold` |
| H3 de card / subsección | `text-xl` o `text-2xl` | `font-bold` |
| Subtítulo/tagline del hero | `text-xl sm:text-2xl` | `font-light` |
| Subtítulo rojo destacado | `text-lg` | `font-bold text-[#ca3517]` |
| Cuerpo principal | `text-base` | `leading-relaxed` |
| Texto de card / lista | `text-sm` | `leading-relaxed` |
| Texto auxiliar / fechas | `text-xs` | normal |
| Etiquetas / labels | `text-xs uppercase tracking-widest` | `font-bold` |
| Estadística grande | `text-7xl sm:text-8xl` | `font-black` |

---

## 3. Layout y Espaciado

### Contenedor principal

```html
<div class="max-w-7xl mx-auto px-4">
```

Todas las secciones de contenido usan `max-w-7xl mx-auto px-4`.  
Las secciones de texto centrado (ej: hero de hero-slider, CTA) usan `max-w-5xl` o `max-w-3xl`.

### Padding vertical de secciones

```
py-16   → sección estándar (la gran mayoría)
py-24   → hero de páginas interiores
py-12   → variantes compactas dentro de secciones
```

### Grid de columnas

| Uso | Clases |
|---|---|
| 2 columnas (texto + visual) | `grid grid-cols-1 lg:grid-cols-2 gap-12` |
| 3 columnas (pilares, cards) | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| 4 columnas (pasos proceso) | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` |
| 6 columnas (footer) | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8` |

### Espaciado interno frecuente

```
mb-2    → entre label y título de sección
mb-4    → entre título y subtítulo
mb-6    → entre subtítulo y cuerpo
mb-8    → entre párrafo y botón
mb-10   → entre encabezado de sección y contenido
mb-12   → entre encabezado centrado y grilla
gap-4   → entre pasos/items pequeños
gap-6   → entre cards medianas
gap-8   → entre cards estándar
gap-12  → entre columnas de sección de 2 col
```

---

## 4. Patrones de Sección

### 4.1 Alternancia de fondos (páginas interiores)

Las secciones interiores alternan entre blanco y gris para dar ritmo visual:

```
Sección 1 → bg-white
Sección 2 → bg-gray-50
Sección 3 → bg-white
Sección 4 → bg-gray-50
...
```

Las secciones con fondo rojo (`#ca3517`) **rompen** deliberadamente esta alternancia para crear énfasis. Se usan con moderación (1 o 2 por página).

### 4.2 Encabezado de sección interior

Patrón estándar para el h2 de cada sección dentro de una página interior:

```jsx
<div className="flex items-center gap-4 mb-10">
  <div className="text-[#ca3517]">
    <IconoXxx />   {/* w-8 h-8 */}
  </div>
  <div>
    <h2 className="text-3xl font-bold text-gray-900">Título de Sección</h2>
    <div className="w-16 h-1 bg-[#ca3517] mt-2 rounded" />
  </div>
</div>
```

El subrayado rojo (`w-16 h-1 bg-[#ca3517]`) es el marcador visual de sección, siempre presente.

### 4.3 Encabezado de sección centrado

Para secciones cuyo contenido está centrado (ej: Parques en Uruguay, Novedades):

```jsx
<div className="text-center mb-12">
  <p className="text-[#ca3517] font-bold uppercase tracking-widest text-sm mb-2">
    Supratítulo opcional
  </p>
  <h2 className="text-3xl font-bold text-gray-900">Título</h2>
  <div className="w-16 h-1 bg-[#ca3517] mx-auto mt-4 rounded" />
</div>
```

### 4.4 Secciones sobre fondo rojo

Las secciones con fondo `#ca3517` (Pilares, Impacto, Novedades) usan siempre este patrón de gradiente:

```jsx
<section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#ca3517" }}>
  <div className="absolute inset-0 bg-gradient-to-br from-[#ca3517] via-[#b83015] to-[#8a2410] opacity-80" />
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* contenido */}
  </div>
</section>
```

- Todo el texto interior: `text-white`
- Texto secundario: `text-white/80` o `text-white/85`
- Separador decorativo: `<div className="w-12 h-0.5 bg-white/40 mx-auto" />`

---

## 5. Páginas Interiores — Estructura Estándar

Cada página de una sección del menú (Eficiencia Energética, Energías Renovables, etc.) sigue esta estructura en orden:

```
1. SeccionHero           → fondo negro/oscuro, breadcrumb, h1, tagline, dato destacado
2. NavegacionInterna     → barra sticky gris con anclas a cada sección
3. SeccionA              → bg-white
4. SeccionB              → bg-gray-50         (alterna)
5. SeccionC              → bg-white
6. SeccionRoja           → bg-[#ca3517]       (énfasis, 1-2 por página)
7. ...más secciones alternadas
8. SeccionCTA            → bg-black           (cierre)
```

### Hero de página interior

```jsx
<section className="relative bg-black overflow-hidden py-24 px-4">
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ca3517]" />  {/* acento lateral */}
  <div className="relative z-10 max-w-5xl mx-auto text-white">
    {/* breadcrumb */}
    <nav className="mb-6 text-sm text-gray-400">
      <Link href="/" className="hover:text-[#ca3517] transition-colors">Home</Link>
      <span className="mx-2 text-gray-600">›</span>
      <span className="text-white">Nombre de la Sección</span>
    </nav>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">...</h1>
    <p className="text-xl sm:text-2xl text-gray-300 font-light mb-8">tagline</p>
    {/* dato destacado con borde izquierdo rojo */}
    <div className="inline-block border-l-4 border-[#ca3517] pl-5 py-2">
      <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">...</p>
    </div>
  </div>
</section>
```

### Navegación interna (anclas)

```jsx
<nav className="bg-gray-100 border-b border-gray-200 sticky top-[88px] z-40">
  <div className="max-w-7xl mx-auto px-4">
    <ul className="flex overflow-x-auto gap-0 -mb-px">
      {anclas.map((ancla) => (
        <li key={ancla.etiqueta} className="flex-shrink-0">
          <a
            href={ancla.href}
            className="block px-4 sm:px-6 py-4 text-sm font-medium text-gray-600
                       border-b-2 border-transparent hover:text-[#ca3517]
                       hover:border-[#ca3517] transition-colors duration-200 whitespace-nowrap"
          >
            {ancla.etiqueta}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

> `top-[88px]` = altura del header (barra roja ~36px + nav ~52px)

### CTA de cierre

```jsx
<section className="py-16 bg-black text-white">
  <div className="max-w-3xl mx-auto px-4 text-center">
    <p className="text-white/50 uppercase text-xs tracking-widest mb-4">SEG Ingeniería</p>
    <h2 className="text-3xl font-bold mb-4">Título de llamada a acción</h2>
    <p className="text-gray-400 leading-relaxed mb-8">Descripción breve...</p>
    <Link href="/contacto" className="...btn-rojo-solido...">Texto del botón</Link>
  </div>
</section>
```

---

## 6. Cards

### 6.1 Card con cabecera roja (tipo "Área de Estudio")

Usada para listar servicios, tipos de contenido, áreas temáticas. Es el patrón más frecuente en secciones interiores.

```jsx
<article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
  {/* Cabecera roja */}
  <div className="bg-[#ca3517] p-6 text-white flex flex-col items-center text-center">
    <Icono className="w-10 h-10 mb-3" />   {/* ícono blanco */}
    <h3 className="text-xl font-bold">Título</h3>
  </div>
  {/* Cuerpo */}
  <div className="p-6">
    <p className="text-gray-600 text-sm leading-relaxed mb-5">Descripción...</p>
    <ul className="space-y-2">
      {items.map(item => (
        <li className="flex items-start gap-2 text-sm text-gray-700">
          <span className="text-[#ca3517] font-bold mt-0.5 flex-shrink-0">›</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
</article>
```

### 6.2 Card de novedades / noticias

```jsx
<article className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col">
  <div className="bg-gray-300 h-48 ...">Imagen</div>
  <div className="p-5 flex flex-col flex-1">
    <span className="text-[#ca3517] text-xs font-bold uppercase tracking-wide mb-2">
      Categoría
    </span>
    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 flex-1">
      <a href="#" className="hover:text-[#ca3517] transition-colors">Título</a>
    </h3>
    <time className="text-gray-400 text-xs mb-3 block">dd/mm/aaaa</time>
    <p className="text-gray-600 text-sm leading-relaxed">Descripción...</p>
  </div>
</article>
```

### 6.3 Card de pilar (home, fondo rojo)

```jsx
<article className="flex flex-col items-center text-center text-white">
  <Icono />   {/* w-16 h-16 text-white mx-auto mb-5 */}
  <div className="w-12 h-0.5 bg-white/40 mb-5" />
  <h3 className="text-2xl font-bold mb-3">Título</h3>
  <p className="text-white/85 text-base leading-relaxed mb-7 max-w-xs">Descripción</p>
  <a href="#" className="border border-white/80 text-white px-7 py-2.5 rounded-full
                          text-sm font-semibold hover:bg-white hover:text-[#ca3517]
                          transition-all duration-200">
    Más información
  </a>
</article>
```

### 6.4 Card con borde superior rojo (tipo "Propuesta de Valor")

```jsx
<div className="bg-gray-50 rounded-xl p-7 border-t-4 border-[#ca3517]">
  <h3 className="font-bold text-gray-900 text-lg mb-3">Título</h3>
  <p className="text-gray-600 leading-relaxed text-sm">Texto...</p>
</div>
```

### 6.5 Card de paso numerado (metodología)

```jsx
<div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
  <div className="text-[#ca3517] font-black text-3xl mb-3 leading-none">01</div>
  <h3 className="font-bold text-gray-900 mb-2">Título del paso</h3>
  <p className="text-gray-600 text-sm leading-relaxed">Descripción...</p>
</div>
```

---

## 7. Botones

### Botón relleno rojo (acción principal)

```jsx
<Link
  href="/ruta"
  className="inline-block bg-[#ca3517] text-white px-8 py-2.5 rounded-full
             font-semibold text-sm hover:bg-[#a82d12] transition-colors duration-200"
>
  Texto del botón
</Link>
```

### Botón outline rojo (acción secundaria, sobre fondo blanco)

```jsx
<a
  href="#"
  className="inline-block border-2 border-[#ca3517] text-[#ca3517] px-8 py-2.5
             rounded-full font-semibold text-sm hover:bg-[#ca3517] hover:text-white
             transition-colors duration-200"
>
  Más información
</a>
```

### Botón outline blanco (sobre fondo rojo o negro)

```jsx
<a
  href="#"
  className="inline-block border-2 border-white text-white font-semibold px-10 py-3
             rounded-full hover:bg-white hover:text-[#ca3517] transition-colors duration-200"
>
  Ver Todas
</a>
```

### Tamaños de botón

| Tamaño | Padding | Texto | Uso |
|---|---|---|---|
| Small  | `px-6 py-2`    | `text-sm`  | Links secundarios en cards |
| Normal | `px-8 py-2.5`  | `text-sm`  | Botones de sección |
| Large  | `px-10 py-3`   | `text-base`| CTA principales, hero |

> Todos los botones son siempre `rounded-full` (píldora).

---

## 8. Íconos

### Reglas generales

- **Todos SVG inline** — sin librerías externas (no Heroicons, no Lucide)
- `fill="currentColor"` → el color se hereda de la clase del contenedor
- `aria-hidden="true"` → siempre en íconos decorativos
- `viewBox="0 0 64 64"` → grilla de diseño estándar del proyecto

### Tamaños estándar

| Contexto | Clase |
|---|---|
| Ícono de sección (encabezado) | `w-8 h-8` |
| Ícono de card cabecera roja | `w-10 h-10` |
| Ícono grande (pilares, hero) | `w-16 h-16` |
| Ícono de interfaz (nav, footer) | `w-5 h-5` |
| Ícono mínimo (inline en texto) | `w-4 h-4` |

### Color de íconos

| Contexto | Color | Clase |
|---|---|---|
| Sobre fondo blanco/gris | Rojo SEG | `text-[#ca3517]` |
| En cabecera de card roja | Blanco | heredado del contenedor `text-white` |
| Sobre fondo rojo (estadísticas) | Blanco con opacidad | `text-white/80` |
| En footer | Gris con hover | `text-gray-400 hover:text-[#ca3517]` |

### Íconos disponibles en el proyecto

| Ícono | Archivo | Uso |
|---|---|---|
| Alcancía | `Pilares.js` | Eficiencia energética (home) |
| Molino de viento | `Pilares.js`, `energias-renovables` | Energías renovables |
| H₂ (texto) | `Pilares.js` | Hidrógeno verde |
| Lamparita | `SobreYIndicadores.js` | Sobre SEG |
| Gráfico de barras | `SobreYIndicadores.js` | Indicadores |
| LinkedIn, X | `Footer.js`, `SobreYIndicadores.js` | Redes sociales |
| Verificación (círculo check) | `eficiencia-energetica` | Propuesta valor, ISO |
| Engranaje | `eficiencia-energetica` | Metodología |
| Medidor | `eficiencia-energetica` | Equipamiento |
| Monitoreo (pantalla) | `eficiencia-energetica` | Gestión remota |
| Sol | `energias-renovables` | Solar |
| Biomasa (hoja) | `energias-renovables` | Biomasa |
| PCH (presa) | `energias-renovables` | Centrales hidroeléctricas |
| Globo terráqueo | `energias-renovables` | Presencia regional |
| Hoja, Rayo | `energias-renovables` | Impacto ambiental |

---

## 9. Componentes Globales

### Header (`components/Header.js`)

- **Tipo:** Client Component (`"use client"`)
- **Posición:** `sticky top-0 z-50`
- **Estructura:**
  1. Barra roja superior → `bg-[#ca3517] py-2 text-xs sm:text-sm` — mensaje institucional
  2. Nav negra → `bg-black h-16` — logo + menú desktop + selector idioma + hamburguesa
  3. Menú mobile → desplegable con accordion para submenús
- **Altura total:** ~88px (usada como `top-[88px]` en navs internas)
- **Submenú desktop:** dropdown absoluto `bg-black border border-gray-700` con hover `bg-[#ca3517]`
- **Estado activo:** ítem de la ruta actual → `text-[#ca3517]` (via `usePathname`)

### Footer (`components/Footer.js`)

- **Tipo:** Server Component
- **Fondo:** `bg-[#1a1a1a]`
- **Separador previo:** SVG diagonal con línea `#ca3517` (transición desde fondo blanco)
- **Estructura:** grilla `xl:grid-cols-6` + barra inferior con logo SEG y créditos

---

## 10. Animaciones

Definidas en `app/globals.css`, solo aplicadas en el hero slider del home:

| Clase CSS | Efecto | Duración | Uso |
|---|---|---|---|
| `.animar-entrada` | fadeIn + translateY(30px→0) | 0.7s ease-out | Título del hero slider |
| `.animar-boton` | fadeIn con delay 0.4s | 1s ease-out | Botón "Ver Video" del slider |

> La animación de entrada en el slider se dispara al cambiar la `key` del `<h1>`,
> lo que fuerza un re-montaje del elemento en React.

**Transiciones en componentes interactivos:**

```
transition-colors duration-200   → hover en links, botones y menú
transition-all duration-200       → hover en botones con cambio de tamaño
transition-shadow duration-300    → sombra del header al hacer scroll
transition-transform duration-200 → chevron del submenú (rotate-180)
```

---

## 11. Scroll y Navegación

- `scroll-behavior: smooth` → definido en `globals.css` sobre `html`
- Anclas internas usan `href="#id-de-seccion"` y el `id` correspondiente en el `<section>`
- La nav interna sticky usa `top-[88px]` (altura exacta del header) para no quedar tapada

---

## 12. Reglas de Arquitectura de Archivos

```
app/
  layout.js           → HTML shell + Header + Footer (aplica a TODAS las páginas)
  page.js             → Solo el contenido del home (sin Header/Footer)
  globals.css         → @import tailwindcss, fuente, animaciones globales
  [seccion]/
    page.js           → Exporta metadata + todos los sub-componentes de la página

components/
  Header.js           → "use client" — sticky, menús, scroll
  HeroSlider.js       → "use client" — slider con useState/useEffect
  Pilares.js          → Server Component
  SobreYIndicadores.js → Server Component
  Novedades.js        → Server Component
  Footer.js           → Server Component
```

**Convención de nombres:**
- Componentes: `PascalCase` en español (`SeccionHero`, `CardNovedad`)
- Constantes de datos: `UPPER_SNAKE_CASE` (`TIPOS_ENERGIA`, `ANCLAS`)
- Funciones/variables: `camelCase` en español (`menuAbierto`, `irADiapositiva`)

---

## 13. Checklist para Nuevas Páginas Interiores

Antes de dar por terminada cualquier página nueva, verificar:

- [ ] `export const metadata` con `title` y `description` en español
- [ ] Hero con fondo negro/oscuro, breadcrumb y acento lateral rojo `w-1 bg-[#ca3517]`
- [ ] Nav interna sticky con `top-[88px]` y todos los `id` de secciones correspondientes
- [ ] Secciones alternando `bg-white` / `bg-gray-50`
- [ ] Encabezados de sección con ícono rojo + `h2 text-3xl font-bold` + línea roja `w-16 h-1`
- [ ] Cards usando patrón cabecera roja + cuerpo blanco (sin colores temáticos ajenos)
- [ ] Botones todos `rounded-full` con las clases exactas documentadas arriba
- [ ] Íconos todos SVG inline con `fill="currentColor"` y `aria-hidden="true"`
- [ ] CTA de cierre con `bg-black` y botón rojo sólido
- [ ] Sin ningún color fuera de la paleta SEG (`sky`, `amber`, `green`, `blue`, etc.)
- [ ] Todos los links internos con `<Link>` de Next.js (no `<a>` para rutas internas)

---

## 14. Páginas Implementadas

| Ruta | Estado | Notas |
|---|---|---|
| `/` | ✅ Completo | Home con slider, pilares, sobre SEG, novedades |
| `/eficiencia-energetica` | ✅ Completo | 6 secciones + nav interna |
| `/energias-renovables` | ✅ Completo | 8 secciones + nav interna |
| `/movilidad-electrica` | ✅ Completo | 5 secciones + nav interna |
| `/seg-consulting` | ✅ Completo | 6 secciones + nav interna |
| `/seg-heliotec` | ✅ Completo | 3 secciones + nav interna |
| `/contacto` | ✅ Completo | 3 secciones + nav interna |
