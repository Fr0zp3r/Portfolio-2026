# Motion System

## Principio

Precisión editorial con respuesta táctil. El movimiento debe sentirse como una maqueta editorial viva: cortes, máscaras, líneas, tensión tipográfica y microestados claros.

## Ritmo

- Hero desktop: entrada breve, tipográfica y escalonada.
- Hero mobile: menos delay, menos desplazamiento.
- Reveals: 480–720 ms, una sola vez.
- Hovers: 160–320 ms.
- Media/cards: 450–720 ms, sin cambios de layout.

## Lenguaje aplicado

- Hero: word-mask por líneas, entrada desde baseline, metadata y stats escalonados.
- Navbar: punto naranja más sobrio y estado `nav-scrolled`.
- CTAs: cambio de fondo/borde, microdesplazamiento y flecha activa.
- Cards: línea superior en rust, número activo, media con lift mínimo.
- Galería compacta: leve lift, nitidez de imagen y caption activo.
- Case study: media inspeccionable, snapshot/results con respuesta editorial, outro más táctil.

## Límites

- Sin glow, glitch, bounce, scroll-jacking ni parallax pesado.
- Sin animar bloques largos de lectura.
- Sin aumentar espacio vertical ni cambiar estructura.
- `prefers-reduced-motion`: sin movimiento funcional.
- `?capture=1`: todo visible, sin timelines, parallax, cursor, progress ni clip states.
