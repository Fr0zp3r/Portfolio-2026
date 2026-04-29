# Interaction Audit

## Estado actual

El portafolio ya cuenta con una base interactiva sólida: hero con máscaras tipográficas, GSAP/ScrollTrigger, reveals, clip reveals en media, counters, parallax ligero, cursor custom, targets magnéticos, progress rail, section pin, drawer accesible, lightbox y soporte para `prefers-reduced-motion` y `?capture=1`.

## Zonas que necesitaban vida

- Hero: el nombre funcionaba, pero la entrada podía sentirse estándar.
- Navbar: el punto naranja tenía pulso, pero no respondía al estado de scroll.
- Cards de proyecto: las compactas respondían mejor que las hero/split.
- Galería compacta: necesitaba affordance sin parecer galería pesada.
- Case study: el lightbox existía, pero la media podía comunicar mejor que era inspeccionable.

## Zonas que deben permanecer sobrias

- Bloques largos de lectura editorial.
- Footer.
- Contacto, salvo feedback mínimo en email.
- Drawer mobile.
- Interlude oscuro del case study.

## Riesgos controlados

- Se limitó el scramble a CTAs para evitar sensación tech/glitch.
- Se redujo el parallax y se eliminaron easings con rebote.
- En mobile se acortaron delays y desplazamientos.
- `?capture=1` y `prefers-reduced-motion` siguen forzando contenido visible y estable.
