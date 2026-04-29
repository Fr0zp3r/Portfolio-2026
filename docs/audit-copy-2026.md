# Auditoría y refinamiento de copy — Portfolio Julio Morcillo 2026

**Versión:** 1.0
**Fecha:** 27 abril 2026
**Alcance:** `index.html`, `content/es.json`, `content/en.json`, `works/consentido.html` (plantilla), 11 case JSONs, bloque SEO/structured data.
**Fuentes:** `CLAUDE.md`, `brief-maestro-julio-morcillo(1).md` (v1.0, 24 abr 2026), código actual del repo.
**Lentes aplicados:** copywriter senior bilingüe ES/EN + diseñador editorial (largos, jerarquía, densidad).

> Convención de este documento: las propuestas aparecen como `clave → propuesta`. Cuando el copy actual ya funciona y no hay razón editorial para tocarlo, lo digo en una línea y paso. Cuando hay dos opciones legítimas, las dejo ambas con recomendación marcada en **negrita**.

---

## Resumen ejecutivo — 7 hallazgos sistémicos

1. **Los 11 case JSONs son monolingües (solo ES). Es la grieta más grave del sistema.**
   El sitio promete `Bilingual ES/EN` y el home tiene swap completo, pero `content/cases/*.json` no tiene estructura para EN. Recomiendo migrar a `{ "es": {...}, "en": {...} }` por archivo, o duplicar a `consentido.es.json` / `consentido.en.json`. Sin esto, las páginas de caso quedan inconsistentes con la promesa del header.

2. **Inconsistencia de fechas de inicio profesional.**
   `hero.since` = "2017", `xp.frzt` HTML = "2017 — 2025", brief dice FRZT 2019–2025 y PEMOL como primer empleo profesional verano 2018. Hay tres fechas distintas circulando. Resolver con **2018** como ancla pública (primer trabajo profesional real) y mantener FRZT como práctica freelance 2019–2025. Esto realinea hero, xp.frzt, y los stats "7+ años" (que en 2026 dan 8 si arrancamos en 2018, dentro del rango "7+").

3. **Atribución de AMXiTech: usar "submarca", no "marca".**
   El brief es estricto: AMXiTech es **submarca** de Amerimex, no su brand principal. Los `work.amxitech.desc` en `es.json` y `en.json` dicen "marca tecnológica" / "technology brand". El case JSON ya dice "submarca de Amerimex" (correcto). Hay que alinear el home con el case.

4. **`work.ctaSoon = "Case en proceso"` debe desaparecer.**
   Si los 11 casos tendrán página propia (confirmado), el fallback "Case en proceso" pierde sentido. Reemplazar por `work.cta` ("Ver proyecto" / "View project") en AMXiTech y en cualquier otra tarjeta que lo use. Mantener la clave `work.ctaSoon` solo si quedará algún caso temporalmente sin página, y documentar cuándo aplica.

5. **La plantilla `consentido.html` tiene copy editorial hardcoded** (chapter heads, interlude, outro labels, factCards) que se replicará a 10 casos más. Sin extraer estos strings, cada caso heredará textos pensados para Consentido — el "rediseñar" del interlude solo aplica a Consentido, los stats "16 / 12 / 2 sedes" son específicos. **Acción:** mover a JSON por caso (recomendación: campo `narrative` con `chapterTitles`, `interludeText`, `productionStats`, `proofText`).

6. **Patrón de voz mixta entre home y casos.**
   El home usa narrador en primera persona ("Diseño marcas…", "Me interesa entender…"). Los case JSONs alternan tercera persona neutra ("Trabajo de aplicación…", "Producción visual…", "El rol fue…") y construcciones impersonales ("El reto fue…"). Esto rompe la sensación de "una sola persona hablando". Recomiendo mantener primera persona también en `manifesto` y `note` de cada case ("Mi rol fue…", "Construí…", "Colaboré en…") — coincide con el brief que ya da copy base en primera persona.

7. **Microcopy diseñado-para-Consentido contamina los demás casos.**
   `caseInterlude__text` ("El reto no era rediseñar la marca — era hacer que cada aplicación mantuviera el mismo criterio") es perfecto para Consentido pero falso para Alfa (que sí fue diseño completo) y para Pollos (autoría completa). Cada caso necesita su propio interlude — los propongo más abajo, uno por proyecto.

**Hallazgos secundarios sin urgencia sistémica:**
- `index.languages` mezcla "Bilingual" (EN) dentro de un bloque ES. Brief lo aprueba como etiqueta unificada — mantener, pero documentar como decisión consciente.
- Footer `tools` lista "HTML/CSS/JS" en HTML pero JSON dice "HTML/CSS básico". El JSON es correcto al brief. Sincronizar.
- `xp.intuitiva.company` en JSON dice "México"; HTML dice "Mérida, MX". Brief dice "Ubicación: México". Recomendación: "Mérida, MX" (más específico y consistente con el resto).

---

## Inventario y método

| Bloque | Claves | Estado ES | Estado EN | Acción |
|---|---:|---|---|---|
| Meta tags (head) | 7 | ✓ | ✓ | Refinar + agregar Twitter, hreflang, JSON-LD |
| Nav + Drawer + Skip | 11 | ✓ | ✓ | Pulir 2 strings |
| Hero | 6 | ✓ | ✓ | Ajustar fecha "since" |
| Index / Stats | 5 | ✓ | ✓ | Tighten "Trayectoria"/"Modalidad" |
| Clients marquee | 1 | ✓ | ✓ | Auditar nombres (10) |
| Perfil §01 | 4 | ✓ | ✓ | Ajustes finos |
| Works §02 (cards) | 32 | ✓ | ✓ | AMXiTech submarca + alts |
| Gallery §03 | 7 | ✓ | ✓ | OK |
| Archive | 2 | ✓ | ✓ | OK |
| Approach §04 | 8 | ✓ | ✓ | OK |
| Quote | 2 | ✓ | ✓ | OK |
| Experience §05 | 9 | ✓ | ✓ | Fechas + sync HTML/JSON |
| Contact §06 | 5 | ✓ | ✓ | Pulir título |
| Footer | 11 | ✓ | ✓ | Sync HTML/JSON tools |
| `consentido.html` hardcoded | ~25 | ✓ | ✗ | Extraer + traducir |
| Case JSONs (11) | 11 archivos | ✓ | ✗ | Crear estructura EN |
| **Total estimado** | **~140 piezas** | | | |

Caracteres: para títulos display (Fraunces opsz 144) considero el rango operativo 6–22 caracteres. ES tiende a romper a partir de 20 caracteres en mobile (390px) por la longitud del idioma. Los strings que cruzan ese umbral los marco con `[L]` (largo).

---

# 1. Meta tags y root SEO (`<head>`)

> Aplica a `index.html` y a las 11 páginas de caso. El home tiene 7 keys i18n; las páginas de caso tienen meta hardcoded en HTML.

## 1.1 `meta.title`

**ES actual** (88c): `Julio Morcillo — Diseñador multidisciplinario · Branding, Web y Contenido Digital`
**EN actual** (90c): `Julio Morcillo — Multidisciplinary Designer · Branding, Web and Digital Content`

**Diagnóstico:** funcionales, pero "Diseñador multidisciplinario" es la promesa repetida en H1 implícito + lede + bio. El title puede ganar especificidad con la propuesta de valor + ubicación, que son los dos modificadores más buscables.

**Propuesta ES** (84c): `Julio Morcillo · Diseñador multidisciplinario en Mérida — Branding, Web y Contenido`
**Propuesta EN** (87c): `Julio Morcillo · Multidisciplinary Designer in Mérida — Branding, Web & Digital Content`

**Razón:** sustituir guión largo por punto medio + "en Mérida / in Mérida" mete locación al título (SEO local + diferenciación). Acortar "Contenido Digital" a "Contenido" ahorra peso y los meta de descripción ya repiten "digital".

## 1.2 `meta.description`

**ES actual** (175c): `Julio Morcillo — diseñador multidisciplinario en Mérida, México. Branding, diseño web y contenido digital conectados dentro de sistemas visuales coherentes.`
**EN actual** (170c): `Julio Morcillo — multidisciplinary designer based in Mérida, Mexico. Branding, web design and digital content connected into coherent visual systems.`

**Diagnóstico:** correcta pero plana. "conectados dentro de sistemas visuales coherentes" es la frase estructural de Julio — buena. Falta enganche concreto: el qué resuelve, no qué hace.

**Propuesta ES** (178c): `Julio Morcillo, diseñador multidisciplinario en Mérida. Diseño marcas y experiencias digitales que funcionan como sistemas: identidad, web y contenido conectados por una misma lógica visual.`
**Propuesta EN** (180c): `Julio Morcillo, multidisciplinary designer in Mérida. I design brands and digital experiences that work as systems: identity, web and content connected by the same visual logic.`

**Razón:** la description debe ser literalmente la propuesta de valor del brief (sección 17.1), no una variante diluida. Esta versión usa primera persona, hereda la frase canónica del lede, y mantiene "como sistemas" como ancla SEO + diferenciador.

## 1.3 `meta.keywords`

**ES actual:** `diseño, branding, identidad visual, diseño web, contenido digital, Mérida, México, portfolio`
**EN actual:** `design, branding, visual identity, web design, digital content, Mérida, Mexico, portfolio`

**Diagnóstico:** Google ignora keywords desde 2009; Bing lo penaliza si está sobre-optimizado. **Recomendación:** dejarlo (no daña), pero priorizar otros canales SEO. Si lo conservas, agregar variantes:

**Propuesta ES:** `diseño multidisciplinario, branding, identidad visual, diseño web, contenido digital, Mérida, Yucatán, México, portfolio, diseñador freelance`
**Propuesta EN:** `multidisciplinary design, branding, visual identity, web design, digital content, Mérida, Yucatán, Mexico, portfolio, freelance designer Mexico`

## 1.4 `meta.ogTitle` / `meta.ogDescription`

**Actuales:**
- `ogTitle` ES: `Julio Morcillo — Diseñador multidisciplinario` (43c) ✓
- `ogTitle` EN: `Julio Morcillo — Multidisciplinary Designer` (44c) ✓
- `ogDescription` ES: `Branding, web y contenido digital para marcas que necesitan funcionar con una misma lógica visual.` (102c) ✓
- `ogDescription` EN: `Branding, web and digital content for brands that need to work with one clear visual logic.` (94c)

**Diagnóstico:** los ogTitle están bien. La ogDescription EN tiene una construcción un poco torpe — "need to work with one clear visual logic" suena ligeramente non-native.

**Propuesta EN:** `Branding, web, and digital content for brands that need to work as one clear system.` (84c)

**Razón:** "as one clear system" es más natural y refuerza la palabra clave "system" del brief. Evita "with one clear visual logic" que es una traducción literal del ES.

## 1.5 Bloque SEO faltante (no existe en el repo) — `+ all the bells and whistles`

Los siguientes meta tags **no existen** en `index.html` y deben agregarse. Te dejo el bloque completo listo para pegar:

```html
<!-- En <head> de index.html, después de los meta existentes -->

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Julio Morcillo — Diseñador multidisciplinario" data-i18n-attr="content:meta.ogTitle">
<meta name="twitter:description" content="Branding, web y contenido digital para marcas que necesitan funcionar como un sistema." data-i18n-attr="content:meta.ogDescription">
<meta name="twitter:image" content="https://juliomorcillo.com/assets/images/og-cover-1200x630.jpg">
<meta name="twitter:image:alt" content="Portafolio de Julio Morcillo — diseñador multidisciplinario en Mérida" data-i18n-attr="content:meta.ogImageAlt">

<!-- Open Graph extras -->
<meta property="og:url" content="https://juliomorcillo.com/">
<meta property="og:site_name" content="Julio Morcillo Portfolio">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Portafolio de Julio Morcillo — diseñador multidisciplinario en Mérida" data-i18n-attr="content:meta.ogImageAlt">

<!-- Hreflang alternates -->
<link rel="alternate" hreflang="es-MX" href="https://juliomorcillo.com/">
<link rel="alternate" hreflang="en"    href="https://juliomorcillo.com/?lang=en">
<link rel="alternate" hreflang="x-default" href="https://juliomorcillo.com/">

<!-- Robots -->
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

<!-- Theme color (dual mode con bone) -->
<meta name="theme-color" content="#EFEAE0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141210" media="(prefers-color-scheme: dark)">

<!-- Author + geo -->
<meta name="geo.region" content="MX-YUC">
<meta name="geo.placename" content="Mérida">
```

**Nuevas claves i18n a agregar a `es.json` / `en.json`:**

```jsonc
// es.json
"meta.ogImageAlt": "Portafolio de Julio Morcillo — diseñador multidisciplinario en Mérida"

// en.json
"meta.ogImageAlt": "Julio Morcillo portfolio — multidisciplinary designer based in Mérida"
```

## 1.6 Structured data (JSON-LD `Person`) — **falta y es alto impacto SEO**

