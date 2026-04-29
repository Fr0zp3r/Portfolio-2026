# Copy Rules — Portafolio Julio Morcillo

Reglas de redacción operativas para todo nuevo copy del sitio (ES y EN).
Lectura obligada antes de proponer headlines, CTAs, captions, manifestos o cualquier texto editorial.

Stack del sitio (recordatorio): vanilla HTML/CSS/JS + GSAP. i18n vive en `content/es.json` + `content/en.json` + `content/cases/*.json`. Cada clave debe existir en **ambos** idiomas.

---

## 1. Tono y voz

- **Editorial · sobrio · técnico**.
- **Directo**. Confiado sin arrogancia. Profesional pero humano.
- **Visualmente inteligente**: el copy describe sistemas, no sentimientos.
- **Honesto sobre autoría**. Nunca inflar rol.

Pasa el filtro: ¿podría aparecer en una pieza editorial impresa de un estudio sobrio? Si suena a anuncio, descartar.

---

## 2. Verbos de autoría

Atribución honesta es **regla dura** del proyecto ([CLAUDE.md](../CLAUDE.md) y brief). Cada caso tiene un nivel de autoría — el verbo debe coincidir.

| Nivel real | Verbos permitidos | Ejemplos del set actual |
|---|---|---|
| **Autor único** (lead, full authorship) | Diseñé · Conceptualicé · Definí · Lideré · Construí | Alfa Comunicaciones, Pollos Giros, Neuromuscular MID, Alma González |
| **Colaboración** (lead within team, partial authorship) | Colaboré en · Co-diseñé · Adapté · Desplegué · Produje · Traducí | ConSentido, VI Summit, Diamond Soft, GBC, Corber, Chint |
| **Bajo dirección de arte** (execution, naming/logo from someone else) | Trabajé sobre una dirección visual definida · Aterricé en aplicaciones · Bajé a producción · Ejecuté arte final | AMXiTech (naming/logo no son míos), GBC (rebrand inicial no es mío) |

### Equivalentes EN

| ES | EN |
|---|---|
| Diseñé · Lideré | Designed · Led |
| Conceptualicé · Definí | Conceived · Defined |
| Construí | Built |
| Colaboré en · Co-diseñé | Collaborated on · Co-designed |
| Adapté · Desplegué | Adapted · Rolled out |
| Produje · Traducí | Produced · Translated |
| Trabajé sobre una dirección visual definida | Worked from a defined art direction |
| Aterricé en aplicaciones | Landed it across applications |
| Bajé a producción · Ejecuté arte final | Brought to production · Executed final art |

Reglas duras:
- **AMXiTech**: NO atribuir naming/logo final a Julio. Lenguaje permitido: "translation of the rebrand", "applied the visual direction", "earlier proposal under the name AT Solutions".
- **ConSentido / VI Summit / Diamond Soft / Corber / Chint**: lenguaje de "collaboration / rollout / execution within Intuitiva".
- **GBC**: el rebrand no es de Julio; sí los mockups + tarjetas + aplicaciones.
- **Alfa, Pollos, Neuromuscular MID, Alma**: sí "lead author / full authorship".

---

## 3. Casing

| Dónde | Regla | Ejemplo |
|---|---|---|
| Section tags (`.s-head__tag`, `.case-hero__metaBar`, mono) | **ALL-CAPS mono** + `letter-spacing: 0.06–0.1em` | `§ 02 — TRABAJOS SELECCIONADOS` |
| Headings (h1, h2, work title, hero, sectionHead) | **Sentence case** | "Qué hago, *y cómo*." |
| CTAs / botones | sentence case o lowercase | "Trabajemos juntos" / "Ver proyecto" |
| Body / párrafos | sentence case normal | — |
| Labels mono (`.heroCard__row span`, `.foot__col h4`) | **ALL-CAPS mono** o sentence — uniforme por componente | "CLIENTE" / "BRIEF" |
| Mailto, URL, números | preservar form | `julioerty@gmail.com` |

**Nunca**:
- All-caps en display type (Fraunces grande). El display es para sentence case con `<em>` rust.
- SHOUTING en CTAs ("¡CONTÁCTANOS YA!"). Sin excepciones.
- Title Case English-style en ES ("Trabajos Seleccionados"). En español no aplica.

---

## 4. Numeración editorial

| Tipo | Formato |
|---|---|
| Sección grande (home) | `§ XX — Nombre` (mono) |
| Trabajo | `W / XX` (Fraunces números) |
| Principio | `01`, `02`, `03` (Fraunces, sin formato extra) |
| Capítulo de caso | `§ XX` (mono) |

Carácter `§` (signo de párrafo, U+00A7), separador `—` (em dash, U+2014). No usar `#`, `Nº`, `-`, `--`.

---

## 5. Acento — `<em>` solo

`<em>` es **el** mecanismo de acento. CSS lo renderiza Fraunces italic, opsz 144, SOFT 100, wght 300, color `--rust`.

```html
<h1>Qué hago, <em>y cómo</em>.</h1>
<h2>Bajada <em>técnica</em>.</h2>
<p>El sistema vive en <em>aplicaciones</em>, no en el logo.</p>
```

