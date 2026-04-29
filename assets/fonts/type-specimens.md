# Type Specimens — Fraunces & Archivo

Referencia técnica de los ejes variables. Complementa [`styleguide.md`](styleguide.md).

---

## Fraunces — Display serif

Archivo: `Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf`
Itálica: `Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf`

### Ejes

| Eje | Tag | Rango | Default | Función |
|---|---|---|---|---|
| Optical Size | `opsz` | 9 – 144 | 14 | Ajuste óptico por tamaño. 144 = display, 9 = caption. |
| Softness | `SOFT` | 0 – 100 | 0 | Curva de terminales. 0 = duro/serio, 100 = blando/cálido. |
| Wonkiness | `WONK` | 0 – 1 | 0 | Carácter alternativo (g de doble loop, etc.). 1 = wonky. |
| Weight | `wght` | 100 – 900 | 400 | Peso. |
| Italic | `ital` | 0 – 1 | 0 | Cursiva (archivo separado). |

### Tabla de uso canónico

| Aplicación | `opsz` | `SOFT` | `WONK` | `wght` | `ital` |
|---|---:|---:|---:|---:|---:|
| Hero H1 | 144 | 20 | 0 | 380 | 0 |
| Section H2 | 144 | 20 | 0 | 400 | 0 |
| Acento `<em>` (cursiva rust) | 144 | 100 | 0 | 300 | 1 |
| Lede / display extenso | 14 | 50 | 0 | 400 | 0 |
| Número index `§ 02` | 144 | 0 | 0 | 400 | 0 |
| Outro nav title | 144 | 20 | 0 | 380 | 0 |

### Sintaxis CSS

```css
font-family: var(--display);
font-variation-settings: "opsz" 144, "SOFT" 20, "WONK" 0, "wght" 380;
```

Nota: `font-weight` y `font-variation-settings` pueden coexistir, pero el último gana en `wght`. Si usas variation-settings explícito, no setees `font-weight`.

### Combinaciones sugeridas (no pedirá Claude Design otras sin justificación)

- **Editorial sobrio**: opsz 144, SOFT 20, wght 380. Default del proyecto.
- **Editorial cálido (cursivas acento)**: opsz 144, SOFT 100, wght 300, ital 1. Color `--rust`.
- **Lede largo**: opsz 14, SOFT 50, wght 400.
- **Número grande sin gesto**: opsz 144, SOFT 0, wght 400.

No usar WONK > 0 sin discusión. Reservado.

---

## Archivo — Sans UI + body

Archivo: `Archivo-VariableFont_wdth,wght.ttf`
Itálica: `Archivo-Italic-VariableFont_wdth,wght.ttf`

### Ejes

| Eje | Tag | Rango | Default | Función |
|---|---|---|---|---|
| Width | `wdth` | 75 – 125 (%) | 100 | Condensación / expansión horizontal. |
| Weight | `wght` | 100 – 900 | 400 | Peso. |
| Italic | `ital` | 0 – 1 | 0 | Cursiva (archivo separado). |

### Tabla de uso canónico

| Aplicación | `wdth` | `wght` | `ital` |
|---|---:|---:|---:|
| Body párrafo | 100 | 400 | 0 |
| Body énfasis | 100 | 600 | 0 |
| UI / botones | 100 | 500 | 0 |
| Labels / metadata | 100 | 500 | 0 |
| Mono micro (uppercase) | 100 | 500 | 0 |
| Cita en cuerpo | 100 | 400 | 1 |

### Sintaxis CSS

```css
font-family: var(--sans);
font-variation-settings: "wdth" 100, "wght" 400;
```

No usar `wdth` < 90 ni > 110 sin discusión. La marca vive en proporciones normales.

---

## `@font-face` declaraciones

Las cuatro fuentes están precargadas en `<head>` y declaradas en `styles/main.css`:

```css
@font-face {
  font-family: 'Fraunces';
  src: url('../assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fraunces';
  src: url('../assets/fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Archivo';
  src: url('../assets/fonts/Archivo-VariableFont_wdth,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-stretch: 75% 125%;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Archivo';
  src: url('../assets/fonts/Archivo-Italic-VariableFont_wdth,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-stretch: 75% 125%;
  font-style: italic;
  font-display: swap;
}
```

Preload en cada HTML antes de stylesheets:

```html
<link rel="preload" href="../assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="../assets/fonts/Archivo-VariableFont_wdth,wght.ttf" as="font" type="font/ttf" crossorigin>
```

(Las cursivas también se preload — ver `index.html`.)

Para `/en/works/`: misma referencia con `../../assets/fonts/...`.

---

## Pruebas rápidas (snippets)

### Hero title con acento

```html
<h1 class="case-hero__title">Bajada <em>técnica</em>.</h1>
```

```css
.case-hero__title {
  font-family: var(--display);
  font-variation-settings: "opsz" 144, "SOFT" 20, "wght" 380;
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.95;
  letter-spacing: -0.045em;
  color: var(--ink);
}
.case-hero__title em {
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100, "wght" 300;
  color: var(--rust);
}
```

### Mono label

```html
<div class="s-head__tag">§ 02 — Trabajos seleccionados</div>
```

```css
.s-head__tag {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
```

### Body editorial

```css
.prose p {
  font-family: var(--sans);
  font-variation-settings: "wdth" 100, "wght" 400;
  font-size: clamp(16px, 1.4vw, 18px);
  line-height: 1.55;
  color: var(--ink-soft);
}
```

---

## Reglas de oro

1. Si el peso/eje no está en las tablas anteriores, justificar antes de usar.
2. Una sola cursiva: `<em>` Fraunces SOFT 100 rust. No hay otra.
3. Mono solo en uppercase con tracking. No para body.
4. Archivo en `wdth` 100. Comprimir/expandir es señal de marca diferente.

---

*Última actualización: 2026-04-28.*
