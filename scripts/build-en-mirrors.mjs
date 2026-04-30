// Build-time mirror generator: works/*.html → en/works/*.html
// Produces fully localised English mirrors. Body content is hardcoded EN.
// JS hydration via case-study.js still runs (idempotent against EN copy).
//
// Source of truth for translatable per-section content:
//   content/cases/<slug>.json → i18n.en.{hero,chapters,interlude,production,proofText,credits,seo}
// Per-slug captions/alts/factCards live in PER_SLUG below.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SLUGS = [
  'consentido', 'vi-summit', 'amxitech', 'diamond-soft', 'corber',
  'gbc', 'chint', 'alfa-comunicaciones', 'los-pollos-giros',
  'neuromuscular-mid', 'alma-gonzalez'
];

// =====================================================================
// PER-SLUG translation maps for unique strings.
// Strings are matched and replaced longest-first.
// Includes fragment-level entries for HTML-encoded data-caption attrs.
// factCards: ordered list matching DOM order (chapter--editorial side panel).
// =====================================================================

const PER_SLUG = {
  'consentido': {
    factCards: [
      { t: 'System pillars', b: 'Logo · five-tone palette · typographic hierarchy · editorial composition — the base for every application.' },
      { t: 'Criterion', b: 'Hold consistency without overplaying the system. The brand had to read the same across every touchpoint.' }
    ],
    showcaseLede: null,
    strings: {
      // Bold/heading fragments
      'Pieza principal': 'Hero piece',
      'Logotipo': 'Logo',
      'Paleta': 'Palette',
      'Composición': 'Composition',
      'Arquitectura': 'Architecture',
      'Aplicación editorial': 'Editorial application',
      'Submarca UY': 'UY sub-brand',
      'Submarca MX': 'MX sub-brand',
      'Familia de vinos': 'Wine family',
      // Suffix fragments
      'sistema de marca ConSentido': 'ConSentido brand system',
      'variante principal del sistema': 'main system variant',
      'tierra antigua, hojas de olivo, bruma de encino': 'old earth, olive leaves, oak mist',
      'isotipo en los cinco fondos del sistema': 'symbol on the five system backgrounds',
      'submarcas por sede': 'sub-brands by location',
      'overview del sistema completo': 'overview of the full system',
      'pieza tipográfica destacada': 'featured typographic piece',
      'acento regional': 'regional accent',
      'pieza tipográfica vertical': 'vertical typographic piece',
      'post vertical packaging': 'vertical packaging post',
      // alt strings (decoded form)
      'Portada del sistema de marca ConSentido': 'Cover of the ConSentido brand system',
      'Logotipo ConSentido — isotipo y wordmark del sistema de marca': 'ConSentido logo — symbol and wordmark of the brand system',
      'Paleta de color ConSentido — cinco tonos con nombres del sistema': 'ConSentido colour palette — five tones named by the system',
      'Isotipo ConSentido aplicado en los cinco fondos del sistema de color': 'ConSentido symbol applied across the five system backgrounds',
      'Arquitectura de submarcas ConSentido — Estancia Vinícola y Casa Tamarindo': 'ConSentido sub-brand architecture — Estancia Vinícola and Casa Tamarindo',
      'Overview del sistema de marca ConSentido — brandbook completo': 'Overview of the ConSentido brand system — full brandbook',
      'Pieza editorial ConSentido — criterio de aplicación visual': 'ConSentido editorial piece — visual application criterion',
      'Aplicación social vertical para submarca Uruguay': 'Vertical social application for the Uruguay sub-brand',
      'Aplicación social vertical para submarca México': 'Vertical social application for the Mexico sub-brand',
      'Pieza editorial vertical ConSentido': 'Vertical ConSentido editorial piece',
      'Post vertical familia de vinos ConSentido': 'Vertical ConSentido wine family post',
      // Hero card values from heroCard__row that are unique to slug
      'Despliegue de marca · Arte final': 'Brand rollout · Final art',
      'Brandbook · Submarcas · Aplicaciones': 'Brandbook · Sub-brands · Applications'
    }
  },

  'vi-summit': {
    factCards: [
      { t: 'System pillars', b: 'Technical typography · editorial grid · composition rules · hierarchy applicable across multiple formats.' },
      { t: 'Criterion', b: 'Hold hierarchy and technical clarity across dozens of touchpoints without diluting the congress voice.' }
    ],
    showcaseLede: null,
    strings: {
      'Sistema gráfico': 'Graphic system',
      'Gafete': 'Badge',
      'Gafetes': 'Badges',
      'matriz visual del congreso': 'congress visual matrix',
      'lanyard del congreso': 'congress lanyard',
      'sistema de credenciales': 'credential system',
      'Gafete y lanyard del VI Summit Internacional del Espárrago — sistema gráfico del congreso': 'Badge and lanyard of the VI Summit Internacional del Espárrago — congress graphic system',
      'Gafete con lanyard del VI Summit': 'Badge with lanyard of the VI Summit',
      'Sistema de credenciales del VI Summit': 'VI Summit credential system',
      // Video block captions (mediaBlock — YouTube embeds)
      'Grabación del evento': 'Event recording',
      'Anuncio promocional': 'Promotional ad',
      'campaña pre-evento': 'pre-event campaign',
      'VI Summit Internacional del Espárrago — grabación del evento': 'VI Summit Internacional del Espárrago — event recording',
      'VI Summit Internacional del Espárrago — anuncio promocional': 'VI Summit Internacional del Espárrago — promotional ad',
      // Hero card values
      'Production designer · Despliegue gráfico': 'Production designer · Graphic rollout'
    }
  },

  'amxitech': {
    factCards: [
      { t: 'Authorship clarity', b: 'Naming and final logo were directed by art direction. My role was the digital translation of the rebrand and an earlier proposal under the name AT Solutions.' },
      { t: 'Platform', b: 'WordPress · Elementor builder. Modular components built to scale content without touching design.' }
    ],
    showcaseLede: null,
    strings: {
      'Sitio AMXiTech': 'AMXiTech site',
      'Logo aplicado': 'Logo applied',
      'Propuesta AT Solutions': 'AT Solutions proposal',
      'Componentes UI': 'UI components',
      'landing B2B': 'B2B landing',
      'bajada digital del rebrand': 'digital rollout of the rebrand',
      'propuesta previa de identidad': 'earlier identity proposal',
      'captura del sitio activo': 'screenshot of the live site',
      'sistema modular del sitio': 'site module system',
      // alts
      'Sitio web AMXiTech — landing B2B para servicios tecnológicos de Amerimex': 'AMXiTech website — B2B landing for Amerimex technology services',
      'Logo de AMXiTech aplicado en superficie digital': 'AMXiTech logo applied on a digital surface',
      'Propuesta AT Solutions — propuesta previa de identidad para AMXiTech': 'AT Solutions proposal — earlier identity proposal for AMXiTech',
      'Captura del sitio amxitech.com — landing B2B': 'Screenshot of amxitech.com — B2B landing',
      'Componentes UI del sitio AMXiTech': 'UI components of the AMXiTech site',
      // Hero card row values
      'AMXiTech · submarca de Amerimex': 'AMXiTech · sub-brand of Amerimex'
    }
  },

  'diamond-soft': {
    factCards: [
      { t: 'Focus', b: 'Bring visual criterion to the brand at its digital layer — not redesign the full system. Coherence between pieces without claiming a global rebrand.' },
      { t: 'Visual leadership', b: 'Creative decisions to sustain consistency across pieces. Look & feel defined at the deliverable level, not at foundational system level.' }
    ],
    showcaseLede: 'Digital deliverables aligned to the defined system — coherence piece by piece, without overload.',
    strings: {
      'Tarjeta': 'Card',
      'Pieza B2B': 'B2B piece',
      'Monitoreo 24/7': '24/7 monitoring',
      'Servidores': 'Servers',
      'Estacional': 'Seasonal',
      'capa digital Diamond Soft': 'Diamond Soft digital layer',
      'capa digital Diamond': 'Diamond digital layer',
      'pieza digital': 'digital piece',
      'pieza B2B': 'B2B piece',
      'pieza navidad': 'holiday piece',
      // alts
      'Tarjeta Diamond Soft — contenido B2B para software empresarial': 'Diamond Soft card — B2B content for enterprise software',
      'Pieza Diamond Soft sobre ciberataques': 'Diamond Soft piece on cyberattacks',
      'Pieza Diamond Soft monitoreo 24/7': 'Diamond Soft piece on 24/7 monitoring',
      'Pieza Diamond Soft servidores seguros': 'Diamond Soft piece on secure servers',
      'Pieza Diamond Soft estacional': 'Diamond Soft seasonal piece',
      // Hero card row values
      'Look & feel · Piezas · Coherencia': 'Look & feel · Pieces · Coherence'
    }
  },

  'corber': {
    factCards: [
      { t: 'Premise', b: "Without a formal marketing structure, what holds a digital brand together is cadence. Build voice piece by piece without waiting for the perfect campaign." },
      { t: 'Multimedia', b: 'Copy + graphics + video. Three parallel formats to sustain digital channels with frequency and product clarity.' }
    ],
    showcaseLede: 'Constant pieces to feed channels with frequency, keeping a distinct tone with product at the centre.',
    strings: {
      'Pieza social': 'Social piece',
      'Distribución confiable': 'Reliable distribution',
      'Mango': 'Mango',
      'Pieza': 'Piece',
      'contenido digital Corber': 'Corber digital content',
      'beneficio de producto': 'product benefit',
      'pieza estacional': 'seasonal piece',
      'semana de diciembre': 'December week',
      'campaña digital': 'digital campaign',
      'comunicación constante': 'constant communication',
      // alts
      'Pieza social de Corber — contenido digital para agroexportación': 'Corber social piece — digital content for agribusiness export',
      'Post Corber sobre distribución confiable': 'Corber post on reliable distribution',
      'Post Corber temporada de mango': 'Corber mango-season post',
      'Pieza Corber semana de diciembre': 'Corber piece — December week',
      'Pieza Corber campaña digital': 'Corber piece — digital campaign',
      'Pieza Corber comunicación constante': 'Corber piece — constant communication',
      // Video block captions (mediaBlock)
      'pieza vertical para canales sociales': 'vertical piece for social channels',
      // Hero card row values
      'Reels · Artes · Copy': 'Reels · Graphics · Copy'
    }
  },

  'gbc': {
    factCards: [
      { t: 'Authorship clarity', b: 'I was not the author of the initial rebrand or logo. My role was producing corporate applications and photorealistic mockups from the defined art direction.' },
      { t: 'Mockups', b: 'Visual validation before final production. Photorealistic variants to anticipate how the brand reads in its real environment.' }
    ],
    showcaseLede: 'B2B business card system for the team on site and in the office.',
    strings: {
      'Tarjeta corporativa': 'Corporate card',
      'Billboard': 'Billboard',
      'Camioneta': 'Truck',
      'sistema GBC': 'GBC system',
      'aplicación a gran formato': 'large-format application',
      'rotulación vehicular': 'vehicle livery',
      // alts
      'Tarjeta de presentación GBC — rebrand corporativo en construcción': 'GBC business card — corporate rebrand in construction',
      'Billboard GBC en mockup': 'GBC billboard mockup',
      'Camioneta GBC con rotulación': 'GBC truck with livery',
      // Hero card row values
      'Brand rollout designer · Arte final': 'Brand rollout designer · Final art',
      'Aplicaciones · Tarjetas · Mockups': 'Applications · Cards · Mockups'
    }
  },

  'chint': {
    factCards: [
      { t: 'Global alignment', b: "The challenge was translating the global parent's visual language into local pieces without losing rigour or corporate tone." },
      { t: 'B2B', b: "Every piece has to explain a benefit or a concrete feature. B2B doesn't forgive filler." }
    ],
    showcaseLede: 'Reels and short videos built for B2B technical audiences, with digital rhythm and product at the centre.',
    strings: {
      'Pieza B2B': 'B2B piece',
      'Protege': 'Protect',
      'Ahorro energético': 'Energy savings',
      'contenido Chint': 'Chint content',
      'pieza B2B': 'B2B piece',
      // alts
      'Post B2B de Chint — campaña multimedia para componentes eléctricos': 'Chint B2B post — multimedia campaign for electrical components',
      'Pieza Chint protege tus sistemas': 'Chint piece — protect your systems',
      'Pieza Chint ahorro de energía renovable': 'Chint piece on renewable-energy savings',
      // Video block captions (mediaBlock)
      'reel B2B para canales digitales': 'B2B reel for digital channels',
      // Hero card row values
      'Piezas · Reels · Producto': 'Pieces · Reels · Product'
    }
  },

  'alfa-comunicaciones': {
    factCards: [
      { t: 'Premise', b: "Stand out in telecom without falling into industry clichés — generic circles, gradients, obvious connections. Build from values, not from typical icons." },
      { t: 'Brandbook', b: 'Full usage document. A documented system to sustain the brand without depending on its author.' }
    ],
    showcaseLede: null,
    strings: {
      'Tarjeta corporativa': 'Corporate card',
      'Logo': 'Logo',
      'Tarjeta': 'Card',
      'Post social': 'Social post',
      'identidad Alfa Comunicaciones': 'Alfa Comunicaciones identity',
      'isotipo circular del sistema': 'system circular symbol',
      'variante v2': 'variant v2',
      'variante v3': 'variant v3',
      'aplicación digital': 'digital application',
      // alts
      'Tarjeta de presentación de Alfa Comunicaciones — identidad visual para telecomunicaciones': 'Alfa Comunicaciones business card — visual identity for telecommunications',
      'Logo de Alfa Comunicaciones — isotipo circular': 'Alfa Comunicaciones logo — circular symbol',
      'Tarjeta de presentación Alfa — variante v2': 'Alfa business card — variant v2',
      'Tarjeta de presentación Alfa — variante v3': 'Alfa business card — variant v3',
      'Post social Alfa Comunicaciones': 'Alfa Comunicaciones social post',
      // Hero card row values
      'Símbolo · Sistema · Brandbook': 'Symbol · System · Brandbook'
    }
  },

  'los-pollos-giros': {
    factCards: [
      { t: 'Premise', b: 'Character first. Typography and colour picked to support it — not to compete with it.' },
      { t: 'Reproduction', b: 'Built to print cheap — bags, t-shirts, boxes — and stay recognisable at first glance.' }
    ],
    showcaseLede: null,
    strings: {
      'Personaje principal': 'Lead character',
      'Personaje': 'Character',
      'Bolsa': 'Bag',
      'Caja': 'Box',
      'Camisa': 'Shirt',
      'identidad Los Pollos Giros': 'Los Pollos Giros identity',
      'ícono central de marca': 'central brand icon',
      'aplicación de empaque': 'packaging application',
      'empaque comercial': 'commercial packaging',
      'uniforme': 'uniform',
      // alts
      'Camiseta con personaje de Los Pollos Giros — identidad visual para comida rápida': 'T-shirt with Los Pollos Giros character — visual identity for fast food',
      'Cartel con personaje de Los Pollos Giros': 'Poster with Los Pollos Giros character',
      'Bolsa de Los Pollos Giros': 'Los Pollos Giros bag',
      'Caja de Los Pollos Giros': 'Los Pollos Giros box',
      'Camisa de Los Pollos Giros': 'Los Pollos Giros shirt'
    }
  },

  'neuromuscular-mid': {
    factCards: [
      { t: 'Visual concept', b: 'Pixelated heart as a bridge between clinical and close. A digital symbol that humanises a technical context.' },
      { t: 'Primary action', b: 'Booking. The full architecture is designed to reduce friction between intent and action.' }
    ],
    showcaseLede: null,
    strings: {
      'Sitio Neuromuscular MID': 'Neuromuscular MID site',
      'Interfaz — sitio activo': 'Interface — live site',
      'Interfaz': 'Interface',
      'landing clínica': 'clinical landing',
      'sitio activo neuromuscularmid.com': 'live site neuromuscularmid.com',
      'sitio activo': 'live site',
      // alts
      'Interfaz del sitio Neuromuscular MID — clínica de fisioterapia en Mérida': 'Neuromuscular MID site interface — physiotherapy clinic in Mérida',
      'Interfaz del sitio Neuromuscular MID': 'Neuromuscular MID site interface'
    }
  },

  'alma-gonzalez': {
    factCards: [
      { t: 'Premise', b: 'In real estate, trust weighs more than visual gesture. The identity was built to support the conversation with clients — not to overshadow it.' },
      { t: 'Tone', b: 'Sober, restrained, very clear. Built to live across presentations, sales materials and professional-services communication.' }
    ],
    showcaseLede: 'Palette and typography with sober criterion — restrained language built to sustain trust.',
    strings: {
      'Tarjeta principal': 'Main card',
      'Tarjeta': 'Card',
      'Variante': 'Variant',
      'Sistema': 'System',
      'identidad personal Alma González': 'Alma González personal identity',
      'identidad personal': 'personal identity',
      'sistema de tarjetas': 'card system',
      'aplicaciones de marca': 'brand applications',
      // alts
      'Identidad personal de Alma González — bienes raíces': 'Alma González personal identity — real estate',
      'Identidad personal de Alma González': 'Alma González personal identity',
      'Tarjeta de presentación Alma González': 'Alma González business card',
      'Variante de tarjeta Alma González': 'Alma González card variant',
      'Aplicación de marca Alma González': 'Alma González brand application',
      // Hero card row values
      'Identidad visual · Aplicaciones': 'Visual identity · Applications'
    }
  }
};