Pegar este script en `<head>` de `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Julio Morcillo",
  "alternateName": "FRZT",
  "url": "https://juliomorcillo.com/",
  "image": "https://juliomorcillo.com/assets/images/og-cover-1200x630.jpg",
  "jobTitle": "Multidisciplinary Designer",
  "description": "Multidisciplinary designer based in Mérida, Mexico. Branding, web design and digital content connected into coherent visual systems.",
  "knowsLanguage": ["es", "en"],
  "knowsAbout": ["Brand identity", "Web design", "UI/UX", "Editorial design", "Digital content"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mérida",
    "addressRegion": "Yucatán",
    "addressCountry": "MX"
  },
  "email": "mailto:julioerty@gmail.com",
  "telephone": "+52-983-307-7150",
  "sameAs": [
    "https://behance.net/juliomorcillo",
    "https://linkedin.com/in/juliomorcillo"
  ],
  "worksFor": [
    {
      "@type": "Organization",
      "name": "Intuitiva",
      "url": "https://intuitiva.mx"
    }
  ]
}
</script>
```

**Razón:** habilita rich results de Google ("People also search for", knowledge panel para nombre propio), refuerza E-E-A-T para queries `julio morcillo diseñador`, y conecta los perfiles externos como entidad única.

Para cada page de caso, agregar también un `CreativeWork` JSON-LD (lo dejo en sección 6 con el bloque completo por caso).

---

# 2. Nav, Drawer, Skip

## 2.1 Skip link

`skip.content` ES: `Ir al contenido` (15c) — **OK.** Estándar accesibilidad.
EN: `Skip to content` (15c) — **OK.**

## 2.2 Nav menu

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `nav.projects` | Proyectos | Projects | OK |
| `nav.approach` | Enfoque | Approach | OK |
| `nav.experience` | Experiencia | Experience | OK |
| `nav.contact` | Contacto | Contact | OK |
| `nav.lang` | Idioma | Language | OK (aria-label, no visible) |
| `nav.cta` | Disponible 2026 | Available 2026 | OK — alineado al brief §8 |

**Cero cambios.** Los 4 links + CTA cumplen el patrón del brief y respetan la jerarquía editorial.

## 2.3 Drawer móvil

| Clave | ES | EN | Notas |
|---|---|---|---|
| `drawer.label` | Menú móvil | Mobile menu | OK |
| `drawer.nav` | Navegación principal | Main navigation | OK |
| `drawer.location` | Mérida, Yucatán · Remoto | Mérida, Yucatán · Remote | OK |
| `nav.burger.open` | Abrir menú | Open menu | OK |
| `nav.burger.close` | Cerrar menú | Close menu | OK |

**Cero cambios.**

---

# 3. Hero

## 3.1 Hero top — `hero.portfolio`, `hero.base`

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `hero.portfolio` | `Portfolio / <span>2026</span>` | mismo | OK |
| `hero.base` | `Base / <span>Mérida, Yuc. · remoto</span>` | `Base / <span>Mérida, Yuc. · remote</span>` | OK |

## 3.2 Hero lede — `hero.lede`

**ES actual** (172c): `Diseño <strong>marcas y experiencias digitales</strong> que funcionan como sistemas: identidad, web y contenido conectados por una misma lógica visual.`
**EN actual** (170c): `I design <strong>brands and digital experiences</strong> that work as systems: identity, web, and content connected by the same visual logic.`

**Veredicto:** **mantener tal cual.** Es la frase canónica del brief (§17.1). La construcción "que funcionan como sistemas: identidad, web y contenido" es la que diferencia a Julio del genérico "diseñador gráfico". No tocar.

## 3.3 Hero meta — `hero.disciplines`, `hero.since`

**`hero.disciplines`:**
- ES: `Disciplinas` / `Branding · Web · Contenido`
- EN: `Disciplines` / `Branding · Web · Digital Content`

**Diagnóstico:** desbalance entre ES (`Contenido`) y EN (`Digital Content`). En jerarquía Archivo mono pequeña, ambos deben pesar parecido.

**Propuesta:**
- ES: `Branding · Web · Contenido digital` (alinea con EN y con el lede)
- EN: `Branding · Web · Digital content` (mantener)

Razón: que la misma trinidad lea idéntica en ambos idiomas. El lowercase de "digital content" / "contenido digital" en bloques meta es común en el lenguaje editorial sobrio del sitio.

**`hero.since` ES/EN:** `Desde / 2017 · Mérida, MX` — **PROBLEMA DE FECHA.**

**Propuesta:** `Desde / 2018 · Mérida, MX` (ES) y `Since / 2018 · Mérida, MX` (EN).

**Razón:** el brief documenta PEMOL Sports verano 2018 como primer empleo profesional, y FRZT 2019–2025. El "2017" actual no tiene anclaje en el brief y crea inconsistencia. **2018** es la fecha defendible más temprana. Los stats "7+ años" siguen siendo válidos en 2026 (8 años).

## 3.4 Hero scroll cue

`hero.scroll`: `↓ Scroll` — **OK** (universal, no cambia).

---

# 4. Index / Stats

## 4.1 Las 5 cells

| Clave | ES actual | EN actual | Propuesta ES | Propuesta EN |
|---|---|---|---|---|
| `index.years` | Trayectoria · 7+ años | Experience · 7+ years | **OK** | **OK** |
| `index.projects` | Proyectos seleccionados · 15+ | Selected projects · 15+ | **OK** | **OK** |
| `index.sectors` | Sectores · B2B · Salud · Agro · F&B | Sectors · B2B · Health · Agro · F&B | **OK** | **OK** |
| `index.languages` | Idioma · Bilingual ES/EN | Language · Bilingual ES/EN | **OK** | **OK** |
| `index.mode` | Modalidad · Remoto · Mérida | Mode · Remote · Mérida | **OK** | **OK** |

**Decisión consciente confirmada:** usar `Bilingual ES/EN` (en inglés) dentro del bloque ES — el brief §2 lo aprueba como etiqueta unificada. Mantener.

**Cero cambios estructurales.** Los stats están alineados al brief §18.

---

# 5. Clients marquee

**Diagnóstico:** la lista actual mezcla nombres reales con variantes inventadas. Inventario:

| Como aparece | Como debería aparecer (correcto) |
|---|---|
| ConSentido | ConSentido ✓ |
| AMXiTech | AMXiTech ✓ |
| Visummit | **VI Summit** (matches brief y JSON) |
| Alfa Comunicaciones | Alfa Comunicaciones ✓ |
| Corber MX | **Corber** (el "MX" no aparece en case ni brief) |
| Chint Sonora | **Chint** (el "Sonora" no está documentado en brief) |
| NeuromuscularMID | **Neuromuscular MID** (con espacio, como en JSON) |
| Los Pollos Giros | Los Pollos Giros ✓ |
| GBC Constructora | **GBC** (brief solo dice "GBC", construcción es la industria) |
| Diamond Soft | Diamond Soft ✓ |

**Acción:** corregir los 5 nombres marcados. La marquee no se traduce (nombres propios), pero la consistencia con los cases es crítica — un visitor que ve "Corber MX" en el marquee y luego abre el case que dice "Corber" registra el desfase.

---

# 6. Perfil §01

## 6.1 Section head

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `perfil.tag` | § 01 — Perfil | § 01 — Profile | OK |
| `perfil.title` | Qué hago, *y cómo*. | What I do, *and how*. | **OK — perfecto, mantener** |

El uso de `<em>y cómo</em>` / `<em>and how</em>` con SOFT 100 + rust es el mecanismo canónico de acento. Conservar.

## 6.2 Perfil párrafos

**`perfil.p1` ES** (~270c): `Conecto <strong>identidad visual</strong>, <strong>sitios web</strong> y <strong>contenido digital</strong> para que una marca se vea y funcione como un sistema. Me interesa entender qué necesita resolver un proyecto <em>antes</em> de decidir cómo debe verse.`
**`perfil.p1` EN** (~280c): `I connect <strong>visual identity</strong>, <strong>websites</strong>, and <strong>digital content</strong> so a brand can look and work as a system. I care about understanding what a project needs to solve <em>before</em> deciding how it should look.`

**Diagnóstico:** el ES dice "Conecto … para que una marca se vea y funcione como un sistema." El EN dice "so a brand can look and work as a system." El verbo "I care about" en EN es un poco débil para abrir oración — el brief frase canónica dice "I care about understanding…" así que se respeta. Aceptable.

**Pequeño ajuste EN:** la coma de Oxford en "websites, and digital content" rompe el ritmo de tercia. Recomiendo:

**Propuesta EN:** `I connect <strong>visual identity</strong>, <strong>websites</strong> and <strong>digital content</strong> so a brand can look and work as a system. I want to understand what a project needs to solve <em>before</em> deciding how it should look.`

**Razón:**
- Quitar Oxford comma: en variante neutra/internacional (UK leaning), se omite. Más limpia visualmente con tres elementos en negrita.
- "I want to understand" > "I care about understanding": más activo, menos abstracto. "I care about" sonaba a frase de portafolio genérico.

**`perfil.p2` ES/EN** — **mantener tal cual.** Honesto, alineado al brief §14, distingue autoría principal vs colaborador con elegancia.

## 6.3 Aside label

`perfil.manifesto.label` ES: `Perfil` · EN: `Profile` — **OK.**

---

# 7. Works §02 — sección + 6 tarjetas

## 7.1 Section head

| Clave | ES | EN | Notas |
|---|---|---|---|
| `works.tag` | § 02 — Proyectos seleccionados · 2024 – 2025 | § 02 — Selected projects · 2024 – 2025 | OK |
| `works.title` | Obra *seleccionada*. | Selected *work*. | OK |

**Mantener.**

## 7.2 W/01 — ConSentido

**Tarjeta home:**

| Clave | Actual ES | Actual EN | Propuesta |
|---|---|---|---|
| `work.consentido.title` | `Con<em>Sentido</em>` | mismo | OK |
| `work.consentido.tags` | `Brand rollout · 2025` / `Brandbook · Print · Digital` | mismo | OK |
| `work.consentido.desc` | "Colaboré en el despliegue de una marca vinícola hacia aplicaciones reales: brandbook, submarcas, papelería, materiales de activación y piezas digitales. El reto fue sostener coherencia visual sin borrar el acento de cada sede." (267c) | "I collaborated on rolling out a winery brand into real applications: brandbook, sub-brands, stationery, activation materials, and digital assets. The challenge was keeping visual coherence without flattening each location's accent." (271c) | Ver abajo |

**Diagnóstico ES:** "el acento de cada sede" funciona poéticamente pero es ambiguo (¿acento como inflexión o como modificador gráfico?). La versión del brief dice "presencia en más de una sede" + "sin borrar las diferencias entre cada sede". Gana claridad con un cambio mínimo.

**Propuesta ES:** `Colaboré en el despliegue de una marca vinícola hacia aplicaciones reales: brandbook, submarcas, papelería, materiales de activación y piezas digitales. El reto fue sostener coherencia visual sin borrar las diferencias entre cada sede.` (273c)

**Propuesta EN:** `I collaborated on rolling a winery brand out into real applications: brandbook, sub-brands, stationery, activation materials, and digital assets. The challenge was holding visual coherence without flattening the differences between locations.` (266c)

**Razón:** "rolling … out" es más estándar en EN que "rolling out". "holding visual coherence" mejora ritmo sobre "keeping". "without flattening the differences between locations" es más concreto y verificable que "each location's accent" (que en EN puede leerse como acento idiomático).

**Meta ES:**

| Clave | Actual | Propuesta |
|---|---|---|
| `work.consentido.meta.client.label` | `Cliente` | OK |
| `work.consentido.meta.type.value` | `Brand Rollout · Arte final` | OK |
| `work.consentido.meta.scope.value` | `Colaboración · Intuitiva` | OK |
| `work.consentido.meta.deliverables.value` | `Brandbook · Submarcas · Digital` (JSON) / `Brandbook · Aplicaciones · Arte final` (HTML hardcoded) | **Sincronizar** — recomiendo mantener JSON y borrar el hardcoded del HTML |

**EN equivalentes:** `Brand Rollout · Final Art`, `Collaboration · Intuitiva`, `Brandbook · Sub-brands · Digital` — **OK.**

**Alt text:**

`work.consentido.alt` ES: `Mockup de aplicaciones de marca ConSentido` (38c) / EN: `ConSentido brand application mockup` (35c)

**Diagnóstico:** correcto pero genérico. Para SEO de imágenes y accesibilidad, especificar:

**Propuesta ES:** `Mockup de brandbook y aplicaciones de marca para ConSentido — sistema vinícola entre Uruguay y México`
**Propuesta EN:** `Brandbook and brand applications mockup for ConSentido — a winery system across Uruguay and Mexico`

**Razón:** el alt actual sirve a un lector de pantalla pero pierde el contexto editorial. Esta versión sirve a SEO de imágenes (Google Images) y a screen reader sin volverse keyword-stuffed.

## 7.3 W/02 — AMXiTech

**Cambio crítico (brief §10.2):** corregir "marca" → "submarca".

| Clave | Actual ES | Propuesta ES |
|---|---|---|
| `work.amxitech.desc` | "Diseño web para AMXiTech, **marca tecnológica** de Amerimex. Mi trabajo fue llevar la nueva dirección visual a una experiencia digital clara, comercial y responsive para explicar servicios TI complejos y facilitar el contacto B2B." (284c) | "Diseño web para AMXiTech, **submarca tecnológica** de Amerimex. Llevé la nueva dirección visual a una experiencia digital clara, comercial y responsive — pensada para explicar servicios TI complejos y facilitar el contacto B2B." (266c) |

