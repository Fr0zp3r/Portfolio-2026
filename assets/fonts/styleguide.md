# Styleguide — Portafolio Julio Morcillo

Documento operativo para Claude Design (y cualquier asistente que toque el sistema visual).
Lectura obligada antes de proponer variantes. Todo lo definido aquí es la fuente de verdad — si una sugerencia lo contradice, declinarla.

Stack inamovible: **HTML5 + CSS3 + JS vanilla + GSAP 3.12 (CDN)**. Sin frameworks, sin build step en runtime, sin Tailwind, sin librerías de motion alternativas.

---

## 1. Tono y voz

- **Editorial · sobrio · técnico**. Sin ruido, sin clichés de portfolio, sin gradientes, sin glow.
- **Audiencia**: clientes B2B, agencias, estudios. La página debe transmitir criterio antes que ornamento.
- **Tipografía manda**. El sistema vive en Fraunces y Archivo.
- **Cursivas Fraunces (`<em>`) son el único acento**. Color `--rust`, `SOFT 100`. No inventar otros mecanismos de acento (subrayado, peso arbitrario, color extra).

---

## 2. Tokens de color

Definidos en `styles/main.css :root`. No introducir colores nuevos.

```css
--bone:        #EFEAE0;             /* fondo principal — papel */
--bone-deep:   #E6DFD1;             /* fondos secundarios */
--ink:         #141210;             /* texto principal, líneas fuertes */
--ink-soft:    #2A2723;             /* texto editorial extenso */
--ink-mute:    #6B665D;             /* labels, captions, monos */
--rust:        #B8432A;             /* acento único — cursivas, focus */
--rust-deep:   #8F3320;             /* hover de rust */
--line:        rgba(20,18,16,0.12); /* hairlines */
--line-strong: rgba(20,18,16,0.25); /* divisores fuertes */
```

Excepciones aceptadas (semánticas, sólo dot disponibilidad):

| Color | Uso exacto |
|---|---|
| `#2F9E44` | `.hero__avail::before` — dot disponibilidad sobre fondo `--bone` |
| `#4ade80` | `.contact__block .dot` — dot disponibilidad sobre fondo `--ink` (sección contact dark) |

No introducir más colores semánticos sin discusión.

### Cuándo usar qué

| Token | Uso |
|---|---|
| `--bone` | Fondo de página, cards primarias |
| `--bone-deep` | Secciones diferenciadas, hover sutil |
| `--ink` | Títulos, body principal, líneas |
| `--ink-soft` | Párrafos editoriales largos |
| `--ink-mute` | Captions, labels mono, metadata |
| `--rust` | `<em>`, focus ring, hover de acento |
| `--rust-deep` | Estado hover sobre rust |
| `--line` / `--line-strong` | Divisores |

---

## 3. Tokens tipográficos

```css
--display: 'Fraunces', Georgia, serif;
--sans:    'Archivo', -apple-system, sans-serif;
--mono:    ui-monospace, SFMono-Regular, Consolas, monospace;
```

### Fraunces (display, variable)

Ejes disponibles: `opsz` 9–144 · `SOFT` 0–100 · `WONK` 0–1 · `wght` 200–900 · `ital` 0–1.

| Uso | opsz | SOFT | wght | letter-spacing |
|---|---:|---:|---:|---:|
| Hero · sección H1/H2 | 144 | 20 | 380–400 | -0.045em |
| Cursivas de acento `<em>` | 144 | 100 | 300 | inherit |
| Lede / display extenso | 14 | 50 | 400 | -0.02em |
| Números index (`§ 02`, `W / 03`) | 144 | 0 | 400 | 0 |