// =====================================================================
// UNIVERSAL replacements applied to every slug.
// Tuned with surrounding context to avoid mis-matching.
// =====================================================================

const UNIVERSAL = {
  // Skip + aria
  '>Ir al contenido<': '>Skip to content<',
  'aria-label="Volver al portafolio"': 'aria-label="Back to portfolio"',
  'aria-label="Navegación del caso"': 'aria-label="Case navigation"',
  'aria-label="Ir al inicio"': 'aria-label="Go to home"',
  'aria-label="Idioma"': 'aria-label="Language"',
  'aria-label="Abrir menú"': 'aria-label="Open menu"',
  'aria-label="Cerrar menú"': 'aria-label="Close menu"',
  'aria-label="Menú móvil"': 'aria-label="Mobile menu"',
  'aria-label="Índice del caso"': 'aria-label="Case index"',
  'aria-label="Abrir imagen: ': 'aria-label="Open image: ',

  // Hero metaBar
  '<div>Caso de estudio / ': '<div>Case study / ',
  '<div>Disciplina / ': '<div>Discipline / ',

  // HeroCard
  '<div class="heroCard__title">Ficha</div>': '<div class="heroCard__title">Brief</div>',

  // HeroCard row labels
  '<span>Cliente</span>': '<span>Client</span>',
  '<span>Año</span>': '<span>Year</span>',
  '<span>Rol</span>': '<span>Role</span>',
  '<span>Alcance</span>': '<span>Scope</span>',
  '<span>Sitio</span>': '<span>Site</span>',
  '<span>Estudio</span>': '<span>Studio</span>',
  '<span>Industria</span>': '<span>Industry</span>',
  '<span>Agencia</span>': '<span>Agency</span>',
  '<span>Tipo</span>': '<span>Type</span>',
  '<span>Sedes</span>': '<span>Locations</span>',
  '<span>Edición</span>': '<span>Edition</span>',

  // Snapshot arrow + aria
  '<div class="snapshot__arrow">Ver capítulo →</div>': '<div class="snapshot__arrow">View chapter →</div>',
  'aria-label="Ver capítulo ': 'aria-label="View chapter ',

  // Production list header
  '<h3>Inventario de piezas</h3>': '<h3>Deliverables</h3>',

  // Interlude
  '<b>Lo que sigue:</b>': '<b>Up next:</b>',

  // Outro
  '<div class="outro__meta">Continuar</div>': '<div class="outro__meta">Continue</div>',
  '<span class="outro__navKicker">← Proyecto anterior</span>': '<span class="outro__navKicker">← Previous project</span>',
  '<span class="outro__navKicker">Siguiente proyecto →</span>': '<span class="outro__navKicker">Next project →</span>',
  '<span class="outro__navTitle">Inicio del <em>portafolio</em></span>': '<span class="outro__navTitle">Portfolio <em>home</em></span>',
  '<span class="outro__navMeta">Primer caso de la serie</span>': '<span class="outro__navMeta">First case in the series</span>',
  '<span class="outro__navMeta">Último caso de la serie</span>': '<span class="outro__navMeta">Last case in the series</span>',
  '<span>Ver todos los trabajos</span>': '<span>View all projects</span>',
  '<span>Trabajemos juntos</span>': "<span>Let's work together</span>",
  '>Trabajemos juntos<': ">Let's work together<",
  '<span>Diseñado y construido en Mérida, MX.</span>': '<span>Designed and built in Mérida, MX.</span>',
  'Todos los derechos reservados': 'All rights reserved',

  // Drawer
  '<span class="drawer__num">Inicio</span> <span>Volver al portafolio</span>': '<span class="drawer__num">Home</span> <span>Back to portfolio</span>',
  'Mérida, Yucatán · Remoto': 'Mérida, Yucatán · Remote',

  // Footer
  '<div class="foot__tagline">Diseñador multidisciplinario<br/>Mérida, Yuc. · remoto</div>':
    '<div class="foot__tagline">Multidisciplinary designer<br/>Mérida, Yuc. · remote</div>',
  '<h4>Volver</h4>': '<h4>Back</h4>',
  '<h4>En línea</h4>': '<h4>Online</h4>',
  '<h4>Herramientas</h4>': '<h4>Tools</h4>',
  '<a class="foot__button" href="../../index.html">Inicio</a>': '<a class="foot__button" href="../../index.html">Home</a>',
  '<a class="foot__button" href="../../index.html#works">Ver trabajos</a>': '<a class="foot__button" href="../../index.html#works">View work</a>',
  '<a class="foot__button" href="../../index.html#contact">Contacto</a>': '<a class="foot__button" href="../../index.html#contact">Contact</a>',
  '<span>CapCut · HTML/CSS básico</span>': '<span>CapCut · basic HTML/CSS</span>'
};

