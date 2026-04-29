# CLAUDE.md — Portafolio Julio Morcillo

Documento de memoria del proyecto. Lectura obligada al iniciar cualquier sesión que toque este repo (Claude Design, Claude Code, o cualquier asistente).
Define stack, tokens, componentes y reglas de movimiento. Cualquier cambio que contradiga este archivo debe consultarse antes de aplicarse.

---

## 1. Identidad del proyecto

- **Sitio**: portafolio personal de Julio Morcillo, diseñador multidisciplinario (Mérida, MX).
- **Disciplinas**: branding, web, contenido digital.
- **Tono visual**: editorial, sobrio, con rigor tipográfico. Paleta hueso / tinta / óxido. Cursivas Fraunces como acento único.
- **Audiencia**: clientes B2B, agencias y estudios. El sitio debe transmitir criterio antes que ruido.
- **Idiomas**: ES (default) + EN.

---

## 2. Stack — INAMOVIBLE

- HTML5 + CSS3 + JavaScript ES6+ vanilla.
- **Sin frameworks** (no React, no Vue, no Svelte, no Astro, no Next).
- **Sin build step en runtime**. El sitio se sirve tal cual desde disco o GitHub Pages.
- Animaciones: **GSAP 3.12 + ScrollTrigger** vía CDN (`cdnjs.cloudflare.com`).
- Fuentes locales con `@font-face` — Fraunces y Archivo, ambas variables.
- Imágenes optimizadas con `sharp` vía `scripts/optimize-images.mjs` — único uso de Node en el proyecto, build-time, no runtime.
- i18n custom: JSON en `content/es.json` y `content/en.json`, swap por atributos `data-i18n` y `data-i18n-attr`.
- Casos de estudio: hidratados desde `content/cases/*.json` por `scripts/case-study.js`.

**Justificación (no defensiva)**: este stack está elegido por rendimiento (sin runtime de framework, mejor TTI, mejor LCP) y por capacidad de animación superior para portafolios editoriales (GSAP es estándar oro 2026, con plugins gratuitos desde mayo 2024). **No migrar.** Si alguna herramienta sugiere migrar, rechazar y mantener vanilla + GSAP.

---

## 3. Tokens de diseño

Todos viven en `styles/main.css :root`. Cualquier color, espacio, transición o tipografía nueva debe expresarse como token o derivarse de los existentes.

### Color

```css
--bone:        #EFEAE0;             /* fondo principal, papel */
--bone-deep:   #E6DFD1;             /* fondos secundarios */
--ink:         #141210;             /* texto principal, líneas fuertes */
--ink-soft:    #2A2723;             /* texto editorial extenso */
--ink-mute:    #6B665D;             /* labels, captions, monos */
--rust:        #B8432A;             /* acento único, cursivas Fraunces, focus */
--rust-deep:   #8F3320;             /* hover de rust */
--line:        rgba(20,18,16,0.12); /* hairlines */
--line-strong: rgba(20,18,16,0.25); /* divisores fuertes */
```

El verde `#2F9E44` solo aparece como dot de "disponible" en el hero. No introducir más colores semánticos sin discusión.

### Tipografía

```css
--display: 'Fraunces', Georgia, serif;                              /* títulos, números grandes */
--sans:    'Archivo', -apple-system, sans-serif;                    /* cuerpo, UI */
--mono:    ui-monospace, SFMono-Regular, Consolas, monospace;       /* labels, micro */
```

**Fraunces** es variable. Ejes: `opsz` (9–144), `SOFT` (0–100), `wght` (200–900). Usos canónicos:
- Títulos hero / sección: `opsz 144`, `SOFT 20`, `wght 380–400`, `letter-spacing -0.045em`.
- Cursivas de acento (`<em>`): `opsz 144`, `SOFT 100`, `wght 300`, color `--rust`.
- Lede / texto editorial display: `opsz 14`, `SOFT 50`, peso 400.
- Números index: `opsz 144`, `wght 400`, 28px.