| Clave | Actual EN | Propuesta EN |
|---|---|---|
| `work.amxitech.desc` | "Web design for AMXiTech, **a technology brand** under Amerimex. My work focused on bringing the new visual direction into a clear, responsive, commercially oriented experience that explains complex IT services and supports B2B contact." (288c) | "Web design for AMXiTech, **a technology sub-brand** of Amerimex. I translated the new visual direction into a clear, responsive, commercially oriented experience — built to explain complex IT services and support B2B lead generation." (264c) |

**Razones:**
- "submarca" es atribución honesta (brief §10.2 lo marca como crítico).
- ES: cambiar "Mi trabajo fue llevar" por "Llevé" — primera persona activa, ahorra 4 caracteres y le da peso al verbo.
- EN: "translated the new visual direction" > "bringing the new visual direction into" — más activo, menos torpe.
- EN: "support B2B lead generation" es la frase del brief y es más específica que "support B2B contact".

**Meta:**
- `work.amxitech.meta.role.value` = `Lead UI/UX · Web Designer` — OK
- HTML hardcoded `Amerimex → AMXiTech` (cliente) — **OK**, mantiene la jerarquía marca madre → submarca de un golpe visual.
- `work.amxitech.meta.platform.label` / value (`Plataforma` / `WordPress · Elementor`) — OK
- `work.amxitech.meta.site.label` / value (`Sitio` / `amxitech.com`) — OK

**Alt:**
- ES actual: `Captura de pantalla del sitio web AMXiTech`
- EN actual: `AMXiTech website screenshot`
- **Propuesta ES:** `Sitio web AMXiTech — landing B2B para servicios tecnológicos de Amerimex`
- **Propuesta EN:** `AMXiTech website — B2B landing page for Amerimex IT services`

**CTA:** actualmente `work.ctaSoon = "Case en proceso"`. Cambiar a `work.cta = "Ver proyecto"` cuando la página esté lista (será — confirmado).

## 7.4 W/03 — VI Summit

**Tarjeta home:**

| Clave | Actual | Notas |
|---|---|---|
| `work.visummit.title` | `VI <em>Summit</em>` (json) / `Vi<em>Summit</em>` (HTML hardcoded) | **DESFASE** |
| `work.visummit.meta.summary` | `Production design · 2025 · Congreso agrícola` (ES) / `Production design · 2025 · Agricultural congress` (EN) — JSON dice esto, HTML dice "Evento internacional · 2025 · Foro del Espárrago" | **DESFASE** |
| `work.visummit.desc` ES | `Colaboré en la producción y adaptación de la identidad del evento a señalética, merchandising, piezas digitales y materiales editoriales, cuidando coherencia visual y claridad técnica en múltiples formatos.` (235c) | OK pero pesado |

**Propuestas:**

- **Title:** unificar a `VI <em>Summit</em>` (con espacio) en JSON y HTML. La versión `Vi<em>Summit</em>` del HTML actual produce "ViSummit" como string visual, que no es el nombre del congreso (es "VI Summit", número romano + Summit). Corregir HTML hardcoded.

- **`work.visummit.meta.summary` ES:** unificar a `Production design · 2025 · Congreso agrícola internacional` (alinea con el JSON case que dice "VI Summit Internacional del Espárrago"). Borrar la versión HTML "Evento internacional · 2025 · Foro del Espárrago".

- **`work.visummit.desc` ES propuesta:** `Colaboré en la producción y adaptación de la identidad del evento: señalética, merchandising, piezas digitales y materiales editoriales — manteniendo coherencia visual y claridad técnica entre formatos.` (224c, –11c)

- **`work.visummit.desc` EN propuesta:** `I collaborated on producing and adapting the event identity across signage, merchandising, digital assets and editorial materials — keeping visual consistency and technical clarity across formats.` (212c)

**Razón:** dos puntos + guión largo dan ritmo editorial. "Manteniendo" / "keeping" es más activo que "cuidando" / "keeping (con gerundio paralelo)". Versión EN ya estaba bien — solo unifico puntuación.

**Alt:**
- ES actual: `Mockup de gafete con lanyard VI Summit`
- EN actual: `VI Summit lanyard badge mockup`
- **Propuesta ES:** `Gafete y lanyard del VI Summit Internacional del Espárrago — sistema gráfico del congreso`
- **Propuesta EN:** `VI Summit Internacional del Espárrago lanyard badge — event graphic system`

## 7.5 W/04 — Los Pollos Giros

**Tarjeta home:**

| Clave | Actual | Notas |
|---|---|---|
| `work.pollos.title` | `Los Pollos <em>Giros</em>` | OK |
| `work.pollos.meta.summary` | JSON: `Identidad visual · 2024 · Proyecto propio FRZT` / HTML: `Identidad visual · 2024 · FRZT Studio` | **DESFASE** — sincronizar a `Identidad visual · 2024 · Proyecto propio · FRZT Studio` |
| `work.pollos.desc` ES | "Identidad visual para un concepto de comida rápida con personalidad propia. El sistema parte de un personaje simple y memorable, pensado para vivir en empaques, camisetas, bolsas y señalización." (220c) | OK; HTML hardcoded difiere — sincronizar |
| `work.pollos.desc` EN | "Visual identity for a fast-food concept with a distinct personality. The system is built around a simple, memorable character designed to work across packaging, shirts, bags, and signage." (213c) | OK |

**Acción:** la versión JSON está limpia. Eliminar la copy hardcoded del HTML (línea 281–283: `Identidad con personaje propio para concepto de fast food. Simple, memorable, reproducible. Aplicaciones en empaque, camisetas, bolsas y señalización.`) y dejar solo `data-i18n="work.pollos.desc"` poblando el `<p>`.

**Alt:**
- ES actual: `Mockup de camiseta Los Pollos Giros`
- EN actual: `Los Pollos Giros T-shirt mockup`
- **Propuesta ES:** `Camiseta con personaje de Los Pollos Giros — identidad visual para comida rápida`
- **Propuesta EN:** `T-shirt with Los Pollos Giros character — fast-food brand identity`

## 7.6 W/05 — Neuromuscular MID

**Tarjeta home:**

| Clave | Actual | Notas |
|---|---|---|
| `work.neuromuscular.title` | `Neuromuscular <em>MID</em>` | OK |
| `work.neuromuscular.meta.summary` | JSON: `UI/UX · Web design · Healthcare · 2025` / HTML: `UI/UX · Web · Salud` | **DESFASE** |
| `work.neuromuscular.desc` ES | "Diseño web para una clínica de fisioterapia en Mérida. La experiencia prioriza reserva de citas, confianza clínica y navegación simple para pacientes." (167c) | OK pero plana |
| `work.neuromuscular.desc` EN | "Web design for a physiotherapy clinic in Mérida. The experience prioritizes appointment booking, clinical trust, and simple navigation for patients." (163c) | OK |

**Propuesta meta.summary unificada (ES):** `UI/UX · Web · Salud · 2025`
**Propuesta meta.summary unificada (EN):** `UI/UX · Web · Healthcare · 2025`
(Hacer matchear la versión HTML pero agregando 2025; quitar "Web design" largo del JSON.)

**Propuesta desc ES** (180c): `Sitio activo para una clínica de fisioterapia en Mérida. Diseñé una experiencia clara y cálida enfocada en reserva de citas, confianza clínica y navegación simple para pacientes.`

**Propuesta desc EN** (175c): `Live site for a physiotherapy clinic in Mérida. I designed a clear, warm experience focused on appointment booking, clinical trust and simple navigation for patients.`

**Razón:** "Sitio activo" / "Live site" es un pequeño hook que justifica clic ("este se puede ver en producción"). Cambia "Diseño web" pasivo por "Diseñé / I designed" en primera persona — coincide con el brief que recomienda primera persona en autoría completa. Quita "Healthcare" del descriptor (ya está en meta).summary). En EN quito Oxford comma para consistencia.

**Alt:**
- ES actual: `Captura de interfaz para Neuromuscular MID`
- EN actual: `Neuromuscular MID interface screenshot`
- **Propuesta ES:** `Interfaz del sitio Neuromuscular MID — clínica de fisioterapia en Mérida`
- **Propuesta EN:** `Neuromuscular MID website interface — physiotherapy clinic in Mérida`

## 7.7 W/06 — Alfa Comunicaciones

**Tarjeta home:**

| Clave | Actual | Notas |
|---|---|---|
| `work.alfa.title` | `Alfa <em>Comunicaciones</em>` | OK |
| `work.alfa.meta.summary` | JSON: `Identidad visual · 2024 · Telecomunicaciones` / HTML: `Identidad corporativa · 2024 · Telecomunicaciones` | **DESFASE** |
| `work.alfa.desc` ES | "Identidad visual para una empresa de telecomunicaciones que necesitaba diferenciarse sin caer en clichés del sector. Desarrollé símbolo, paleta, tipografía, reglas de uso y aplicaciones principales." (200c) | OK |

**Propuesta meta.summary unificada (ES):** `Identidad visual · 2024 · Telecomunicaciones`
**Propuesta meta.summary unificada (EN):** `Visual identity · 2024 · Telecommunications`
(Mantener "Identidad visual" del JSON, eliminar "Identidad corporativa" del HTML hardcoded.)

**Desc:** las versiones JSON están bien. El HTML hardcoded difiere — sincronizar al JSON.

**Versión brief vs JSON:** el brief sugiere agregar "para construir una presencia corporativa sólida" al final. Es opcional — el copy actual ya cierra con autoridad. **Recomendación: dejar como está.** El brief añade un cierre que en el contexto editorial sobrio del sitio sobra.

**Alt:**
- ES actual: `Mockup de tarjeta de presentación Alfa Comunicaciones`
- EN actual: `Alfa Comunicaciones business card mockup`
- **Propuesta ES:** `Tarjeta de presentación de Alfa Comunicaciones — identidad visual para telecomunicaciones`
- **Propuesta EN:** `Alfa Comunicaciones business card — visual identity for telecommunications`

## 7.8 CTAs de tarjetas

| Clave | Actual ES | Actual EN | Propuesta |
|---|---|---|---|
| `work.cta` | Ver proyecto | View project | **OK — mantener** |
| `work.ctaSoon` | Case en proceso | Case in progress | **Eliminar uso en HTML** (mantener clave por si acaso). Reemplazar todas las instancias por `work.cta` cuando los 11 cases tengan página. |

---

# 8. Galería compacta §03

| Clave | ES | EN | Notas |
|---|---|---|---|
| `gallery.tag` | § 03 — Galería compacta | § 03 — Compact gallery | OK |
| `gallery.title` | Más aplicaciones, *sin hacer catálogo*. | More applications, *without the catalog feel*. | Ver abajo |
| `gallery.intro` | "Piezas seleccionadas de proyectos colaborativos y freelance. Muestran variedad de sectores, formatos y ejecución visual sin convertir cada trabajo en un case study completo." | "Selected pieces from collaborative and freelance projects. They show range across sectors, formats, and visual execution without turning every project into a full case study." | OK |

**`gallery.title` EN propuesta:** `More applications, *without becoming a catalog*.` (45c)

**Razón:** "without the catalog feel" es comprensible pero algo torpe ("the … feel" no engancha). "without becoming a catalog" es más activo, paralelo al ES "sin hacer catálogo", y mantiene el efecto auto-referencial editorial.

**Items de galería:**

| Clave | ES JSON | HTML hardcoded | Acción |
|---|---|---|---|
| `gallery.gbc` | GBC · Rebrand corporativo · Brand rollout | GBC Constructora · aplicaciones de identidad | **DESFASE** — adoptar JSON |
| `gallery.corber` | Corber · Contenido digital · Agroexportación | Corber MX · contenido digital | **DESFASE** — adoptar JSON |
| `gallery.chint` | Chint · Contenido B2B · Multimedia | Chint Sonora · campaña social | **DESFASE** — adoptar JSON |
| `gallery.diamond` | Diamond Soft · Contenido B2B · Software | Diamond Soft · identidad aplicada | **DESFASE** — el HTML "identidad aplicada" no aplica a este proyecto (era contenido B2B según brief). Adoptar JSON. |
| `gallery.alma` | Alma González · Identidad visual · Freelance | Alma González · sistema personal | **DESFASE** — adoptar JSON |

**Acción crítica:** los 5 items del HTML están desincronizados con el JSON, y algunos describen el proyecto incorrectamente (Diamond Soft no fue "identidad aplicada" — fue contenido B2B). El sistema de hidratación i18n debe ganarle al hardcoded. Eliminar el texto literal del HTML y dejar solo `<p data-i18n="gallery.gbc"></p>`.

**Alts faltantes** — los 5 items de galería tienen `alt=""` (línea 343, 347, 351, 355, 359 de index.html). **Hay que llenarlos.** Propuesta:

```jsonc
// Nuevas claves
"gallery.gbc.alt": "Tarjetas de presentación GBC — rebrand corporativo en construcción"
"gallery.corber.alt": "Pieza social de Corber — contenido digital para agroexportación"
"gallery.chint.alt": "Post B2B de Chint — campaña multimedia para componentes eléctricos"
"gallery.diamond.alt": "Tarjeta Diamond Soft — contenido B2B para software empresarial"
"gallery.alma.alt": "Identidad personal de Alma González — bienes raíces"
```

EN equivalents:
```jsonc
"gallery.gbc.alt": "GBC business cards — corporate rebrand in construction"
"gallery.corber.alt": "Corber social piece — digital content for agribusiness export"
"gallery.chint.alt": "Chint B2B post — multimedia campaign for electrical components"
"gallery.diamond.alt": "Diamond Soft card — B2B content for enterprise software"
"gallery.alma.alt": "Alma González personal brand — real estate"
```

