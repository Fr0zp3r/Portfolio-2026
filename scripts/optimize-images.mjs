import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ORIGINALS = join(__dirname, '..', 'assets', 'images', '_originals');
const OUTPUT = join(__dirname, '..', 'assets', 'images');
const BASE_WIDTH = 1200;
const QUALITY = 82;

const SUPPORTED = new Set(['.png', '.jpg', '.jpeg', '.webp']);

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) {
    console.log(`SKIP  ${file} (unsupported format)`);
    return;
  }

  const name = basename(file, ext);
  const input = join(ORIGINALS, file);
  const meta = await sharp(input).metadata();
  const { width: origW, height: origH } = meta;

  const baseW = Math.min(origW, BASE_WIDTH);
  const baseH = Math.round(origH * (baseW / origW));
  const x2W = Math.min(origW, BASE_WIDTH * 2);
  const x2H = Math.round(origH * (x2W / origW));

  const targets = [
    { out: join(OUTPUT, `${name}.jpg`),     w: baseW, h: baseH, format: 'jpeg' },
    { out: join(OUTPUT, `${name}.webp`),    w: baseW, h: baseH, format: 'webp' },
    { out: join(OUTPUT, `${name}@2x.webp`), w: x2W,  h: x2H,   format: 'webp' },
  ];

  for (const { out, w, h, format } of targets) {
    try {
      const outStat = await stat(out).catch(() => null);
      if (outStat) {
        console.log(`SKIP  ${basename(out)} (exists)`);
        continue;
      }

      const img = sharp(input).resize(w, h, { fit: 'inside', withoutEnlargement: true });

      if (format === 'jpeg') {
        await img.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(out);
      } else {
        await img.webp({ quality: QUALITY }).toFile(out);
      }

      const { size: inSize } = await stat(input);
      const { size: outSize } = await stat(out);
      const savings = (((inSize - outSize) / inSize) * 100).toFixed(0);
      console.log(`OK    ${basename(out)} — ${w}×${h} — ${(outSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
    } catch (err) {
      console.error(`ERROR ${basename(out)}: ${err.message}`);
    }
  }
}

const files = await readdir(ORIGINALS).catch(() => {
  console.error(`ERROR: _originals/ not found at ${ORIGINALS}`);
  process.exit(1);
});

if (!files.length) {
  console.log('No files in _originals/. See README below.\n');
  console.log('Place originals in assets/images/_originals/ with these names:');
  console.log('  consentido-hero.png   → Consentidohero.png');
  console.log('  amxitech-hero.jpg     → amxitechpaginascreenshort(1).jpg');
  console.log('  visummit-hero.png     → mockup gafete visummit.png');
  console.log('  pollos-hero.png       → mockup pollos camisa.png');
  console.log('  alfa-hero.png         → alfa_business_card_05-03-25_mockup_v3.png');
  process.exit(0);
}

console.log(`Processing ${files.length} file(s) from _originals/...\n`);
for (const file of files) {
  await processFile(file);
}
console.log('\nDone.');