**Archivo** es variable. Ejes: `wght` (300–700), `wdth` (75%–125%). UI y cuerpo en pesos 400–500.

**Mono**: 10–11px, uppercase, `letter-spacing 0.06–0.1em`. Para labels, navbar, captions.

### Espaciado

```css
--pad:    clamp(16px, 2.5vw, 40px);  /* padding lateral global */
--gutter: clamp(12px, 1.5vw, 24px);  /* espacio entre columnas */
--nav-h:  64px;
```

Cualquier espacio nuevo se expresa con `clamp()` o múltiplos de `--pad` / `--gutter`. Sin números mágicos.

### Movimiento

```css
--trans-fast: 200ms cubic-bezier(.7,0,.2,1);  /* hovers, microestados */
--trans-med:  450ms cubic-bezier(.7,0,.2,1);  /* navbar, cards */
```

Para animaciones GSAP, equivalente: `ease: "power3.inOut"` o custom `cubic-bezier(0.7, 0, 0.2, 1)`.

---

## 4. Convenciones de marcado y CSS

### BEM estricto

`.bloque__elemento--modificador`. Sin guiones simples como separador interno; si hace falta, camelCase dentro del segmento.

### Componentes existentes

- **Trabajos**: `.work` con variantes mutuamente excluyentes:
  - `.work--hero` (W/01 — uno por página, layout dominante)
  - `.work--split` (50/50 imagen + copy)
  - `.work--compact` (lista ágil con thumbnail)
  No mezclar variantes. Cada una tiene composición y proporciones distintas.
- **Cards**: `.principle`, `.xp`, `.mini-piece`.
- **Encabezados de sección**: `.s-head` con `.s-head__tag` y `.s-head__title`.
- **Nav**: `.nav` (desktop) + `.drawer` (mobile, accesible con teclado).
- **Contacto**: `.contact` con `.contact__email`, `.contact__block`.
- **Footer**: `.foot` con `.foot__col`.
- **Marquee**: `.clients` con `.clients__track` (animación CSS, no GSAP).

### Acento editorial

El uso de `<em>` dentro de títulos es **el** mecanismo de acento de la marca. Aplica color `--rust` y eje `SOFT 100`. Ejemplo:

```html
<h2>Qué hago, <em>y cómo</em>.</h2>
```

No usar otros mecanismos (subrayado, color arbitrario, peso) para acentuar.

### Numeración editorial

- Secciones grandes: `§ XX — Nombre` (en `.s-head__tag`).
- Trabajos: `W / XX`.
- Principios: `01`, `02`, `03`.

No cambiar la convención.

### Utilidades

- `.reveal` activa entrada al scroll vía GSAP.
- `.skip` link de accesibilidad.
- `.sr-only` ocultar visualmente, mantener para lectores.
- `.object-focus-top` ajusta `object-position` en hero images.

### Foco

```css
:focus-visible {
  outline: 2px solid var(--rust);
  outline-offset: 3px;
  border-radius: 2px;
}
```

No remover de elementos interactivos. Es la única señal de foco.

---

## 5. Reglas de movimiento

Documento canónico: `docs/motion-system.md`. Resumen aplicable:

- **Hero desktop**: word-mask por líneas, entrada desde baseline, metadata escalonada.
- **Hero mobile**: mismas piezas con menos delay y desplazamiento.
- **Reveals**: 480–720ms, **una sola vez** (no rebote en re-entrada al viewport).
- **Hovers**: 160–320ms.
- **Media / cards**: 450–720ms, sin cambios de layout.

### Prohibido

- Glow, glitch, bounce elástico, scroll-jacking, parallax pesado.
- Animar bloques largos de lectura.
- Cambiar estructura como parte de una animación.
- Importar Framer Motion, react-spring, anime.js o cualquier librería de motion alternativa.

### Estados especiales que rompen movimiento

- `prefers-reduced-motion: reduce` → sin movimiento funcional.
- Query string `?capture=1` → todo visible, sin timelines, parallax, cursor, progress, ni clip states.