---

# 9. Archive

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `archive.text` | Más piezas seleccionadas en *Behance*. | More selected pieces on *Behance*. | OK |
| `archive.link` | Ver portafolio completo | View full portfolio | OK |

**Mantener.** El uso de `<em>Behance</em>` con rust + SOFT 100 es coherente con el sistema editorial.

---

# 10. Approach §04

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `approach.tag` | § 04 — Enfoque | § 04 — Approach | OK |
| `approach.title` | Cómo *trabajo*. | How I *work*. | OK |
| `approach.01.title` | Entender *primero* | Understand *first* | OK |
| `approach.01.body` | "Antes de abrir cualquier herramienta, necesito entender qué problema resuelve la marca, para quién y en qué contexto. Sin eso, cualquier dirección visual es adivinanza." | "Before opening any tool, I need to understand what problem the brand solves, for whom and in what context. Without that, any visual direction is guesswork." | **OK — voz fuerte, mantener** |
| `approach.02.title` | Sistema, no *piezas* | System, not *pieces* | OK |
| `approach.02.body` | JSON: "Un logo solo no alcanza. Cada pieza debe sostener la misma lógica visual: web, papelería, campañas, presentaciones y contenido social." / HTML: "Un logo solo no alcanza. Cada pieza debe sostener la misma lógica visual, desde una tarjeta hasta una campaña o una página web." | **DESFASE** — recomiendo el HTML (más concreto, "desde X hasta Y" es más activo que enumeración) |
| `approach.03.title` | Ejecutar con *criterio* | Execute with *judgment* | OK |
| `approach.03.body` | "Me muevo entre branding, web y contenido sin perder coherencia. A veces lidero el sistema visual; otras veces traduzco una dirección definida a piezas reales." | "I move between branding, web, and content without losing coherence. Sometimes I lead the visual system; other times I translate an existing direction into real pieces." | **OK — clave para tono honesto del brief §14** |

**Acción `approach.02.body`:** sincronizar a la versión HTML (más editorial). Propuesta unificada:

**ES** (149c): `Un logo solo no alcanza. Cada pieza debe sostener la misma lógica visual, desde una tarjeta hasta una campaña o una página web.`
**EN** (140c): `A logo alone is not enough. Each piece needs to hold the same visual logic — from a business card to a campaign or a website.`

---

# 11. Quote

| Clave | ES | EN | Veredicto |
|---|---|---|---|
| `quote.text` | "Del logo a la *campaña*,<br>cada pieza sostiene el mismo sistema." | "From logo to *campaign*,<br>each piece supports the same system." | OK |
| `quote.sig` | `— Julio Morcillo / Mérida, Yucatán` | mismo | OK |

**Nota técnica:** el HTML actual aplica un `<span class="strike">mismo</span>` con tachadura visual sobre la palabra "mismo" — un gesto editorial de auto-corrección que añade carácter. Confirmar que se respeta en EN (la palabra equivalente sería "same"). Si se quiere mantener, agregar `<span class="strike">same<span class="strike__line"></span></span>` en EN.

**Mantener.**

---

# 12. Experience §05

## 12.1 Section head

| Clave | ES | EN | OK |
|---|---|---|---|
| `xp.tag` | § 05 — Experiencia | § 05 — Experience | OK |
| `xp.title` | Dónde he *trabajado*. | Where I've *worked*. | OK |

## 12.2 Intuitiva (xp.intuitiva)

| Clave | Actual ES | Actual EN | Propuesta |
|---|---|---|---|
| `xp.intuitiva.role` | Diseñador *Gráfico & Web* | Graphic & Web *Designer* | OK |
| `xp.intuitiva.company` | JSON: `<b>Intuitiva</b>México` / HTML: `<b>Intuitiva</b>Mérida, MX` | JSON: `<b>Intuitiva</b>Mexico` / HTML mismo | **DESFASE** — adoptar HTML (más específico) |
| `xp.intuitiva.desc` | "Experiencia formal principal, de finales de 2023 a diciembre de 2025. Trabajé en branding, diseño web, contenido digital, arte final y aplicaciones visuales para clientes de tecnología, salud, agroindustria y servicios B2B." | "Main formal experience, from late 2023 to December 2025. I worked across branding, web design, digital content, final art, and visual applications for clients in technology, healthcare, agribusiness, and B2B services." | OK; quitar Oxford comma EN |

**Acción:**
- Sincronizar `xp.intuitiva.company` al valor del HTML (`<b>Intuitiva</b>Mérida, MX` ES / `<b>Intuitiva</b>Mérida, MX` EN). Brief §7 dice "Ubicación: México" pero "Mérida, MX" es más específico y útil al lector.
- EN: quitar Oxford comma → "branding, web design, digital content, final art and visual applications for clients in technology, healthcare, agribusiness and B2B services."

**Decisión sobre "Marketing Assistant":** el brief §7 indica que el rol formal incluyó "Diseñador Gráfico & Web / Marketing Assistant". **Recomiendo no agregarlo al portafolio** porque:
1. Diluye el posicionamiento de diseño con un descriptor de marketing que en LATAM puede leerse como rol junior administrativo.
2. Brief §4 dice claramente qué NO vender, y "estratega de marketing" está en esa lista.
3. La estética editorial sobria del sitio prefiere un descriptor por rol.

Si quieres conservarlo para CV, el sitio puede mostrar solo "Diseñador Gráfico & Web" sin perder verdad.

## 12.3 FRZT (xp.frzt) — **CAMBIO DE FECHA CRÍTICO**

| Clave | Actual ES | Actual EN | Propuesta |
|---|---|---|---|
| `xp.frzt.role` | Práctica *freelance* | Freelance *practice* | OK |
| `xp.frzt.company` | JSON: `<b>FRZT Studio</b>2017 — 2025` / HTML: `<b>FRZT Studio</b>Freelance · Remoto` | JSON: `<b>FRZT Studio</b>2017 — 2025` / HTML mismo | **CAMBIAR** |
| `xp.frzt.desc` | JSON: "Práctica independiente bajo la cual desarrollé proyectos para negocios pequeños, especialmente identidad visual, diseño web y contenido. Los Pollos Giros forma parte de esta etapa." / HTML: "Práctica freelance histórica para identidades visuales, sitios web sencillos y contenido digital. Funcionó como espacio de aprendizaje y proyectos propios, no como identidad principal actual." | (similar) | Sincronizar al JSON |

**Acción:**
- `xp.frzt.company` debe llevar las fechas, no "Freelance · Remoto". El año cell ya muestra "2017 — 2025" arriba (línea 431 HTML), pero esa fecha también es incorrecta.
- **Cambiar `2017 — 2025` por `2019 — 2025`** en HTML cell year y en JSON, alineado al brief §7.
- Adoptar la versión JSON del desc (más honesta y conecta con el brief: "Los Pollos Giros forma parte de esta etapa").

**Propuesta unificada:**

```jsonc
"xp.frzt.role": "Práctica <em>freelance</em>"        // ES
"xp.frzt.role": "Freelance <em>practice</em>"        // EN
"xp.frzt.company": "<b>FRZT Studio</b>2019 — 2025"   // ambas
"xp.frzt.desc": "Práctica independiente bajo la cual desarrollé proyectos para negocios pequeños, especialmente identidad visual, diseño web y contenido. Los Pollos Giros forma parte de esta etapa."   // ES
"xp.frzt.desc": "Independent practice where I developed projects for small businesses — visual identity, web design and content. Los Pollos Giros belongs to this stage."   // EN
```

**HTML year cell:** cambiar `2017 — 2025` → `2019 — 2025` (línea 431).

## 12.4 PEMOL Sports (xp.pemol)

| Clave | Actual ES | Actual EN | Propuesta |
|---|---|---|---|
| `xp.pemol.role` | Diseñador *Gráfico Jr.* | Junior *Graphic Designer* | OK |
| `xp.pemol.company` | JSON: `<b>PEMOL Sports</b>Mérida, MX` / HTML: `<b>Pemol Sports</b>Mérida, MX` | JSON: `<b>PEMOL Sports</b>Mérida, MX` | Sincronizar capitalización |
| `xp.pemol.desc` | JSON: "Primer trabajo profesional de diseño. Diseño de uniformes deportivos para sublimación y serigrafía, archivos técnicos y producción gráfica aplicada a prendas." / HTML: (variante) | "First professional design job. Sports uniform design for sublimation and screen printing, technical files, and graphic production applied to apparel." | Adoptar JSON; el HTML editorializa demasiado ("donde aprendí producción, archivos técnicos y el rigor de cumplir guías de marca") |

**Decisión sobre capitalización:** el brief y el JSON usan "PEMOL Sports" (capital). El HTML usa "Pemol". Brief §7 lo escribe en mayúsculas. **Recomendación: PEMOL Sports** (mantiene la convención del cliente real).

**Decisión sobre la frase HTML editorializada:** el brief §7 dice "no dramatizar" sobre el mentor. La versión HTML actual ("donde aprendí producción, archivos técnicos y el rigor de cumplir guías de marca") es más narrativa y agrega valor — no dramatiza pero sí editorializa. Decisión:

- **Opción A (recomendada):** mantener la versión JSON neutra. Es la que sigue el brief al pie.
- **Opción B (editorial):** versión más cálida sin caer en drama: "Primer trabajo profesional de diseño. Uniformes deportivos para sublimación y serigrafía, archivos técnicos, producción gráfica aplicada a prendas — donde aprendí lo que es cumplir una guía de marca."

Mi recomendación: **Opción A.** El sitio gana en consistencia tonal cuando los tres xp.desc tienen el mismo nivel editorial.

**HTML year cell `2018 — 2019`:** **OK.** Coincide con brief §7 (verano 2018 a Semana Santa 2019).

---

# 13. Contact §06

| Clave | Actual ES | Actual EN | Veredicto |
|---|---|---|---|
| `contact.tag` | § 06 — Contacto · Disponible 2026 | § 06 — Contact · Available 2026 | OK |
| `contact.title` | ¿Trabajamos *juntos*? | Let's work *together*. | Ver abajo |
| `contact.availability.label` | Disponibilidad | Availability | OK |
| `contact.availability.value` | Remoto · Mérida · Proyectos selectos | Remote · Mérida · Select projects | OK |
| `contact.phone.label` | Teléfono | Phone | OK |

**Diagnóstico `contact.title`:** ES es pregunta, EN es declarativa. Mismatch de mood. Más allá de eso, "Let's work together" es exactamente la frase de portafolio que el brief pide evitar (§5 frases que no representan a Julio implícito en "lenguaje genérico").

**Tres opciones, recomiendo la primera:**

| Opción | ES | EN | Notas |
|---|---|---|---|
| **A (recomendada)** | ¿Trabajamos *juntos*? | Shall we *work* together? | Mantiene pregunta en ambos. EN "shall we" es ligeramente formal pero internacional/neutro y editorial. |
| B (declarativa simétrica) | Trabajemos *juntos*. | Let's *work* together. | Match mood pero EN sigue genérico. |
| C (más específica al brief §17) | Tengo espacio para *2026*. | I have room for *2026*. | Más concreta, alude a disponibilidad. Pero menos directa como CTA. |

**Recomendación: A.** La pregunta es invitatoria, baja la presión y se siente más cercana sin perder profesionalismo. EN "shall we work together?" es deliberadamente editorial — el "shall we" tiene peso británico/internacional que casa con la estética sobria.

---

# 14. Footer

| Clave | Actual ES | Actual EN | Veredicto |
|---|---|---|---|
| `foot.tagline` | `Diseñador multidisciplinario<br>Mérida, Yuc. · remoto` | `Multidisciplinary designer<br>Mérida, Yuc. · remote` | OK |
| `foot.nav` | Navegación | Navigation | OK |
| `foot.online` | En línea | Online | OK |
| `foot.tools` | Herramientas | Tools | OK |
| `foot.tools.photoshop` | Photoshop · Illustrator | mismo | OK |
| `foot.tools.indesign` | InDesign · Figma | mismo | OK |
| `foot.tools.wordpress` | WordPress · Elementor | mismo | OK |
| `foot.tools.capcut` | JSON: `CapCut · HTML/CSS básico` / HTML: `CapCut · HTML/CSS/JS` | JSON: `CapCut · Basic HTML/CSS` | **DESFASE — adoptar JSON** |
| `foot.legal` | © 2026 Julio Morcillo — Todos los derechos reservados. / Mérida, Yucatán, MX | © 2026 Julio Morcillo — All rights reserved. / Mérida, Yucatán, MX | OK |

**Acción `foot.tools.capcut`:** sincronizar a la versión JSON (`CapCut · HTML/CSS básico` ES / `CapCut · Basic HTML/CSS` EN). El brief §6 marca HTML/CSS como working knowledge, no core — y "HTML/CSS/JS" sin el "básico" es overclaim según brief §21.4.

**Considerar:** la sección "En línea" lista Behance + LinkedIn. El brief §23 dice "no incluir Twitter/X" — confirmado, ningún cambio.

---

# 15. Plantilla `works/consentido.html` — copy hardcoded

> Esta plantilla se replicará a 10 casos más. Todo el copy hardcoded debe extraerse a JSON o convertirse en variable por caso. Lista exhaustiva de strings hardcoded que necesitan tratamiento sistémico:

## 15.1 Meta tags hardcoded del head (líneas 6–13)

Todos los meta tags están en ES sin alternancia. Deben hidratarse desde JSON o duplicarse a `consentido.en.html`. Por consistencia de SEO (canonical único por idioma con hreflang), recomiendo **rutas separadas EN**:

- `works/consentido.html` (ES, default, canonical)
- `works/en/consentido.html` (EN, hreflang="en")

O bien `works/consentido.html?lang=en` con hreflang query param. La primera opción es mejor SEO.

**Meta tags por caso (template):** ver sección 16.3 más abajo donde defino el bloque por cada uno de los 11 casos.

## 15.2 Nav del case (líneas 69–73)

```html
<a href="#overview">Resumen</a>
<a href="#system">Sistema</a>
<a href="#applications">Aplicaciones</a>
<a href="#production">Producción</a>
<a href="#results">Cierre</a>
```

**Diagnóstico:** estos labels son específicos para el caso de Consentido. Cada caso tendrá distintos chapters (AMXiTech tiene Marca/Sitio/Componentes/Resultado, Pollos tiene Personaje/Sistema/Aplicaciones/Resultado, etc., como ya está en los JSONs).

**Acción:** el nav del case debe hidratarse desde `chapters[]` del JSON. Agregar `data-case-chapters-nav` al `<div class="nav__menu">` y que `case-study.js` lo pueble.

**Para EN:** los chapter labels actuales están solo en ES en los JSONs. Necesitan equivalente EN — ver sección 16.

## 15.3 CTA persistente (línea 79)

`<a class="nav__cta" href="../index.html#contact">Trabajemos juntos</a>` — hardcoded.

**Propuesta i18n:** crear clave `case.cta.contact`:
- ES: `Trabajemos juntos` (alternativa: "¿Trabajamos juntos?" para alinearse con la home si tomamos la opción A de §13)
- EN: `Shall we work together?` (alineado con la home opción A)

**Recomiendo unificar:** ya que el contact.title usa "¿Trabajamos juntos?", el CTA de case en home también puede ser declarativo "Trabajemos." más corto, mientras el contact.title del home es la pregunta. Decisión depende de Julio. Default: **mantener `Trabajemos juntos` / `Let's work together`** en case CTAs (más imperativo, funciona mejor en botón).

## 15.4 Drawer (líneas 87–104)

Mismas claves que en home (`drawer.label`, `drawer.nav`, `drawer.location`). **OK** — solo asegurar que el drawer del case use `data-i18n` y no hardcoded ES.

Volver al portafolio (línea 98): `<a href="../index.html#works"><span class="drawer__num">Inicio</span> <span>Volver al portafolio</span></a>` — hardcoded.

**Propuesta:**
- ES: `Inicio · Volver al portafolio`
- EN: `Home · Back to portfolio`

**Nuevas claves:**
```jsonc
"drawer.home": "Inicio"        // ES
"drawer.back": "Volver al portafolio"   // ES

"drawer.home": "Home"          // EN
"drawer.back": "Back to portfolio"   // EN
```

## 15.5 Hero del case (líneas 109–124)

`Caso de estudio / 2025` (línea 110) — hardcoded ES.

**Propuesta:**
- ES: `Caso de estudio / {year}`
- EN: `Case study / {year}`

**Nueva clave:**
```jsonc
"case.metaBar.label": "Caso de estudio"   // ES
"case.metaBar.label": "Case study"        // EN
```

`Disciplina / Despliegue de marca · Impreso · Digital · Packaging` (línea 111) — proviene de `data-case-field="meta.discipline"`. **Se hidrata desde JSON** — solo necesita versión EN del campo `meta.discipline`.

`Ficha` (línea 127, heroCard__title) — hardcoded ES.

**Propuesta:**
- ES: `Ficha`
- EN: `Brief`

**Nueva clave:**
```jsonc
"case.heroCard.title": "Ficha"   // ES
"case.heroCard.title": "Brief"   // EN
```

Labels del heroCard (`Cliente`, `Año`, `Rol`, `Alcance`) — hardcoded.

**Propuesta:**
```jsonc
"case.fields.client": "Cliente"
"case.fields.year": "Año"
"case.fields.role": "Rol"
"case.fields.scope": "Alcance"
"case.fields.industry": "Industria"
"case.fields.agency": "Agencia"
"case.fields.studio": "Estudio"
"case.fields.url": "Sitio"
"case.fields.sedes": "Sedes"
"case.fields.edition": "Edición"
"case.fields.type": "Tipo"

// EN
"case.fields.client": "Client"
"case.fields.year": "Year"
"case.fields.role": "Role"
"case.fields.scope": "Scope"
"case.fields.industry": "Industry"
"case.fields.agency": "Agency"
"case.fields.studio": "Studio"
"case.fields.url": "Site"
"case.fields.sedes": "Locations"
"case.fields.edition": "Edition"
"case.fields.type": "Type"
```

## 15.6 Snapshot index (líneas 142–167)

`Ver capítulo →` (cuatro veces) — hardcoded.

**Propuesta:**
- ES: `Ver capítulo →`
- EN: `View chapter →`

**Nueva clave:**
```jsonc
"case.snapshot.cta": "Ver capítulo →"   // ES
"case.snapshot.cta": "View chapter →"   // EN
```

## 15.7 Section heads del case (líneas 170, 212, 250, 284)

Los 4 títulos editoriales **son específicos al caso de Consentido**:

- `Las reglas del <em>sistema</em>.`
- `Adaptación a <em>verticales</em>.`
- `Entregables listos para <em>producir</em>.`
- `Coherencia <em>aplicada</em>.`

**Acción crítica:** estos NO deben quedar hardcoded — cada caso tiene su propia narrativa de capítulos. Mover a JSON, una propuesta por caso. **Te dejo los 11 sets en sección 16.**

## 15.8 displayProse, factCards, prose (líneas 174–207)

```html
<div class="displayProse">
  Logo, paleta, tipografía y composición — los cuatro vértices que definen cómo se lee la marca antes de aplicarla.
</div>
```

**Hardcoded ES.** Es el lede del capítulo "Sistema" para Consentido. **Mover a JSON `chapters[0].lede`.** Necesita EN.

`factCard.title` (`Vértices del sistema`, `Criterio`) y body — todos hardcoded por caso. Mover a JSON.

## 15.9 Captions de figuras / lightbox (data-caption en líneas 134, 179, 182…)

Cada figura tiene `data-caption="<b>Logotipo</b> — variante principal del sistema"` etc. Esto se muestra en el lightbox y debe traducirse.

**Acción:** mover a JSON dentro de cada chapter como `assets[]` con `caption` por idioma.

## 15.10 caseInterlude (líneas 237–246)

```html
<p class="caseInterlude__text">
  El reto no era rediseñar la marca —<br>era hacer que cada <em>aplicación</em><br>mantuviera el mismo criterio.
</p>
<div class="caseInterlude__sig">
  <span>— Criterio de despliegue</span>
  <span>ConSentido · 2025</span>
</div>
<p class="caseInterlude__hint">
  <b>Lo que sigue:</b> los entregables concretos — qué se produjo, en qué formatos y para qué canales.
</p>
```

**Hardcoded para Consentido.** El interlude solo aplica a este caso (Consentido fue rollout sobre marca existente). Para Alfa o Pollos donde Julio fue autor completo, "el reto no era rediseñar" es **falso**. Cada caso necesita su propio interlude.

**Te entrego los 11 interludes en sección 16.**

**Nuevas claves estructurales:**
```jsonc
"case.interlude.hintLabel": "Lo que sigue:"   // ES
"case.interlude.hintLabel": "Up next:"        // EN
```

Y por caso, en el JSON:
```jsonc
"interlude": {
  "text": "...",
  "sigKicker": "— Criterio de despliegue",
  "sigContext": "ConSentido · 2025",
  "hint": "los entregables concretos — qué se produjo, en qué formatos y para qué canales."
}
```

## 15.11 production stats labels (líneas 254–269)

```
Páginas · brandbook
Piezas · aplicaciones
Sedes · UY / MX
Canales desplegados
```

Hardcoded por caso. Cada proyecto tiene distintas métricas de producción. **Mover a JSON `productionStats[]`** con `value` y `label` por caso.

## 15.12 production list (líneas 272–280)

```html
<h3>Inventario de piezas</h3>
<ul>
  <li><b>Brandbook</b><span>...</span></li>
  ...
</ul>
```

`Inventario de piezas` hardcoded.

**Propuesta:**
- ES: `Inventario de piezas`
- EN: `Deliverables`

**Nueva clave:**
```jsonc
"case.production.title": "Inventario de piezas"   // ES
"case.production.title": "Deliverables"           // EN
```

Los items de `<li>` deben venir de JSON `deliverables[]`.

## 15.13 proofBand (líneas 286–288)

```html
<p class="proofBand__scope">El sistema quedó preparado para convivir entre <em>Uruguay y México</em>: mismas reglas, distintos formatos y una lectura consistente en puntos de contacto impresos y digitales.</p>
```

Hardcoded para Consentido. **Mover a JSON `proofText`.** Cada caso necesita el suyo (en sección 16).

## 15.14 credits labels (líneas 293–298)

`Cliente`, `Industria`, `Rol`, `Agencia`, `Año`, `Sedes` — usar las claves `case.fields.*` definidas arriba.

## 15.15 outro nav (líneas 304–331)

Hardcoded:
- `Continuar` → `case.outro.continueLabel`
- `← Proyecto anterior` → `case.outro.prev`
- `Siguiente proyecto →` → `case.outro.next`
- `Inicio del portafolio` (cuando no hay prev) → `case.outro.homeFallback`
- `Primer caso de la serie` → `case.outro.homeFallbackMeta`
- `Más trabajos` (cuando no hay next) → `case.outro.allWorksFallback`
- `Volver al índice del portafolio` → `case.outro.allWorksFallbackMeta`
- `Ver todos los trabajos` → `case.outro.viewAll`
- `Trabajemos juntos` → `case.outro.contact`

**Propuestas:**

```jsonc
// ES
"case.outro.continueLabel": "Continuar"
"case.outro.prev": "← Proyecto anterior"
"case.outro.next": "Siguiente proyecto →"
"case.outro.homeFallback": "Inicio del <em>portafolio</em>"
"case.outro.homeFallbackMeta": "Primer caso de la serie"
"case.outro.allWorksFallback": "Más <em>trabajos</em>"
"case.outro.allWorksFallbackMeta": "Volver al índice del portafolio"
"case.outro.viewAll": "Ver todos los trabajos"
"case.outro.contact": "Trabajemos juntos"
"case.outro.legalLine": "Diseñado y construido en Mérida, MX."

// EN
"case.outro.continueLabel": "Continue"
"case.outro.prev": "← Previous project"
"case.outro.next": "Next project →"
"case.outro.homeFallback": "Portfolio <em>home</em>"
"case.outro.homeFallbackMeta": "First case in the series"
"case.outro.allWorksFallback": "More <em>work</em>"
"case.outro.allWorksFallbackMeta": "Back to the portfolio index"
"case.outro.viewAll": "View all projects"
"case.outro.contact": "Let's work together"
"case.outro.legalLine": "Designed and built in Mérida, MX."
```

## 15.16 footer del case (líneas 340–356)

`Volver` (h4), `Inicio`, `Ver trabajos`, `Contacto` — todos hardcoded.

```jsonc
"case.foot.backTitle": "Volver"   // ES
"case.foot.home": "Inicio"
"case.foot.viewWorks": "Ver trabajos"
"case.foot.contact": "Contacto"

// EN
"case.foot.backTitle": "Back"
"case.foot.home": "Home"
"case.foot.viewWorks": "View work"
"case.foot.contact": "Contact"
```

Tools: `CapCut · HTML/CSS aplicado` (línea 355) — diferente al home (`HTML/CSS básico` JSON o `HTML/CSS/JS` HTML). **Sincronizar todo a `HTML/CSS básico` / `Basic HTML/CSS`** en home, case y footer.

---

# 16. Case JSONs — copy específico por proyecto

> Cada caso necesita estructura bilingüe. Te entrego: para los **6 casos completos**, el bloque ES + EN listo para pegar (hero.note, hero.caption, chapter section heads y notes, interlude, proof, deliverables). Para los **5 casos de galería** entrego una versión más compacta porque el brief permite que estos sean galería sin case completo — pero como ya tienen JSON, te paso ES/EN simétrico.

## 16.1 Estructura recomendada para JSON bilingüe

Recomendación: una sola fuente por caso, con campos `i18n` por cada string traducible:

```jsonc
{
  "slug": "consentido",
  "meta": { /* mismas claves técnicas, pero los valores label-able se mueven a i18n */ },
  "i18n": {
    "es": {
      "hero": { "eyebrow": "...", "manifesto": "...", "note": "...", "caption": "..." },
      "chapters": [ { "title": "Las reglas del <em>sistema</em>.", "label": "Sistema", "note": "...", "lede": "..." }, ... ],
      "interlude": { "text": "...", "sigKicker": "...", "sigContext": "...", "hint": "..." },
      "production": { "stats": [ { "value": "16", "label": "Páginas · brandbook" }, ... ], "deliverables": [...] },
      "proofText": "...",
      "credits": [ { "label": "Cliente", "value": "ConSentido" }, ... ]
    },
    "en": { /* mismas claves */ }
  },
  "prev": { "slug": "...", "title": "...", "meta": "..." },  // bilingüe también
  "next": { ... }
}
```