Cargada localmente:
```css
@font-face {
  font-family: 'Fraunces';
  src: url('../assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

### Archivo (UI + body, variable)

Ejes: `wght` 300–700 · `wdth` 75%–125% · `ital` 0–1.

| Uso | wght | wdth |
|---|---:|---:|
| UI / botones | 500 | 100% |
| Body cuerpo | 400 | 100% |
| Labels | 500 | 100% |
| Énfasis cuerpo | 600 | 100% |

### Mono

10–11px, `text-transform: uppercase`, `letter-spacing: 0.06–0.1em`. Usos: `case-hero__metaBar`, `s-head__tag`, footer h4, navbar.

### Escala

Sin escala fija — usar `clamp()` con tokens. Ejemplos:

```css
font-size: clamp(48px, 8vw, 120px);   /* hero title */
font-size: clamp(28px, 4vw, 48px);    /* section title */
font-size: clamp(18px, 1.6vw, 22px);  /* lede */
font-size: 16px;                      /* body */
font-size: 11px;                      /* mono labels */
```

---

## 4. Tokens de espaciado

```css
--pad:    clamp(16px, 2.5vw, 40px);  /* padding lateral global */
--gutter: clamp(12px, 1.5vw, 24px);  /* entre columnas */
--nav-h:  64px;                      /* altura navbar */
```

Cualquier espacio nuevo debe ser `clamp()` o múltiplo de los tokens. Sin números mágicos.

### Ritmo vertical

| Bloque | Margen entre |
|---|---|
| Sección a sección | `clamp(80px, 12vw, 160px)` |
| Heading a body | `clamp(16px, 2vw, 32px)` |
| Párrafo a párrafo | 1em |
| Card a card en grid | `var(--gutter)` |

---

## 5. Movimiento

Doc canónico: [docs/motion-system.md](../../docs/motion-system.md). Resumen:

```css
--trans-fast: 200ms cubic-bezier(.7,0,.2,1);  /* hovers, microestados */
--trans-med:  450ms cubic-bezier(.7,0,.2,1);  /* navbar, cards */
```

GSAP equivalente: `ease: "power3.inOut"` o `cubic-bezier(0.7, 0, 0.2, 1)` custom.

### Reglas

- **Reveals**: 480–720ms, una sola vez (no rebote en re-entrada).
- **Hovers**: 160–320ms.
- **Hero**: word-mask por líneas, entrada desde baseline. Mobile: menos delay.
- **Media/cards**: 450–720ms, sin cambios de layout.
- **Prohibido**: glow, glitch, bounce elástico, scroll-jacking, parallax pesado, animar bloques largos de lectura.

### Estados que rompen movimiento

- `prefers-reduced-motion: reduce` → sin movimiento funcional.
- `?capture=1` query → todo visible, sin timelines, sin parallax, sin cursor, sin progress.

Toda animación nueva debe respetar ambos.

---

## 6. Foco

```css
:focus-visible {
  outline: 2px solid var(--rust);
  outline-offset: 3px;
  border-radius: 2px;
}
```

No remover en interactivos. Es la única señal de foco.

---

## 7. Convención BEM

`.bloque__elemento--modificador`. Sin guiones simples internos; si hace falta, camelCase dentro del segmento.

### Componentes existentes (no inventar nuevos sin justificación)

| Componente | Variantes | Notas |
|---|---|---|
| `.work` | `--hero`, `--split`, `--compact` | Mutuamente excluyentes |
| `.principle` | — | Cards de principios |
| `.xp` | — | Cards de experiencia |
| `.mini-piece` | — | Pieza pequeña |
| `.s-head` | con `__tag` y `__title` | Encabezado de sección |
| `.nav` | desktop | Pareada con `.drawer` mobile |
| `.drawer` | mobile | Accesible con teclado |
| `.contact` | con `__email`, `__block` | |
| `.foot` | con `__col` | Footer global |
| `.clients` | con `__track` | Marquee, animación CSS |

### Componentes de case-study

| Componente | Notas |
|---|---|
| `.case-hero` | `__metaBar`, `__head`, `__title`, `__manifesto`, `__keydata`, `__media` |
| `.heroCard` | `__title`, `__row` — ficha técnica |
| `.snapshot snapshot--index` | Índice de capítulos |
| `.sectionHead` | `__title` |
| `.chapter chapter--editorial` / `chapter--showcase` | Layouts de capítulo |
| `.factCard` | `__title`, `__body` |
| `.caseInterlude` | `__text`, `__sig`, `__hint` |
| `.production` | `__stats`, `__stat`, `__num`, `__num--word`, `__label`, `__list` |
| `.proofBand` | `__scope` |
| `.credits` | `__wrap`, `__list`, `__row` |
| `.outro` | `__meta`, `__nav`, `__navItem`, `__navItem--disabled`, `__navKicker`, `__navTitle`, `__navMeta`, `__quick`, `__quickItem`, `__quickItem--accent`, `__legal` |

---

## 8. Numeración editorial

| Tipo | Formato | Ejemplo |
|---|---|---|
| Sección grande | `§ XX — Nombre` | `§ 02 — Trabajos seleccionados` |
| Trabajo | `W / XX` | `W / 03` |
| Principio | `01`, `02`, `03` | sin formato extra |
| Capítulo de caso | `§ XX` | `§ 04` |

No cambiar la convención.

---

## 9. Acento editorial — `<em>`

Es **el** mecanismo de acento de la marca.

```html
<h1>Qué hago, <em>y cómo</em>.</h1>
<h2>El <em>símbolo</em> primero.</h2>
```

CSS:
```css
em {
  font-family: var(--display);
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100, "wght" 300;
  color: var(--rust);
}
```

No usar otros mecanismos (subrayado, color arbitrario, peso) para acentuar.

---

## 10. Bilingüe (ES/EN)

- ES default. EN espejo en `/en/works/<slug>.html`.
- Home y secciones internas: `data-i18n="key"` + `data-i18n-attr="atributo:key"` resueltos por `scripts/i18n.js` desde `content/es.json` / `content/en.json`.
- Case studies: copy hidratado por `scripts/case-study.js` desde `content/cases/<slug>.json` → `i18n.es|en`.
- Mirrors EN tienen copy hardcoded EN además de la hidratación JS.
- Idiomas detectados desde `<html lang="es|en">`.
- Al añadir copy nuevo: agregar clave en **ambos** `es.json` y `en.json`.

---

## 11. Imágenes

Pipeline:

1. Original alta resolución → `assets/images/_originals/`.
2. `npm run optimize:images` → genera `nombre.jpg`, `nombre@2x.jpg`, `nombre.webp`, `nombre@2x.webp`.
3. Markup:
   ```html
   <picture>
     <source srcset="../assets/images/foo.webp 1x, ../assets/images/foo@2x.webp 2x" type="image/webp">
     <img src="../assets/images/foo.jpg" alt="..." width="1200" height="800" loading="lazy" decoding="async">
   </picture>
   ```
4. Hero LCP: `loading="eager" fetchpriority="high" decoding="async"`. Resto: `loading="lazy" decoding="async"`.
5. Siempre con `width` y `height` para evitar CLS.

---

## 11.5. Excepciones visuales reglamentadas

El sistema es editorial sobrio (sin gradientes, sin glassmorphism, sin sombras pesadas). Las **dos únicas excepciones** permitidas en producción están baked en el código actual y no deben extenderse a otros componentes sin discusión:

### Nav backdrop blur

```css
.nav {
  background: rgba(239, 234, 224, 0.72);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
}
```

Razón: nav es sticky sobre contenido editorial; el blur preserva legibilidad sin opacar el papel completamente. Saturate compensa el desaturado del blur.

### Clients marquee mask

```css
.clients {
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
```

Razón: marquee horizontal infinito necesita fade en bordes para no cortar bruscamente.

**Cualquier otra propuesta de blur, mask o filtro se rechaza por defecto.**

---

## 12. Lo que se rechaza

- Migrar a React/Vue/Svelte/Astro/Next.
- Reemplazar GSAP por Framer Motion / react-spring / anime.js.
- Build step (Vite, Webpack, Parcel) para servir.
- Tailwind / shadcn / utilidades CSS — los tokens en `:root` son la fuente.
- Three.js, partículas, glassmorphism, efectos que rompan el lenguaje editorial.
- Inventar colores fuera del set de tokens.
- Cambiar BEM o eliminar `<em>` como mecanismo de acento.
- Quitar modo `?capture=1` o `prefers-reduced-motion`.
- Documentación o comentarios excesivos en código.

---

## 13. Lo que se quiere

- Refinamiento editorial dentro del sistema actual.
- Microinteracciones GSAP sobrias.
- Mejoras de LCP, CLS, peso de bundle, peso de imágenes.
- Accesibilidad: foco visible, contraste AA, navegación teclado, lectores de pantalla, `aria-label` correcto.
- Consistencia: cada pieza nueva debe sentirse del mismo sistema.

---

## 14. Verificación antes de cerrar iteración

- Mobile (390px), desktop (1280–1440px).
- Query `?capture=1` (todo visible, sin animación).
- `prefers-reduced-motion: reduce`.
- Tab por teclado: foco visible, orden lógico.
- `node --check` sobre cada archivo JS modificado.

---

## 15. Referencias cruzadas

- [`CLAUDE.md`](../../CLAUDE.md) — instrucciones del proyecto.
- [`docs/motion-system.md`](../../docs/motion-system.md) — sistema de movimiento.
- [`docs/interaction-audit.md`](../../docs/interaction-audit.md) — auditoría de interacción.
- [`docs/audit-copy-2026.md`](../../docs/audit-copy-2026.md) — auditoría de copy.
- [`assets/fonts/type-specimens.md`](type-specimens.md) — referencia de ejes variables.

---

*Última actualización: 2026-04-28. Mantenido por Julio Morcillo + Claude.*
