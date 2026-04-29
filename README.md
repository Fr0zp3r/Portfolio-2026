# Portafolio — Julio Morcillo

Sitio personal. Branding, web y contenido digital.

## Stack

- HTML + CSS + JavaScript vanilla
- Sin build step
- Sin frameworks ni dependencias de runtime
- Fuentes locales en `assets/fonts` (Fraunces y Archivo) con fallback monospace del sistema

## Correr localmente

Clonar el repo y servir la carpeta raíz con cualquier servidor HTTP estático:

```bash
# Opción 1 — Python
python -m http.server 8000

# Opción 2 — Node
npx serve
```

Luego abrir `http://localhost:8000` (o el puerto que reporte `serve`).

> Abrir `index.html` con doble clic también funciona para la mayoría de cosas, pero algunos navegadores bloquean `fetch` de archivos locales. Usar servidor estático evita sorpresas.

## Deploy a GitHub Pages

1. Push del repo a `main`.
2. En GitHub → **Settings** → **Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` · Folder: `/ (root)`.
5. Guardar. Sitio disponible en `https://<usuario>.github.io/<repo>/` en ~1 minuto.

No requiere action de build — los archivos sirven tal cual.

## QA rápido

```bash
node --check scripts/nav.js
node --check scripts/i18n.js
node --check scripts/animations.js
node --check scripts/case-study.js
node --check scripts/lightbox.js
```

Revisar manualmente en navegador: cambio ES/EN, drawer mobile con teclado, foco visible, enlaces, y viewports 390, 768, 1280 y 1440 px.

## Higiene de contexto

El sitio fuente vive en `index.html`, `works/`, `styles/`, `scripts/`, `content/` y los assets referenciados desde esas rutas.

Archivos y carpetas locales como `.claude/`, `.qodo/`, `.playwright-cli/`, `output/playwright/`, `works/*backup*.html` y `Portafolio 2026 Abril. backlog.zip` son historial, herramientas o respaldos. No deben usarse como fuente principal para editar contenido ni para validar el estado actual del sitio.

## Estructura

```
/
├── index.html              # Marcado principal
├── styles/
│   ├── reset.css           # Reset global + body/html base
│   ├── main.css            # Variables + estilos de secciones principales
│   └── case-study.css      # Estilos para casos de estudio
├── scripts/
│   ├── nav.js              # Nav activo (IntersectionObserver), idioma visual, drawer mobile
│   ├── i18n.js             # Carga de content/*.json y swap de textos
│   ├── animations.js       # Reveals, ScrollTrigger y microinteracciones
│   ├── case-study.js       # Hidratación de casos desde content/cases/*.json
│   └── lightbox.js         # Visor de imágenes en casos
├── assets/
│   ├── images/             # Fotos, mockups, logos
│   └── videos/             # Clips de proyectos
├── content/
│   ├── es.json             # Copias en español
│   ├── en.json             # Copias en inglés
│   └── cases/              # Datos de casos de estudio
├── works/                  # Páginas individuales de proyectos
└── README.md
```

## Convención de commits

Prefijos tipo Conventional Commits:

- `feat:` funcionalidad nueva (ej. `feat: i18n loader con fallback a es`)
- `fix:` corrección de bug (ej. `fix: drawer no cerraba con Escape en Safari`)
- `chore:` mantenimiento, refactor sin cambio visible (ej. `chore: extraer estilos a styles/`)
- `docs:` solo documentación (ej. `docs: README con instrucciones de deploy`)

Mensaje corto en imperativo. Cuerpo opcional si el *por qué* no es obvio.