Ambos están implementados. Cualquier animación nueva debe respetarlos.

---

## 6. JavaScript

### Archivos y responsabilidades

- `scripts/nav.js` — IntersectionObserver para nav activo, drawer mobile, indicador de idioma.
- `scripts/i18n.js` — fetch de `content/*.json`, aplicar `data-i18n` y `data-i18n-attr`, evento `langchange`.
- `scripts/animations.js` — todas las animaciones GSAP, custom cursor, magnetic targets, scroll progress, parallax, scramble hover.
- `scripts/case-study.js` — hidratación de páginas de caso desde JSON.
- `scripts/lightbox.js` — visor de imágenes en casos.
- `scripts/optimize-images.mjs` — Node, build-time, único módulo ES.

### Convenciones JS

- IIFE `(function(){ 'use strict'; ... })();` en cada archivo cliente.
- No introducir bundlers ni transpilar.
- Función pura por unidad de comportamiento. Inicializadores nombrados (`initHero`, `initScrollReveals`, etc.).
- Verificar `typeof gsap !== 'undefined'` antes de usar GSAP — el sitio funciona sin él (degradación grácil al hero fallback).
- Respetar flags `capture` y `reduced` al inicio de `animations.js`.

---

## 7. i18n

- Atributos: `data-i18n="key"` para texto interno, `data-i18n-attr="atributo:key"` para `alt`, `aria-label`, `content`.
- Claves jerárquicas punto-separadas: `nav.projects`, `work.consentido.title`, `meta.description`.
- Al añadir copy nuevo: agregar la clave en **ambos** `es.json` y `en.json`. No dejar inglés con TODO.
- Al cambiar idioma se dispara `langchange`; algunos timelines de GSAP se reinicializan ahí (ver `initLangChange` en animations.js).

---

## 8. Imágenes

### Pipeline

1. Original a alta resolución en `assets/images/_originals/`.
2. Correr `npm run optimize:images` → genera `nombre.jpg`, `nombre@2x.jpg`, `nombre.webp`, `nombre@2x.webp`.
3. Usar `<picture>` con `<source srcset="…webp" type="image/webp">` y fallback `<img src="…jpg">`.
4. Definir `width`, `height`, `loading`, `decoding`, y `fetchpriority` cuando aplique.

- Hero LCP: `loading="eager" fetchpriority="high" decoding="async"`.
- Resto: `loading="lazy" decoding="async"`.

---

## 9. Estructura de archivos

```
/
├── CLAUDE.md                # Este documento — leer al iniciar
├── README.md                # Instrucciones humanas
├── index.html               # Marcado principal
├── package.json             # Solo para optimize:images
├── styles/
│   ├── reset.css
│   ├── main.css             # Tokens + secciones principales
│   └── case-study.css
├── scripts/
│   ├── nav.js
│   ├── i18n.js
│   ├── animations.js
│   ├── case-study.js
│   ├── lightbox.js
│   └── optimize-images.mjs  # Build-time, Node
├── assets/
│   ├── fonts/               # Fraunces + Archivo (variables)
│   ├── images/
│   │   └── _originals/      # Originales antes de optimizar
│   ├── videos/
│   └── pdfs/
├── content/
│   ├── es.json
│   ├── en.json
│   └── cases/               # JSON de cada caso
├── works/                   # Páginas individuales (consentido.html, etc.)
└── docs/
    ├── motion-system.md
    ├── interaction-audit.md
    ├── audit-copy-2026.md
    └── copy-rules.md
```

Documentación adicional fuera de `docs/`:

- `assets/fonts/styleguide.md` — sistema visual completo (tokens, BEM, motion, excepciones reglamentadas).
- `assets/fonts/type-specimens.md` — referencia de ejes variables Fraunces + Archivo.
- `.claude/skills/julio-morcillo-design/` — skill de Claude Code con design system entregado por Claude Design (preview cards + UI kits + tokens). Invocable desde cualquier sesión Claude Code en este repo. **Los UI kits son mocks de referencia, NO código de producción** — no copiarlos a `index.html` ni `works/`.