Si prefieres mantener archivos separados por idioma, duplicar a `consentido.es.json` + `consentido.en.json` y que `case-study.js` cargue el archivo correcto según `<html lang>`.

**A continuación va el copy ES + EN para cada uno de los 11 casos.**

---

## 16.2 — CONSENTIDO

### Hero
- **eyebrow ES:** `§ 01 — Brand rollout · estancia vinícola`
- **eyebrow EN:** `§ 01 — Brand rollout · winery estate`
- **title ES/EN:** `Con<em>Sentido</em>`
- **manifesto ES:** `Trabajo de <strong>aplicación y despliegue</strong> para que una marca vinícola con presencia entre Uruguay y México funcionara con consistencia entre sedes, formatos y materiales.`
- **manifesto EN:** `<strong>Application and rollout</strong> work for a winery brand with locations in Uruguay and Mexico — keeping consistency across sites, formats and materials.`
- **note ES:** `Colaboración dentro de un equipo reducido en Intuitiva: brandbook, submarcas, aplicaciones impresas y digitales a partir de una dirección visual definida.`
- **note EN:** `Collaboration within a small Intuitiva team: brandbook, sub-brands, print and digital applications built from an existing visual direction.`
- **caption ES:** `A partir de una dirección visual definida, ordené aplicaciones, submarcas y criterios de producción para mantener coherencia entre Uruguay y México.`
- **caption EN:** `From a defined visual direction, I organised applications, sub-brands and production criteria to keep coherence across Uruguay and Mexico.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | Las reglas del *sistema*. | The rules of the *system*. | Reglas de marca: logo, paleta, tipografía y composición editorial. | Brand rules: logo, palette, typography and editorial composition. |
| §03 | Adaptación a *verticales*. | Adapted to *verticals*. | Piezas verticales para canales sociales y aplicaciones móviles. | Vertical pieces for social channels and mobile applications. |
| §04 | Entregables listos para *producir*. | Deliverables ready for *production*. | Entregables listos para tiraje impreso y despliegue digital. | Files ready for print runs and digital deployment. |
| §05 | Coherencia *aplicada*. | Coherence *applied*. | Coherencia aplicada entre Uruguay y México sin sobreactuar el sistema. | Coherence applied across Uruguay and Mexico without overdoing the system. |

### Chapter ledes
- **§02 lede ES:** `Logo, paleta, tipografía y composición — los cuatro vértices que definen cómo se lee la marca antes de aplicarla.`
- **§02 lede EN:** `Logo, palette, typography and composition — the four pillars that define how the brand reads before any application.`

### Interlude (este sí aplica para Consentido)
- **text ES:** `El reto no era rediseñar la marca — era hacer que cada <em>aplicación</em> mantuviera el mismo criterio.`
- **text EN:** `The challenge wasn't to redesign the brand — it was to make sure every <em>application</em> held the same criterion.`
- **sigKicker ES:** `— Criterio de despliegue`
- **sigKicker EN:** `— Rollout criterion`
- **sigContext ES/EN:** `ConSentido · 2025`
- **hint ES:** `los entregables concretos — qué se produjo, en qué formatos y para qué canales.`
- **hint EN:** `the concrete deliverables — what was produced, in which formats and for which channels.`

### Proof
- **proofText ES:** `El sistema quedó preparado para convivir entre <em>Uruguay y México</em>: mismas reglas, distintos formatos y una lectura consistente en puntos de contacto impresos y digitales.`
- **proofText EN:** `The system was ready to live across <em>Uruguay and Mexico</em>: same rules, different formats and a consistent read across print and digital touchpoints.`

### Production stats
| value | label ES | label EN |
|---|---|---|
| 16 | Páginas · brandbook | Pages · brandbook |
| 12 | Piezas · aplicaciones | Pieces · applications |
| 2 | Sedes · UY / MX | Locations · UY / MX |
| Impreso + Digital | Canales desplegados | Channels deployed |

### Deliverables (production list)
| Title ES | Detail ES | Title EN | Detail EN |
|---|---|---|---|
| Brandbook | Documento editorial de 16 páginas — criterios, jerarquía y arte final. | Brandbook | 16-page editorial document — criteria, hierarchy and final art. |
| Submarcas | Sistema de arquitectura visual entre sedes. | Sub-brands | Visual architecture system across locations. |
| Packaging | Familia de vinos con etiqueta frontal preparada para tiraje impreso. | Packaging | Wine family with front label ready for print runs. |
| Social | Posts cuadrados, stories verticales y carruseles editoriales. | Social | Square posts, vertical stories and editorial carousels. |
| Editorial | Spreads tipográficos para piezas digitales e impresas. | Editorial | Typographic spreads for digital and print pieces. |

---

## 16.3 — VI SUMMIT

### Hero
- **eyebrow ES:** `§ 01 — Sistema de evento · agroindustria`
- **eyebrow EN:** `§ 01 — Event system · agribusiness`
- **title ES/EN:** `Summit del <em>Espárrago</em>` (o mantener `VI <em>Summit</em>` si prefieres consistencia con el clients marquee — recomiendo `Summit del <em>Espárrago</em>` en case porque es más editorial y diferencia)
- **manifesto ES:** `Producción visual a escala para que la <strong>identidad del congreso</strong> mantuviera coherencia entre formatos físicos y digitales.`
- **manifesto EN:** `Visual production at scale so the <strong>congress identity</strong> stayed coherent across physical and digital formats.`
- **note ES:** `Colaboración dentro del equipo de Intuitiva: artes finales para señalética, merchandising, piezas editoriales y campaña pre-evento a partir de un concepto visual ya definido.`
- **note EN:** `Collaboration within the Intuitiva team: final art for signage, merchandising, editorial pieces and pre-event campaign — built from an already-defined visual concept.`
- **caption ES:** `El reto fue sostener jerarquía y claridad técnica entre decenas de puntos de contacto sin diluir el lenguaje del congreso.`
- **caption EN:** `The challenge was holding hierarchy and technical clarity across dozens of touchpoints without diluting the congress's voice.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | Bajada del *sistema*. | Translating the *system*. | Bajada de la identidad del evento a una matriz visual aplicable. | Translating the event identity into an applicable visual matrix. |
| §03 | Señalética en *sede*. | Signage *on site*. | Artes finales para formatos físicos: vinilos, lonas, módulos. | Final art for physical formats: vinyl, canvas, modules. |
| §04 | Merchandising para *entregar*. | Merch ready to *hand out*. | Piezas tangibles preparadas para tiraje y entrega en sede. | Tangible pieces prepared for production and on-site delivery. |
| §05 | Coherencia *editorial*. | Editorial *coherence*. | Coherencia editorial entre el congreso, su campaña y sus materiales. | Editorial coherence across the congress, its campaign and its materials. |

### Interlude
- **text ES:** `No era rediseñar el evento — era llevar el mismo <em>lenguaje</em> a cada superficie sin perderlo en la traducción.`
- **text EN:** `Not redesigning the event — taking the same <em>language</em> to every surface without losing it in translation.`
- **sigKicker ES:** `— Criterio de producción`
- **sigKicker EN:** `— Production criterion`
- **sigContext ES/EN:** `VI Summit · 2025`
- **hint ES:** `el inventario completo — señalética, merch, editorial y campaña pre-evento.`
- **hint EN:** `the full inventory — signage, merch, editorial and pre-event campaign.`

### Proof
- **proofText ES:** `La identidad del congreso quedó <em>desplegada</em> en docenas de superficies con jerarquía constante y producción técnica resuelta.`
- **proofText EN:** `The congress identity was <em>deployed</em> across dozens of surfaces with consistent hierarchy and technical production solved.`

---

## 16.4 — AMXITECH

### Hero
- **eyebrow ES:** `§ 01 — UI/UX · web · tech B2B`
- **eyebrow EN:** `§ 01 — UI/UX · web · B2B tech`
- **title ES/EN:** `AMXi<em>Tech</em>` (importante: NO `AMX<em>iTech</em>`. La marca se lee "AMX" + "iTech"; el énfasis va en "Tech" para mantener el patrón cursiva = parte distintiva del nombre, igual que ConSentido / Pollos Giros)
- **manifesto ES:** `Traducción de una <strong>identidad tecnológica</strong> a una experiencia digital clara, comercial y responsive para una empresa B2B de soluciones TI.`
- **manifesto EN:** `Translating a <strong>technology identity</strong> into a clear, responsive, commercially oriented experience for a B2B IT services company.`
- **note ES:** `Autoría principal del sitio web y aplicación visual de la marca. El naming y logo final fueron dirigidos por dirección de arte; mi rol fue construir la cara digital del rebrand.`
- **note EN:** `Lead author of the website and visual brand application. Naming and final logo were led by art direction; my role was building the digital face of the rebrand.`
- **caption ES:** `Una landing pensada para explicar servicios complejos y facilitar el contacto con clientes B2B sin perder rigor visual.`
- **caption EN:** `A landing built to explain complex services and support B2B contact without losing visual rigour.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | La *marca* aplicada. | The *brand*, applied. | Aplicación del sistema visual definido a un ecosistema digital. | Applying the defined visual system across a digital ecosystem. |
| §03 | Arquitectura del *sitio*. | Site *architecture*. | Arquitectura, jerarquía y estructura de navegación de amxitech.com. | Architecture, hierarchy and navigation structure of amxitech.com. |
| §04 | Sistema de *componentes*. | A modular *component* system. | Sistema modular, responsive y orientado a captación de leads. | Modular, responsive system focused on lead generation. |
| §05 | Una cara *digital*. | A *digital* face. | Una cara digital comercial, sobria y alineada al lenguaje del rebrand. | A commercial, sober digital face aligned to the rebrand's voice. |

### Interlude
- **text ES:** `El logo no resuelve la confianza B2B — la <em>página</em> sí, si está bien construida.`
- **text EN:** `A logo doesn't solve B2B trust — the <em>page</em> does, when it's well built.`
- **sigKicker ES:** `— Criterio de diseño web`
- **sigKicker EN:** `— Web design criterion`
- **sigContext ES/EN:** `AMXiTech · 2025`
- **hint ES:** `el sistema modular — cómo se construyó la página y cómo se sostiene en producción.`
- **hint EN:** `the modular system — how the site was built and how it holds up in production.`

### Proof
- **proofText ES:** `El sitio quedó activo en <em>amxitech.com</em>: una cara digital comercial, modular y alineada al rebrand, lista para sostener captación B2B.`
- **proofText EN:** `The site went live at <em>amxitech.com</em>: a commercial, modular digital face aligned to the rebrand, built to sustain B2B lead generation.`

---

## 16.5 — LOS POLLOS GIROS

### Hero
- **eyebrow ES:** `§ 01 — Identidad · food & beverage`
- **eyebrow EN:** `§ 01 — Identity · food & beverage`
- **title ES/EN:** `Los Pollos <em>Giros</em>`
- **manifesto ES:** `Identidad visual para un concepto de <strong>comida rápida con personalidad propia</strong>, construida alrededor de un personaje simple y memorable.`
- **manifesto EN:** `Visual identity for a <strong>fast-food concept with a distinct personality</strong>, built around a simple, memorable character.`
- **note ES:** `Proyecto propio bajo FRZT Studio. Autoría completa: concepto, sistema y aplicaciones para que la marca viviera en empaque, prendas y señalización sin perder reconocimiento.`
- **note EN:** `Self-initiated project under FRZT Studio. Full authorship: concept, system and applications so the brand could live across packaging, apparel and signage without losing recognition.`
- **caption ES:** `Tono con humor visual y lógica de reproducción comercial: un sistema que se imprime barato y se reconoce a primera vista.`
- **caption EN:** `Tone with visual humour and commercial reproduction logic: a system that prints cheap and reads instantly.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | El *personaje* manda. | The *character* leads. | Ícono central como vehículo de marca: simple, divertido, reproducible. | Central icon as brand vehicle: simple, fun, reproducible. |
| §03 | Sistema alrededor del *ícono*. | A system around the *icon*. | Tipografía, color y composición a partir del personaje. | Typography, colour and composition built from the character. |
| §04 | *Aplicaciones* para producir. | *Applications* for production. | Empaque, camisetas, bolsas y señalización listos para producción. | Packaging, shirts, bags and signage ready for production. |
| §05 | Marca con *voz*. | A brand with *voice*. | Una marca con voz, lista para escalar sin perder personalidad. | A brand with voice, ready to scale without losing personality. |

### Interlude
- **text ES:** `El reto no era serio — era memorable. Una identidad <em>divertida</em> también sostiene un sistema.`
- **text EN:** `The challenge wasn't to be serious — it was to be memorable. A <em>playful</em> identity can hold a system too.`
- **sigKicker ES:** `— Criterio de marca`
- **sigKicker EN:** `— Brand criterion`
- **sigContext ES/EN:** `Los Pollos Giros · 2024`
- **hint ES:** `las aplicaciones reales — cómo el personaje sobrevive a la producción comercial.`
- **hint EN:** `the real applications — how the character survives commercial production.`

### Proof
- **proofText ES:** `Una marca <em>reconocible</em> desde el primer impacto, lista para vivir en empaque, prendas y señalización sin diluirse.`
- **proofText EN:** `A brand <em>recognisable</em> on first impact, ready to live across packaging, apparel and signage without diluting.`