**Prohibido para acentuar**:
- `<strong>` con color rust (rompe el sistema; `<strong>` se reserva para énfasis editorial sin color)
- subrayado decorativo
- pesos arbitrarios de Archivo
- color rust aplicado a algo que no sea `<em>` o el dot disponibilidad o focus ring

Una cursiva por heading. Dos como máximo en headings largos. Más de eso es ruido.

---

## 6. Bilingüe — ES default · EN espejo

- **Cada clave nueva debe existir en ambos idiomas**. No dejar EN con TODO.
- ES: Mérida MX. Tono cercano profesional.
- EN: neutro/internacional. Sin Oxford comma. Sin frases hechas de portfolio (no "I help brands tell their story", no "passionate about pixels").
- Cuando el ES usa `<em>` para acento, mantener `<em>` en EN sobre la palabra equivalente, no traducir literal si pierde ritmo.

Atributos i18n:
- `data-i18n="key"` para texto interno
- `data-i18n-attr="atributo:key"` para `alt`, `aria-label`, `content`, `title`

Claves jerárquicas con punto: `nav.projects`, `work.consentido.title`, `meta.description`.

---

## 7. Prohibido

Lista no negociable. Si una propuesta los incluye, declinar.

- **Emoji**. Nunca. Ningún caso.
- **Métricas inventadas** (`+200% engagement`, `15M users`, `award-winning`). Sólo lo verificable.
- **Seniority inflada**: NO "senior creative director", NO "design lead at X" si no fue formal, NO "co-founder" si no aplica.
- **"Front-end developer"** como título de Julio. El stack es prototipado/edición, no ingeniería.
- **Frases hechas vacías**: "We transform ideas into reality", "Designed with passion", "Crafted with care", "Bringing your vision to life", "Where strategy meets design".
- **Adjetivos sin sustancia**: "amazing", "incredible", "stunning", "mind-blowing", "world-class". Cortar.
- **Buzzwords**: "synergy", "ecosystem" (cuando no es real), "ideation", "thought leadership".
- **Auto-elogio**: el copy describe sistemas, no a Julio.
- **Iconos ornamentales**: el sistema es tipográfico. No usar emojis ni glifos decorativos en copy editorial.

---

## 8. Patrones útiles (referencia)

Estructuras que han funcionado bien en el set actual:

### Manifesto / lede
> Conecto **identidad visual**, **sitios web** y **contenido digital** para que una marca pueda verse y funcionar como sistema.

— `<strong>` para los tres pilares, sentence case, primera persona, sin auto-elogio.

### Proyecto manifesto (case hero)
> Trabajo de **aplicación y despliegue** para que una marca vinícola con presencia entre Uruguay y México funcionara con consistencia entre sedes, formatos y materiales.

— Verbo de autoría honesto ("aplicación y despliegue", no "diseñé"), `<strong>` para el rol, contexto geográfico/sectorial breve.

### Atribución honesta (case note)
> Colaboración dentro de un equipo reducido en Intuitiva: brandbook, submarcas, aplicaciones impresas y digitales a partir de una dirección visual definida.

— Lista de entregables, mención del equipo, precisión sobre el punto de partida.

### Interlude editorial
> El reto no era rediseñar la marca — era hacer que cada *aplicación* mantuviera el mismo criterio.

— Estructura "no era X — era Y", `<em>` sobre la palabra que carga el peso, em dash.

### Proof / cierre
> El sistema quedó preparado para convivir entre *Uruguay y México*: mismas reglas, distintos formatos y una lectura consistente en puntos de contacto impresos y digitales.

— Lo que quedó (no lo que prometemos), `<em>` sobre el contraste, sentence case.

---

## 9. Checklist antes de cerrar copy

- [ ] Verbo de autoría coincide con nivel real (sole / collab / under direction).
- [ ] `<em>` usado como único acento, máximo 1–2 por heading.
- [ ] Sin emojis, sin métricas inventadas, sin buzzwords.
- [ ] Casing correcto (mono ALL-CAPS, headings sentence case).
- [ ] Numeración editorial usa `§ XX` o `W / XX` según corresponda.
- [ ] Existe en ambos `es.json` y `en.json` (o `i18n.es` + `i18n.en` si es caso).
- [ ] Tono editorial, no anuncio.
- [ ] Pasa el filtro: ¿podría aparecer impreso en un libro editorial sobrio?

---

## 10. Referencias cruzadas

- [`../CLAUDE.md`](../CLAUDE.md) — instrucciones del proyecto.
- [`../assets/fonts/styleguide.md`](../assets/fonts/styleguide.md) — sistema visual.
- [`../assets/fonts/type-specimens.md`](../assets/fonts/type-specimens.md) — ejes tipográficos.
- [`audit-copy-2026.md`](audit-copy-2026.md) — auditoría de copy 2026 (referencia de voz por caso).
- [`../.claude/skills/julio-morcillo-design/README.md`](../.claude/skills/julio-morcillo-design/README.md) — design system skill (Claude Design).

---

*Última actualización: 2026-04-29.*