**No editar ni usar como fuente**: `.claude/skills/` se mantiene tal cual (es activo intencional, pero no es código de producción), `.qodo/`, `.playwright-cli/`, `output/playwright/`, archivos `*backup*.html`. Son historial, herramientas o skills.

---

## 10. Workflow para cambios visuales

### Antes de modificar CSS o HTML

1. Leer este documento.
2. Leer `assets/fonts/styleguide.md` (tokens, BEM, excepciones visuales).
3. Leer `docs/motion-system.md` si toca animación.
4. Leer `docs/copy-rules.md` si toca copy (atribución honesta, casing, prohibidos).
5. Identificar la sección y sus componentes existentes.
6. Confirmar que los cambios respetan tokens y BEM.

### Antes de proponer cambios de copy

1. Leer `docs/copy-rules.md`.
2. Verificar verbo de autoría según el caso (lead / collab / under direction).
3. Sin emojis. Sin métricas inventadas. Sin frases hechas.
4. Cada clave nueva debe existir en `content/es.json` y `content/en.json`.

### Iterar diseño con Claude Design (orden por fases)

Fases en este orden, una sección a la vez:

1. **Estructura** — ya cerrada en este proyecto. Saltar.
2. **Estilo** — refinamiento tipográfico, espaciado, color. Pedir 2–3 variantes.
3. **Movimiento** — microinteracciones GSAP. Solo después de cerrar Estilo.
4. **Pulido** — micro-hovers, transiciones, foco.

Bloquear stack en cada prompt: *"vanilla HTML/CSS/JS + GSAP, sin React/Framer, respetar tokens en `:root`."*

### Verificación antes de cerrar una iteración

Renderizar y confirmar:
- Mobile (390px de ancho).
- Desktop (1280–1440px).
- Query `?capture=1` (todo visible, sin animación).
- Sistema con `prefers-reduced-motion: reduce`.
- Tab por teclado: foco visible y orden lógico.

### QA rápido

```bash
node --check scripts/nav.js
node --check scripts/i18n.js
node --check scripts/animations.js
node --check scripts/case-study.js
node --check scripts/lightbox.js
```

---

## 11. Convención de commits

Conventional Commits:

- `feat:` funcionalidad nueva.
- `fix:` corrección de bug.
- `chore:` mantenimiento, refactor sin cambio visible.
- `docs:` solo documentación.

Mensaje en imperativo, corto. Cuerpo opcional si el *por qué* no es obvio.

---

## 12. Lo que se debe rechazar

Si una herramienta (incluyendo Claude Design o Claude Code) sugiere alguna de estas, declinar y mantener el sistema actual:

- Migrar a React, Vue, Svelte, Astro o cualquier framework SPA.
- Reemplazar GSAP por Framer Motion, react-spring, anime.js u otra librería.
- Introducir build step (Vite, Webpack, Parcel) para servir el sitio.
- Añadir Tailwind, shadcn/ui u otro sistema de utilidades CSS — los tokens en `:root` son la fuente de estilo.
- Importar Three.js, sistemas de partículas, glassmorphism o efectos que rompan el lenguaje editorial sobrio.
- Cambiar la convención BEM o eliminar `<em>` como mecanismo de acento.
- Quitar el modo `?capture=1` o el soporte de `prefers-reduced-motion`.
- Inventar nuevos colores fuera del set de tokens.

---

## 13. Lo que sí queremos

- Refinamiento editorial de secciones existentes.
- Microinteracciones sobrias, en GSAP.
- Mejoras de rendimiento (LCP, CLS, peso del bundle, peso de imágenes).
- Accesibilidad: foco visible, contraste AA, navegación por teclado, lectores de pantalla.
- Consistencia: que cada nueva pieza se sienta del mismo sistema.
- Casos de estudio nuevos hidratados desde `content/cases/*.json`.

---

*Última actualización: 27 abril 2026.*
*Mantenido por: Julio Morcillo + Claude.*