---

## 16.6 — NEUROMUSCULAR MID

### Hero
- **eyebrow ES:** `§ 01 — UI/UX · web · salud`
- **eyebrow EN:** `§ 01 — UI/UX · web · healthcare`
- **title ES/EN:** `Neuromuscular <em>MID</em>`
- **manifesto ES:** `Una experiencia digital <strong>cálida, clara y confiable</strong> para una clínica de fisioterapia en Mérida, enfocada en reserva de citas y claridad de servicios.`
- **manifesto EN:** `A <strong>warm, clear, trustworthy</strong> digital experience for a physiotherapy clinic in Mérida — focused on appointment booking and service clarity.`
- **note ES:** `Autoría principal de UI/UX y diseño web. Conceptualicé el motivo del corazón pixelado y construí la arquitectura completa de la landing.`
- **note EN:** `Lead author of UI/UX and web design. I conceived the pixelated heart motif and built the full landing architecture.`
- **caption ES:** `Un balance entre calidez humana y credibilidad clínica para que el paciente entienda rápido qué se ofrece y cómo agendar.`
- **caption EN:** `A balance between human warmth and clinical credibility so patients quickly understand what's offered and how to book.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | Un *concepto* que cuida. | A *concept* that cares. | Motivo del corazón pixelado como puente entre lo clínico y lo cercano. | Pixelated heart motif as a bridge between clinical and close. |
| §03 | Arquitectura para *entender*. | Architecture to *understand*. | Arquitectura de información orientada a entendimiento rápido. | Information architecture built for fast understanding. |
| §04 | Reservar como acción *primaria*. | Booking as the *primary* action. | Reserva de citas como acción primaria del sitio. | Appointment booking as the site's primary action. |
| §05 | Sitio *activo*. | A *live* site. | Un sitio activo en neuromuscularmid.com con voz de marca propia. | A live site at neuromuscularmid.com with its own brand voice. |

### Interlude
- **text ES:** `En salud, lo que decide no es el efecto — es que el paciente <em>entienda</em> y agende sin fricción.`
- **text EN:** `In healthcare, what decides isn't the effect — it's whether the patient <em>understands</em> and books without friction.`
- **sigKicker ES:** `— Criterio de UX clínico`
- **sigKicker EN:** `— Clinical UX criterion`
- **sigContext ES/EN:** `Neuromuscular MID · 2025`
- **hint ES:** `el sitio activo — cómo se construyó el flujo de reserva y por qué se siente cálido.`
- **hint EN:** `the live site — how the booking flow was built and why it feels warm.`

### Proof
- **proofText ES:** `Un sitio activo en <em>neuromuscularmid.com</em>: claridad clínica, calidez humana y un flujo de reserva que reduce fricción para el paciente.`
- **proofText EN:** `A live site at <em>neuromuscularmid.com</em>: clinical clarity, human warmth and a booking flow that reduces friction for the patient.`

---

## 16.7 — ALFA COMUNICACIONES

### Hero
- **eyebrow ES:** `§ 01 — Identidad · telecomunicaciones`
- **eyebrow EN:** `§ 01 — Identity · telecommunications`
- **title ES/EN:** `Alfa <em>Comunicaciones</em>`
- **manifesto ES:** `Identidad visual para una empresa de telecomunicaciones que necesitaba <strong>diferenciarse sin caer en clichés del sector</strong>: símbolo, paleta, tipografía y reglas de uso.`
- **manifesto EN:** `Visual identity for a telecommunications company that needed to <strong>stand out without industry clichés</strong>: symbol, palette, typography and usage rules.`
- **note ES:** `Autoría principal del sistema completo. Liderazgo conceptual y técnico desde el isotipo hasta las aplicaciones corporativas.`
- **note EN:** `Lead author of the full system. Conceptual and technical leadership from the symbol to the corporate applications.`
- **caption ES:** `Un lenguaje sobrio, técnico y aplicable: pensado para vivir en tarjetas, papelería y materiales comerciales sin sobreactuar.`
- **caption EN:** `A sober, technical, applicable language — built to live across cards, stationery and commercial materials without overdoing it.`

### Chapter section heads
| § | Title ES | Title EN | Note ES | Note EN |
|---|---|---|---|---|
| §02 | El *símbolo* primero. | *Symbol* first. | Isotipo circular construido sobre los valores de marca. | Circular symbol built on the brand values. |
| §03 | Sistema *completo*. | The *full* system. | Paleta, tipografía y reglas de composición del sistema visual. | Palette, typography and composition rules of the visual system. |
| §04 | *Brandbook* documentado. | A documented *brandbook*. | Reglas de uso completas para sostener el sistema en el tiempo. | Complete usage rules to sustain the system over time. |
| §05 | Aplicaciones que *aterrizan*. | Applications that *land*. | Tarjetas y materiales corporativos como primera línea de marca. | Cards and corporate materials as the brand's front line. |

### Interlude
- **text ES:** `Diferenciarse en telecom no exige ruido — exige <em>criterio</em> que aguante el día a día.`
- **text EN:** `Standing out in telecom doesn't require noise — it requires <em>criterion</em> that holds up day to day.`
- **sigKicker ES:** `— Criterio de identidad`
- **sigKicker EN:** `— Identity criterion`
- **sigContext ES/EN:** `Alfa Comunicaciones · 2024`
- **hint ES:** `las aplicaciones reales — cómo el sistema sobrevive en tarjetas y papelería corporativa.`
- **hint EN:** `the real applications — how the system survives across cards and corporate stationery.`

### Proof
- **proofText ES:** `Una identidad <em>aplicable</em> y documentada: símbolo, sistema y brandbook para sostener la marca sin depender de quien la diseñó.`
- **proofText EN:** `An <em>applicable</em>, documented identity: symbol, system and brandbook so the brand can sustain itself without depending on its designer.`

---

## 16.8 — GBC (caso de galería extendida — opcional como case completo)

> El brief lo marca como galería compacta. Si decides hacer caso completo, este es el copy. Si no, basta con `gallery.gbc` en el home.

### Hero
- **eyebrow ES:** `§ 01 — Brand rollout · construcción`
- **eyebrow EN:** `§ 01 — Brand rollout · construction`
- **title ES/EN:** `<em>GBC</em>` (no `G<em>BC</em>` — la cursiva debe destacar la palabra distintiva. En este caso el nombre completo es la sigla; recomiendo todo en cursiva: `<em>GBC</em>`)
- **manifesto ES:** `Bajada técnica de una <strong>identidad rebrandeada</strong> a aplicaciones corporativas reales para una empresa del sector construcción.`
- **manifesto EN:** `Technical rollout of a <strong>rebranded identity</strong> into real corporate applications for a construction company.`
- **note ES:** `Colaboración dentro de equipo reducido en Intuitiva. Mi rol fue producir aplicaciones, sistema de tarjetas y mockups fotorrealistas a partir de la dirección de arte definida.`
- **note EN:** `Collaboration within a small Intuitiva team. My role was producing applications, the card system and photorealistic mockups from the defined art direction.`
- **caption ES:** `El valor del proyecto está en validar la marca en su entorno real antes de salir a producción definitiva.`
- **caption EN:** `The value of the project lies in validating the brand in its real environment before going into final production.`

### Chapter heads
| § | ES | EN |
|---|---|---|
| §02 | Bajada *técnica*. / Aterrizaje técnico de la identidad a piezas corporativas. | Technical *rollout*. / Technical landing of the identity into corporate pieces. |
| §03 | Sistema de *tarjetas*. / Sistema de tarjetas de presentación B2B para el equipo. | The *card* system. / B2B business card system for the team. |
| §04 | Validación en *mockup*. / Variantes fotorrealistas para validar el sistema en obra. | Validation in *mockup*. / Photorealistic variants to validate the system on site. |
| §05 | Lista para *campo*. / Una marca lista para corporativo y lista para campo. | Ready for *the field*. / A brand ready for corporate and ready for the field. |

### Interlude
- **text ES:** `El rebrand sale del estudio — el reto era que sobreviviera al <em>polvo</em> de la obra.`
- **text EN:** `The rebrand leaves the studio — the challenge was for it to survive the <em>dust</em> on site.`

### Proof
- **proofText ES:** `Una identidad <em>aplicada</em> y validada antes de producción: tarjetas, mockups y aplicaciones listas para vivir en obra y oficina.`
- **proofText EN:** `An <em>applied</em>, validated identity before production: cards, mockups and applications ready to live on site and in the office.`

---

## 16.9 — CORBER (galería extendida opcional)

### Hero
- **eyebrow ES:** `§ 01 — Contenido digital · agroexportación`
- **eyebrow EN:** `§ 01 — Digital content · agribusiness export`
- **title ES/EN:** `<em>Corber</em>`
- **manifesto ES:** `Dinamización de marca para una <strong>empresa de agroexportación</strong>: copy, artes y reels para sostener una comunicación constante sin estructura formal de marketing.`
- **manifesto EN:** `Brand activation for an <strong>agribusiness export</strong> company: copy, graphics and reels to sustain constant communication without a formal marketing structure.`
- **note ES:** `Colaboración / ejecución de contenido en Intuitiva. Redacción, diseño gráfico y producción de video para explicar beneficios de producto y mantener la marca activa.`
- **note EN:** `Content collaboration / execution at Intuitiva. Copywriting, graphic design and video production to explain product benefits and keep the brand active.`
- **caption ES:** `El objetivo no fue rebrandear: fue construir voz y ritmo digital donde antes había silencio.`
- **caption EN:** `The goal wasn't a rebrand: it was building voice and digital rhythm where there had been silence.`

### Chapter heads
| § | ES | EN |
|---|---|---|
| §02 | La *voz* del producto. | The product's *voice*. |
| §03 | *Artes* en cadencia. | *Graphics* in cadence. |
| §04 | *Reels* para campo. | *Reels* from the field. |
| §05 | Marca con *ritmo*. | A brand with *rhythm*. |

### Interlude
- **text ES:** `Sin estructura de marketing, lo que sostiene una marca es <em>cadencia</em>.`
- **text EN:** `Without a marketing structure, what holds a brand together is <em>cadence</em>.`

### Proof
- **proofText ES:** `Una marca con presencia digital sostenida y <em>tono propio</em>, construida pieza a pieza sin depender de campaña.`
- **proofText EN:** `A brand with sustained digital presence and a <em>distinct tone</em>, built piece by piece without depending on a campaign.`

---

## 16.10 — CHINT (galería extendida opcional)

### Hero
- **eyebrow ES:** `§ 01 — Contenido B2B · componentes eléctricos`
- **eyebrow EN:** `§ 01 — B2B content · electrical components`
- **title ES/EN:** `<em>Chint</em>`
- **manifesto ES:** `Producción multimedia para explicar <strong>tecnología compleja</strong> con piezas diarias alineadas al lenguaje visual de una matriz global.`
- **manifesto EN:** `Multimedia production to explain <strong>complex technology</strong> with daily pieces aligned to a global parent's visual language.`
- **note ES:** `Colaboración / ejecución multimedia en Intuitiva. Piezas gráficas, videos cortos y composiciones visuales para canales digitales B2B.`
- **note EN:** `Multimedia collaboration / execution at Intuitiva. Graphics, short videos and visual compositions for B2B digital channels.`
- **caption ES:** `El reto fue traducir fichas técnicas y componentes eléctricos a un lenguaje visual digerible sin perder rigor.`
- **caption EN:** `The challenge was translating tech specs and electrical components into a digestible visual language without losing rigour.`

### Interlude
- **text ES:** `B2B no perdona el <em>relleno</em> — cada pieza tiene que explicar algo o no merece publicarse.`
- **text EN:** `B2B doesn't forgive <em>filler</em> — every piece has to explain something or it doesn't deserve to be published.`

### Proof
- **proofText ES:** `Contenido alineado a la <em>matriz global</em> en su fase avanzada, con ritmo digital sostenido y piezas que explican producto.`
- **proofText EN:** `Content aligned to the <em>global parent</em> in its advanced phase, with sustained digital rhythm and pieces that explain product.`

---

## 16.11 — DIAMOND SOFT (galería extendida opcional)

### Hero
- **eyebrow ES:** `§ 01 — Contenido B2B · software empresarial`
- **eyebrow EN:** `§ 01 — B2B content · enterprise software`
- **title ES/EN:** `Diamond <em>Soft</em>`
- **manifesto ES:** `Definición del <strong>look & feel digital</strong> para una marca de software empresarial: cómo debía verse y sentirse en piezas digitales.`
- **manifesto EN:** `Defining the <strong>digital look & feel</strong> for an enterprise software brand: how it should look and feel across digital pieces.`
- **note ES:** `Colaboración con liderazgo visual en entregables. Decisiones creativas para sostener coherencia entre piezas sin pretender un rebrand global.`
- **note EN:** `Collaboration with visual leadership over deliverables. Creative decisions to sustain coherence across pieces without attempting a global rebrand.`
- **caption ES:** `El foco fue dar criterio visual a la marca en su capa digital, no rediseñar su sistema completo.`
- **caption EN:** `The focus was giving visual criterion to the brand at its digital layer — not redesigning its full system.`