// =====================================================================
// Helpers
// =====================================================================

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const stripHtml  = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function applyMap(html, map) {
  if (!map) return html;
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (k.length === 0) continue;
    html = html.split(k).join(map[k]);
  }
  return html;
}

// Apply per-slug strings to data-caption attribute values, accounting for
// HTML-encoded `&lt;b&gt;X&lt;/b&gt; — Y` pattern. Decodes, applies map, re-encodes.
function applyMapToDataCaptions(html, perSlugStrings) {
  if (!perSlugStrings) return html;
  return html.replace(/data-caption="([^"]*)"/g, (match, body) => {
    const decoded = body
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&');
    const translated = applyMap(decoded, perSlugStrings);
    const reEncoded = translated
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    return `data-caption="${reEncoded}"`;
  });
}

// ---------- Head -----------------------------------------------------

function setMeta(html, key, value, isProperty = true) {
  const attr = isProperty ? 'property' : 'name';
  const v = escapeAttr(value);
  const reCF = new RegExp(`<meta(\\s[^>]*?)?\\scontent="[^"]*"(\\s[^>]*?)?\\s${attr}="${key}"([^>]*?)\\/?>`, 'i');
  const rePF = new RegExp(`<meta(\\s[^>]*?)?\\s${attr}="${key}"(\\s[^>]*?)?\\scontent="[^"]*"([^>]*?)\\/?>`, 'i');
  if (reCF.test(html)) {
    return html.replace(reCF, (m) => m.replace(/content="[^"]*"/, `content="${v}"`));
  }
  if (rePF.test(html)) {
    return html.replace(rePF, (m) => m.replace(/content="[^"]*"/, `content="${v}"`));
  }
  return html;
}

function setLink(html, relValue, hrefValue, hreflangValue = null) {
  const v = escapeAttr(hrefValue);
  const hreflangAttr = hreflangValue ? `\\shreflang="${hreflangValue}"` : '';
  const candidates = [
    new RegExp(`<link(\\s[^>]*?)?\\shref="[^"]*"(\\s[^>]*?)?\\srel="${relValue}"${hreflangAttr}([^>]*?)\\/?>`, 'i'),
    new RegExp(`<link(\\s[^>]*?)?\\srel="${relValue}"${hreflangAttr}(\\s[^>]*?)?\\shref="[^"]*"([^>]*?)\\/?>`, 'i'),
    new RegExp(`<link(\\s[^>]*?)?\\shref="[^"]*"${hreflangAttr}(\\s[^>]*?)?\\srel="${relValue}"([^>]*?)\\/?>`, 'i'),
  ];
  for (const re of candidates) {
    if (re.test(html)) {
      return html.replace(re, (m) => m.replace(/href="[^"]*"/, `href="${v}"`));
    }
  }
  return html;
}

function setTitle(html, value) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeText(value)}</title>`);
}

function updateJsonLd(html, { name, headline, description, url }) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
    (match, body) => {
      let data;
      try { data = JSON.parse(body); }
      catch { return match; }
      if (data && data['@type'] === 'CreativeWork') {
        if (name)        data.name        = name;
        if (headline)    data.headline    = headline;
        if (description) data.description = description;
        if (url)         data.url         = url;
        data.inLanguage = 'en';
      }
      return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
    }
  );
}

function rewritePaths(html) {
  return html
    .replace(/\bhref="\.\.\//g,   'href="../../')
    .replace(/\bsrc="\.\.\//g,    'src="../../')
    .replace(/\bsrcset="\.\.\//g, 'srcset="../../')
    .replace(/(,\s*)\.\.\//g, '$1../../');
}

// ---------- Body block builders --------------------------------------

function replaceNavMenu(html, chaptersEN) {
  const items = [
    { href: '#overview', label: 'Overview' },
    ...chaptersEN.map(ch => ({ href: ch.anchor || '#', label: ch.label }))
  ];
  return html.replace(
    /<div class="nav__menu">[\s\S]*?<\/div>/,
    () => {
      const inner = items.map(i => `<a href="${i.href}">${i.label}</a>`).join('\n');
      return `<div class="nav__menu">\n${inner}\n</div>`;
    }
  );
}

function replaceDrawerMenu(html, chaptersEN) {
  const head = `<a href="#overview"><span class="drawer__num">§ 01</span> <span>Overview</span></a>`;
  const middle = chaptersEN.map(ch => {
    const num = ch.num || '';
    const anchor = ch.anchor || '#';
    const label = ch.label || '';
    return `<a href="${anchor}"><span class="drawer__num">${num}</span> <span>${label}</span></a>`;
  }).join('\n');
  const tail = `<a href="../../index.html#works"><span class="drawer__num">Home</span> <span>Back to portfolio</span></a>`;
  return html.replace(
    /<nav aria-label="(?:Navegación del caso|Case navigation)" class="drawer__menu">[\s\S]*?<\/nav>/,
    () => `<nav aria-label="Case navigation" class="drawer__menu">\n${head}\n${middle}\n${tail}\n</nav>`
  );
}

function replaceSectionHeads(html, chaptersEN) {
  const idToTitle = new Map();
  for (const ch of chaptersEN) {
    if (!ch.anchor) continue;
    const id = ch.anchor.replace(/^#/, '');
    idToTitle.set(id, ch.title || '');
  }
  return html.replace(
    /<section class="sectionHead reveal" id="([^"]+)">\s*<h2 class="sectionHead__title">[\s\S]*?<\/h2>\s*<\/section>/g,
    (match, id) => {
      const title = idToTitle.get(id);
      if (!title) return match;
      return `<section class="sectionHead reveal" id="${id}"><h2 class="sectionHead__title">${title}</h2></section>`;
    }
  );
}

function replaceDisplayProse(html, chaptersEN) {
  const first = chaptersEN[0];
  if (!first || !first.lede) return html;
  let replaced = false;
  return html.replace(
    /<div class="displayProse">[\s\S]*?<\/div>/,
    (m) => {
      if (replaced) return m;
      replaced = true;
      return `<div class="displayProse">${first.lede}</div>`;
    }
  );
}

function replaceShowcaseProse(html, chaptersEN, fallback) {
  const second = chaptersEN[1];
  const text = (second && second.lede) || fallback;
  if (!text) return html;
  return html.replace(
    /<div class="prose prose--tight">\s*<p>[\s\S]*?<\/p>\s*<\/div>/,
    `<div class="prose prose--tight"><p>${text}</p></div>`
  );
}

function replaceInterlude(html, interludeEN) {
  if (!interludeEN) return html;
  const text = interludeEN.text || '';
  const sigKicker = interludeEN.sigKicker || '';
  const sigContext = interludeEN.sigContext || '';
  const hint = interludeEN.hint || '';
  return html.replace(
    /<section class="caseInterlude reveal">[\s\S]*?<\/section>/,
    () => (
      `<section class="caseInterlude reveal">\n` +
      `<p class="caseInterlude__text">${text}</p>\n` +
      `<div class="caseInterlude__sig"><span>${sigKicker}</span><span>${sigContext}</span></div>\n` +
      `<p class="caseInterlude__hint"><b>Up next:</b> ${hint}</p>\n` +
      `</section>`
    )
  );
}

// Update production stats: rebuilds each stat block fresh from JSON.
// Handles both numeric (data-counter) and word values, plus aria-label on numeric.
function replaceProductionStats(html, statsEN) {
  if (!Array.isArray(statsEN)) return html;
  let i = 0;
  return html.replace(
    /<div class="production__stat">\s*(<div[^>]*production__num[^>]*>[\s\S]*?<\/div>)\s*(<div class="production__label">[\s\S]*?<\/div>)\s*<\/div>/g,
    (match, numDiv) => {
      const stat = statsEN[i++];
      if (!stat) return match;
      const isWord = /production__num--word/.test(numDiv);
      const ariaLabel = `${stat.value || ''} ${stat.label || ''}`.replace(/\s+/g, ' ').trim();
      let newNumDiv;
      if (isWord) {
        newNumDiv = `<div class="production__num production__num--word">${stat.value || ''}</div>`;
      } else {
        const dcMatch = numDiv.match(/data-counter="([^"]*)"/);
        const counterVal = dcMatch ? dcMatch[1] : (stat.value || '');
        newNumDiv = `<div aria-label="${ariaLabel}" class="production__num" data-counter="${counterVal}">${counterVal}</div>`;
      }
      const newLabelDiv = `<div class="production__label">${stat.label || ''}</div>`;
      return `<div class="production__stat">${newNumDiv}${newLabelDiv}</div>`;
    }
  );
}

function replaceProductionList(html, deliverablesEN) {
  if (!Array.isArray(deliverablesEN)) return html;
  return html.replace(
    /<div class="production__list">[\s\S]*?<\/div>/,
    () => {
      const lis = deliverablesEN.map(d =>
        `<li><b>${d.title || ''}</b><span>${d.detail || ''}</span></li>`
      ).join('\n');
      return `<div class="production__list">\n<h3>Deliverables</h3>\n<ul>\n${lis}\n</ul>\n</div>`;
    }
  );
}

function replaceProofBand(html, proofTextEN) {
  if (!proofTextEN) return html;
  return html.replace(
    /<section class="proofBand reveal">[\s\S]*?<\/section>/,
    `<section class="proofBand reveal"><p class="proofBand__scope">${proofTextEN}</p></section>`
  );
}

function replaceCredits(html, creditsEN) {
  if (!Array.isArray(creditsEN)) return html;
  // Anchor on closing </section> so lazy match extends past nested <div class="credits__row"> children.
  return html.replace(
    /<div class="credits__list" data-case-credits="">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/,
    (_match, tail) => {
      const rows = creditsEN.map(r =>
        `<div class="credits__row"><span>${r.label || ''}</span><b>${r.value || ''}</b></div>`
      ).join('\n');
      return `<div class="credits__list" data-case-credits="">\n${rows}\n</div>${tail}`;
    }
  );
}

function replaceSnapshot(html, chaptersEN) {
  if (!Array.isArray(chaptersEN)) return html;
  return html.replace(
    /<nav aria-label="(?:Índice del caso|Case index)" class="snapshot snapshot--index reveal" data-case-chapters="">[\s\S]*?<\/nav>/,
    () => {
      const items = chaptersEN.map(ch => {
        const anchor = ch.anchor || '#';
        return (
          `<a class="snapshot__item" href="${anchor}">` +
          `<div class="snapshot__num">${ch.num || ''}</div>` +
          `<div class="snapshot__value">${ch.label || ''}</div>` +
          `<p class="snapshot__small">${ch.note || ''}</p>` +
          `<div class="snapshot__arrow">View chapter →</div>` +
          `</a>`
        );
      }).join('\n');
      return `<nav aria-label="Case index" class="snapshot snapshot--index reveal" data-case-chapters="">\n${items}\n</nav>`;
    }
  );
}

function replaceHeroEyebrow(html, eyebrowEN) {
  if (!eyebrowEN) return html;
  return html.replace(
    /<div class="case-hero__eyebrow" data-case-field="hero\.eyebrow">[\s\S]*?<\/div>/,
    `<div class="case-hero__eyebrow" data-case-field="hero.eyebrow">${eyebrowEN}</div>`
  );
}

function replaceHeroTitle(html, titleEN) {
  if (!titleEN) return html;
  return html.replace(
    /<h1 class="case-hero__title" data-case-field="hero\.title">[\s\S]*?<\/h1>/,
    `<h1 class="case-hero__title" data-case-field="hero.title">${titleEN}</h1>`
  );
}

function replaceHeroManifesto(html, manifestoEN) {
  if (!manifestoEN) return html;
  return html.replace(
    /<p class="case-hero__manifesto" data-case-field="hero\.manifesto">[\s\S]*?<\/p>/,
    `<p class="case-hero__manifesto" data-case-field="hero.manifesto">${manifestoEN}</p>`
  );
}

function replaceHeroDiscipline(html, disciplineEN) {
  if (!disciplineEN) return html;
  return html.replace(
    /<span data-case-field="hero\.discipline">[\s\S]*?<\/span>/,
    `<span data-case-field="hero.discipline">${disciplineEN}</span>`
  );
}

function replaceHeroKeydata(html, keydataEN) {
  if (!Array.isArray(keydataEN)) return html;
  return html.replace(
    /<div class="case-hero__keydata">[\s\S]*?<\/div>/,
    () => {
      const spans = keydataEN.map(s => `<span>${s}</span>`).join('\n');
      return `<div class="case-hero__keydata">\n${spans}\n</div>`;
    }
  );
}

function replaceHeroCardRows(html, en) {
  const role = en.hero?.role;
  const scope = en.hero?.scope;
  if (role) {
    html = html.replace(
      /<div class="heroCard__row"><span>(?:Role|Rol)<\/span><b(\s[^>]*)?>(?:[\s\S]*?)<\/b><\/div>/,
      (m, attrs) => {
        const a = (attrs || '').trim();
        const dcf = a.includes('data-case-field=') ? a : 'data-case-field="hero.role"';
        return `<div class="heroCard__row"><span>Role</span><b ${dcf}>${role}</b></div>`;
      }
    );
  }
  if (scope) {
    html = html.replace(
      /<div class="heroCard__row"><span>(?:Scope|Alcance)<\/span><b(\s[^>]*)?>(?:[\s\S]*?)<\/b><\/div>/,
      (m, attrs) => {
        const a = (attrs || '').trim();
        const dcf = a.includes('data-case-field=') ? a : 'data-case-field="hero.scope"';
        return `<div class="heroCard__row"><span>Scope</span><b ${dcf}>${scope}</b></div>`;
      }
    );
  }
  return html;
}

// Tolerates whitespace/newlines between tags inside the factCard.
function replaceFactCards(html, factCardsEN) {
  if (!Array.isArray(factCardsEN) || factCardsEN.length === 0) return html;
  let i = 0;
  return html.replace(
    /<div class="factCard">\s*<div class="factCard__title">([\s\S]*?)<\/div>\s*<div class="factCard__body prose prose--small">([\s\S]*?)<\/div>\s*<\/div>/g,
    (match) => {
      const fc = factCardsEN[i++];
      if (!fc) return match;
      return `<div class="factCard"><div class="factCard__title">${fc.t}</div><div class="factCard__body prose prose--small">${fc.b}</div></div>`;
    }
  );
}

function replaceOutroNav(html, prevEN, nextEN) {
  if (prevEN === null) {
    html = html.replace(
      /<a aria-disabled="true" class="outro__navItem outro__navItem--disabled" data-case-prev="" href="\.\.\/\.\.\/index\.html#works" tabindex="-1">[\s\S]*?<\/a>/,
      () => (
        `<a aria-disabled="true" class="outro__navItem outro__navItem--disabled" data-case-prev="" href="../../index.html#works" tabindex="-1">` +
        `<span class="outro__navKicker">← Previous project</span>` +
        `<span class="outro__navTitle">Portfolio <em>home</em></span>` +
        `<span class="outro__navMeta">First case in the series</span>` +
        `</a>`
      )
    );
  } else if (prevEN) {
    html = html.replace(
      /<a class="outro__navItem" data-case-prev="" href="[^"]+">[\s\S]*?<\/a>/,
      () => (
        `<a class="outro__navItem" data-case-prev="" href="${prevEN.slug}.html">` +
        `<span class="outro__navKicker">← Previous project</span>` +
        `<span class="outro__navTitle">${prevEN.title}</span>` +
        `<span class="outro__navMeta">${prevEN.meta}</span>` +
        `</a>`
      )
    );
  }
  if (nextEN === null) {
    html = html.replace(
      /<a aria-disabled="true" class="outro__navItem outro__navItem--disabled" data-case-next="" href="\.\.\/\.\.\/index\.html#works" tabindex="-1">[\s\S]*?<\/a>/,
      () => (
        `<a aria-disabled="true" class="outro__navItem outro__navItem--disabled" data-case-next="" href="../../index.html#works" tabindex="-1">` +
        `<span class="outro__navKicker">Next project →</span>` +
        `<span class="outro__navTitle">Portfolio <em>home</em></span>` +
        `<span class="outro__navMeta">Last case in the series</span>` +
        `</a>`
      )
    );
  } else if (nextEN) {
    html = html.replace(
      /<a class="outro__navItem" data-case-next="" href="[^"]+">[\s\S]*?<\/a>/,
      () => (
        `<a class="outro__navItem" data-case-next="" href="${nextEN.slug}.html">` +
        `<span class="outro__navKicker">Next project →</span>` +
        `<span class="outro__navTitle">${nextEN.title}</span>` +
        `<span class="outro__navMeta">${nextEN.meta}</span>` +
        `</a>`
      )
    );
  }
  return html;
}

function pickEn(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.en || value.es || '';
  return '';
}

// =====================================================================
// Build one mirror
// =====================================================================

async function buildOne(slug) {
  const jsonPath = path.join(ROOT, 'content', 'cases', `${slug}.json`);
  const srcPath  = path.join(ROOT, 'works', `${slug}.html`);
  const outPath  = path.join(ROOT, 'en', 'works', `${slug}.html`);

  const json = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  let html   = await fs.readFile(srcPath, 'utf8');

  const en = json.i18n?.en || {};
  const meta = json.meta || {};
  const seo = en.seo || {};
  const seoTitle = seo.title || `${slug} — Case study · Julio Morcillo`;
  const seoDesc  = seo.description || '';
  const heroTitlePlain = stripHtml(en.hero?.title || slug);

  const enUrl = `https://juliomorcillo.com/en/works/${slug}.html`;
  const esUrl = `https://juliomorcillo.com/works/${slug}.html`;
  const imageAlt = seoDesc || stripHtml(en.hero?.caption || '');

  // ---- Head ----
  html = html.replace(/<html\s+lang="es">/i, '<html lang="en">');
  html = setTitle(html, seoTitle);
  html = setMeta(html, 'description', seoDesc, false);
  html = setMeta(html, 'og:title',       seoTitle, true);
  html = setMeta(html, 'og:description', seoDesc,  true);
  html = setMeta(html, 'og:url',         enUrl,    true);
  html = setMeta(html, 'og:locale',      'en_US',  true);
  html = setMeta(html, 'og:locale:alternate', 'es_MX', true);
  if (imageAlt) html = setMeta(html, 'og:image:alt', imageAlt, true);
  html = setMeta(html, 'twitter:title',       seoTitle, false);
  html = setMeta(html, 'twitter:description', seoDesc,  false);
  if (imageAlt) html = setMeta(html, 'twitter:image:alt', imageAlt, false);
  html = setLink(html, 'canonical', enUrl);
  html = setLink(html, 'alternate', esUrl, 'es-MX');
  html = setLink(html, 'alternate', enUrl, 'en');
  html = setLink(html, 'alternate', esUrl, 'x-default');
  html = updateJsonLd(html, {
    name: `${heroTitlePlain} — Case study`,
    headline: `${heroTitlePlain} — Case study`,
    description: seoDesc,
    url: enUrl
  });
  html = rewritePaths(html);

  // ---- Body: JSON-driven blocks ----
  const chapters = Array.isArray(en.chapters) ? en.chapters : [];
  const perSlug = PER_SLUG[slug] || { factCards: [], showcaseLede: null, strings: {} };

  html = replaceNavMenu(html, chapters);
  html = replaceDrawerMenu(html, chapters);
  html = replaceSnapshot(html, chapters);
  html = replaceSectionHeads(html, chapters);
  html = replaceDisplayProse(html, chapters);
  html = replaceShowcaseProse(html, chapters, perSlug.showcaseLede);
  html = replaceInterlude(html, en.interlude);
  html = replaceProductionStats(html, en.production?.stats);
  html = replaceProductionList(html, en.production?.deliverables);
  html = replaceProofBand(html, en.proofText);
  html = replaceCredits(html, en.credits);

  html = replaceHeroEyebrow(html, en.hero?.eyebrow);
  html = replaceHeroTitle(html, en.hero?.title);
  html = replaceHeroManifesto(html, en.hero?.manifesto);
  html = replaceHeroDiscipline(html, en.hero?.discipline);
  html = replaceHeroKeydata(html, en.hero?.keydata);
  html = replaceHeroCardRows(html, en);
  html = replaceFactCards(html, perSlug.factCards);

  const prevPayload = json.prev
    ? { slug: json.prev.slug, title: pickEn(json.prev.title), meta: pickEn(json.prev.meta) }
    : null;
  const nextPayload = json.next
    ? { slug: json.next.slug, title: pickEn(json.next.title), meta: pickEn(json.next.meta) }
    : null;
  html = replaceOutroNav(html, prevPayload, nextPayload);

  // ---- Universal + per-slug strings ----
  html = applyMap(html, UNIVERSAL);
  html = applyMap(html, perSlug.strings || {});
  // data-caption attrs need decode→apply→encode pass
  html = applyMapToDataCaptions(html, perSlug.strings || {});

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html, 'utf8');
  return outPath;
}

// =====================================================================
// Run
// =====================================================================

const results = [];
for (const slug of SLUGS) {
  try {
    const out = await buildOne(slug);
    results.push({ slug, out, ok: true });
  } catch (err) {
    results.push({ slug, ok: false, err: String(err && err.stack || err) });
  }
}
const ok = results.filter(r => r.ok).length;
const fail = results.filter(r => !r.ok);
console.log(`Wrote ${ok}/${SLUGS.length} EN mirrors.`);
for (const r of results) {
  console.log(r.ok ? `  ✓ ${r.slug} → ${path.relative(ROOT, r.out)}` : `  ✗ ${r.slug}: ${r.err}`);
}
if (fail.length) process.exit(1);