### Interlude
- **text ES:** `No siempre toca rediseñar — a veces lo que falta es <em>criterio</em> que sostenga lo que ya hay.`
- **text EN:** `It isn't always about redesigning — sometimes what's missing is <em>criterion</em> that holds up what already exists.`

### Proof
- **proofText ES:** `Una capa digital con <em>criterio propio</em> dentro de la marca, sostenida por decisiones visuales consistentes pieza a pieza.`
- **proofText EN:** `A digital layer with its <em>own criterion</em> inside the brand, sustained by consistent visual decisions piece by piece.`

---

## 16.12 — ALMA GONZÁLEZ (galería extendida opcional)

### Hero
- **eyebrow ES:** `§ 01 — Identidad · bienes raíces`
- **eyebrow EN:** `§ 01 — Identity · real estate`
- **title ES/EN:** `Alma <em>González</em>`
- **manifesto ES:** `Identidad visual para una <strong>profesional de bienes raíces</strong>: una marca personal sobria, clara y aplicable a piezas reales.`
- **manifesto EN:** `Visual identity for a <strong>real estate professional</strong>: a sober, clear, applicable personal brand.`
- **note ES:** `Proyecto freelance bajo FRZT Studio. Sistema visual para servicios profesionales donde la confianza y la claridad importan más que el gesto.`
- **note EN:** `Freelance project under FRZT Studio. Visual system for professional services where trust and clarity matter more than gesture.`
- **caption ES:** `Un lenguaje contenido pensado para vivir en presentaciones, materiales de venta y comunicación con clientes.`
- **caption EN:** `A restrained language built to live across presentations, sales materials and client communication.`

### Interlude
- **text ES:** `En servicios profesionales, la marca personal pesa más que el logo — pero el logo tiene que <em>aguantar</em> la confianza.`
- **text EN:** `In professional services, the personal brand weighs more than the logo — but the logo has to <em>carry</em> the trust.`

### Proof
- **proofText ES:** `Una marca personal <em>lista para presentar</em>: sobria, clara y construida para sostener confianza en cada conversación con cliente.`
- **proofText EN:** `A personal brand <em>ready to present</em>: sober, clear and built to sustain trust in every client conversation.`

---

# 17. SEO extras y "bells and whistles"

## 17.1 JSON-LD `CreativeWork` por caso

Pegar dentro del `<head>` de cada `works/<slug>.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "ConSentido — Brand rollout",
  "headline": "ConSentido — Caso de estudio",
  "description": "Despliegue de marca, brandbook y aplicaciones para una estancia vinícola con presencia entre Uruguay y México.",
  "url": "https://juliomorcillo.com/works/consentido.html",
  "image": "https://juliomorcillo.com/assets/images/consentido-hero@2x.jpg",
  "inLanguage": "es-MX",
  "datePublished": "2025-12-01",
  "creator": {
    "@type": "Person",
    "name": "Julio Morcillo",
    "url": "https://juliomorcillo.com/"
  },
  "about": ["Brand rollout", "Brandbook", "Sub-brands", "Print", "Digital"],
  "isPartOf": {
    "@type": "Collection",
    "name": "Julio Morcillo Portfolio 2026",
    "url": "https://juliomorcillo.com/#works"
  }
}
</script>
```

Cambiar `name`, `headline`, `description`, `url`, `image`, `datePublished` y `about` por caso. Estructura idéntica para los 11.

## 17.2 Twitter card por caso

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ConSentido — Caso de estudio · Julio Morcillo">
<meta name="twitter:description" content="Despliegue de marca, brandbook y aplicaciones para una estancia vinícola con presencia entre Uruguay y México.">
<meta name="twitter:image" content="https://juliomorcillo.com/assets/images/consentido-hero@2x.jpg">
<meta name="twitter:image:alt" content="Brandbook y aplicaciones de ConSentido">
```

## 17.3 OG por caso (ya parcialmente en `consentido.html`)

```html
<meta property="og:type" content="article">
<meta property="og:title" content="ConSentido — Caso de estudio · Julio Morcillo">
<meta property="og:description" content="Despliegue de marca, brandbook y aplicaciones para una estancia vinícola con presencia entre Uruguay y México.">
<meta property="og:url" content="https://juliomorcillo.com/works/consentido.html">
<meta property="og:image" content="https://juliomorcillo.com/assets/images/consentido-hero@2x.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="900">
<meta property="og:image:alt" content="Brandbook y aplicaciones de ConSentido">
<meta property="og:site_name" content="Julio Morcillo Portfolio">
<meta property="og:locale" content="es_MX">
<meta property="og:locale:alternate" content="en_US">
```

## 17.4 hreflang en cada page de caso

Cuando exista la versión EN del caso (en `/en/works/<slug>.html`):

```html
<link rel="canonical" href="https://juliomorcillo.com/works/consentido.html">
<link rel="alternate" hreflang="es-MX" href="https://juliomorcillo.com/works/consentido.html">
<link rel="alternate" hreflang="en"    href="https://juliomorcillo.com/en/works/consentido.html">
<link rel="alternate" hreflang="x-default" href="https://juliomorcillo.com/works/consentido.html">
```

## 17.5 sitemap.xml — propuesta de estructura

Crear `/sitemap.xml` (raíz del dominio):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://juliomorcillo.com/</loc>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://juliomorcillo.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://juliomorcillo.com/en/"/>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://juliomorcillo.com/works/consentido.html</loc>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://juliomorcillo.com/works/consentido.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://juliomorcillo.com/en/works/consentido.html"/>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- repetir para los 10 casos restantes -->
</urlset>
```

## 17.6 robots.txt

```
User-agent: *
Allow: /

Sitemap: https://juliomorcillo.com/sitemap.xml
```

---

# 18. Anexo — Lista consolidada de claves nuevas a agregar

## 18.1 `es.json` — claves nuevas

```jsonc
"meta.ogImageAlt": "Portafolio de Julio Morcillo — diseñador multidisciplinario en Mérida",

"gallery.gbc.alt": "Tarjetas de presentación GBC — rebrand corporativo en construcción",
"gallery.corber.alt": "Pieza social de Corber — contenido digital para agroexportación",
"gallery.chint.alt": "Post B2B de Chint — campaña multimedia para componentes eléctricos",
"gallery.diamond.alt": "Tarjeta Diamond Soft — contenido B2B para software empresarial",
"gallery.alma.alt": "Identidad personal de Alma González — bienes raíces",

"drawer.home": "Inicio",
"drawer.back": "Volver al portafolio",

"case.metaBar.label": "Caso de estudio",
"case.heroCard.title": "Ficha",
"case.snapshot.cta": "Ver capítulo →",
"case.production.title": "Inventario de piezas",
"case.interlude.hintLabel": "Lo que sigue:",

"case.fields.client": "Cliente",
"case.fields.year": "Año",
"case.fields.role": "Rol",
"case.fields.scope": "Alcance",
"case.fields.industry": "Industria",
"case.fields.agency": "Agencia",
"case.fields.studio": "Estudio",
"case.fields.url": "Sitio",
"case.fields.sedes": "Sedes",
"case.fields.edition": "Edición",
"case.fields.type": "Tipo",

"case.outro.continueLabel": "Continuar",
"case.outro.prev": "← Proyecto anterior",
"case.outro.next": "Siguiente proyecto →",
"case.outro.homeFallback": "Inicio del <em>portafolio</em>",
"case.outro.homeFallbackMeta": "Primer caso de la serie",
"case.outro.allWorksFallback": "Más <em>trabajos</em>",
"case.outro.allWorksFallbackMeta": "Volver al índice del portafolio",
"case.outro.viewAll": "Ver todos los trabajos",
"case.outro.contact": "Trabajemos juntos",
"case.outro.legalLine": "Diseñado y construido en Mérida, MX.",

"case.foot.backTitle": "Volver",
"case.foot.home": "Inicio",
"case.foot.viewWorks": "Ver trabajos",
"case.foot.contact": "Contacto"
```

## 18.2 `en.json` — claves nuevas

```jsonc
"meta.ogImageAlt": "Julio Morcillo portfolio — multidisciplinary designer based in Mérida",

"gallery.gbc.alt": "GBC business cards — corporate rebrand in construction",
"gallery.corber.alt": "Corber social piece — digital content for agribusiness export",
"gallery.chint.alt": "Chint B2B post — multimedia campaign for electrical components",
"gallery.diamond.alt": "Diamond Soft card — B2B content for enterprise software",
"gallery.alma.alt": "Alma González personal brand — real estate",

"drawer.home": "Home",
"drawer.back": "Back to portfolio",

"case.metaBar.label": "Case study",
"case.heroCard.title": "Brief",
"case.snapshot.cta": "View chapter →",
"case.production.title": "Deliverables",
"case.interlude.hintLabel": "Up next:",

"case.fields.client": "Client",
"case.fields.year": "Year",
"case.fields.role": "Role",
"case.fields.scope": "Scope",
"case.fields.industry": "Industry",
"case.fields.agency": "Agency",
"case.fields.studio": "Studio",
"case.fields.url": "Site",
"case.fields.sedes": "Locations",
"case.fields.edition": "Edition",
"case.fields.type": "Type",

"case.outro.continueLabel": "Continue",
"case.outro.prev": "← Previous project",
"case.outro.next": "Next project →",
"case.outro.homeFallback": "Portfolio <em>home</em>",
"case.outro.homeFallbackMeta": "First case in the series",
"case.outro.allWorksFallback": "More <em>work</em>",
"case.outro.allWorksFallbackMeta": "Back to the portfolio index",
"case.outro.viewAll": "View all projects",
"case.outro.contact": "Let's work together",
"case.outro.legalLine": "Designed and built in Mérida, MX.",

"case.foot.backTitle": "Back",
"case.foot.home": "Home",
"case.foot.viewWorks": "View work",
"case.foot.contact": "Contact"
```

---

# 19. Checklist de implementación (orden recomendado)

1. **Resolver fechas:** confirmar 2018 / 2019 / 2025 con Julio. Actualizar `hero.since`, `xp.frzt.company`, year cell HTML de FRZT.
2. **Sincronizar HTML hardcoded ↔ JSON:** los 8 desfases identificados (clients marquee names, gallery items, work descriptions de Pollos / Visummit / Neuromuscular / Alfa, foot.tools.capcut, xp.intuitiva.company, approach.02.body).
3. **Corregir AMXiTech:** `marca` → `submarca` en `work.amxitech.desc` ES y `brand` → `sub-brand` en EN. Confirmar `title` `AMXi<em>Tech</em>` (no `AMX<em>iTech</em>`).
4. **Llenar alts de galería:** los 5 items con `alt=""`.
5. **Agregar SEO extras:** Twitter card, OG extras, hreflang, robots, JSON-LD Person en `index.html`. JSON-LD CreativeWork por caso.
6. **Extraer hardcoded de `consentido.html`** a claves `case.*` y a JSON por caso. Actualizar `case-study.js` para hidratar los nuevos campos.
7. **Migrar 11 case JSONs a estructura bilingüe.** Empezar por los 6 prioritarios (Consentido, AMXiTech, VI Summit, Pollos, Neuromuscular, Alfa). Luego los 5 de galería.
8. **Crear `/en/` mirror para casos** o implementar `?lang=en` con hreflang. Decidir antes de migrar JSONs.
9. **Sitemap.xml + robots.txt** en raíz del dominio.
10. **QA bilingüe:** abrir cada page en ES y EN, verificar que ningún string queda sin traducir; QA mobile 390px (longitud de títulos largos en ES); QA `?capture=1`; QA `prefers-reduced-motion`.

---

# 20. Decisiones que necesito que confirmes

1. **Fecha de inicio profesional:** ¿2018 (PEMOL) o 2019 (FRZT)? Recomiendo **2018**.
2. **Locación de Intuitiva:** ¿`México` (brief) o `Mérida, MX` (HTML)? Recomiendo **Mérida, MX**.
3. **Marketing Assistant en role de Intuitiva:** ¿incluir o excluir? Recomiendo **excluir** del sitio público (sí en CV).
4. **Estrategia bilingüe de cases:** ¿`/en/works/...` (rutas separadas) o `?lang=en` (parámetro)? Recomiendo **rutas separadas** (mejor SEO).
5. **`AMXi<em>Tech</em>` vs `AMX<em>iTech</em>`:** confirmar dónde va el énfasis cursivo. Recomiendo **`AMXi<em>Tech</em>`** (cursiva sobre la palabra distintiva, no sobre una "i" suelta).
6. **Submarcas de Consentido:** el HTML actual menciona "Estancia Vinícola y Casa Tamarindo". El brief no las nombra. ¿Son nombres reales? Si sí, se quedan; si no, generalizar a "submarcas por sede".
7. **Versión de gallery items:** confirmar adoptar JSON (más informativo y consistente con cases) sobre HTML hardcoded.
8. **Contact title:** opción **A** (`¿Trabajamos juntos?` / `Shall we work together?`) o B (declarativa simétrica) o C (`Tengo espacio para 2026.`).
9. **Galería extendida vs case completo** para GBC, Corber, Chint, Diamond Soft, Alma González: el brief dice galería; tú dijiste "todos tienen página propia". ¿Mantengo el copy completo de los 5 (sección 16.8–16.12) por si los conviertes a case completo, o los dejo en galería compacta?

---

*Audit cerrada. Próximo paso natural: aplicar cambios consensuados a `es.json` / `en.json`, sincronizar HTML/JSON, y generar los 11 JSONs bilingües.*
