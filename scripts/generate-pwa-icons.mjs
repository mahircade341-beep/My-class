// Generates PWA icons with zero dependencies (pure Node PNG encoder).
// Run:  node scripts/generate-pwa-icons.mjs   (outputs to public/)
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });

// ---------- minimal PNG encoder ----------
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

// ---------- drawing helpers (all geometry in 0..1 normalized space) ----------
const lerp = (a, b, t) => a + (b - a) * t;

function inRoundedRect(x, y, cx, cy, w, h, r) {
  const dx = Math.abs(x - cx) - (w / 2 - r);
  const dy = Math.abs(y - cy) - (h / 2 - r);
  const ax = Math.max(dx, 0);
  const ay = Math.max(dy, 0);
  return Math.hypot(ax, ay) <= r || (dx <= 0 && dy <= 0);
}

function inDiamond(x, y, cx, cy, rx, ry) {
  return Math.abs(x - cx) / rx + Math.abs(y - cy) / ry <= 1;
}

function inTriangle(x, y, ax, ay, bx, by, cx, cy) {
  const sign = (p1, p2, p3) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const p = { x, y };
  const d1 = sign(p, { x: ax, y: ay }, { x: bx, y: by });
  const d2 = sign(p, { x: bx, y: by }, { x: cx, y: cy });
  const d3 = sign(p, { x: cx, y: cy }, { x: ax, y: ay });
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}

function inCircle(x, y, cx, cy, r) {
  return Math.hypot(x - cx, y - cy) <= r;
}

function inCap(x, y) {
  // Board: wide diamond slightly above center
  if (inDiamond(x, y, 0.5, 0.44, 0.3, 0.12)) return "board";
  // Button on top of the board
  if (inCircle(x, y, 0.5, 0.34, 0.028)) return "button";
  // Head: triangle below the board
  if (inTriangle(x, y, 0.42, 0.56, 0.58, 0.56, 0.5, 0.76)) return "head";
  // Tassel: line from button out to the right + end blob
  const tx = 0.5, ty = 0.34;
  const ex = 0.8, ey = 0.42;
  const seg = Math.abs((ey - ty) * x - (ex - tx) * y + ex * ty - ey * tx) / Math.hypot(ex - tx, ey - ty);
  const along = ((x - tx) * (ex - tx) + (y - ty) * (ey - ty)) / ((ex - tx) ** 2 + (ey - ty) ** 2);
  if (along >= -0.02 && along <= 1.02 && seg <= 0.014) return "tassel";
  if (inCircle(x, y, ex, ey, 0.03)) return "tassel";
  return null;
}

// Theme colors
const C = {
  bgTop: [18, 18, 26],      // cs-800
  bgBottom: [10, 10, 15],   // cs-900
  accent: [99, 102, 241],   // indigo
  accentLight: [129, 140, 248],
  white: [232, 232, 240],   // cs-100
  head: [26, 26, 37],       // cs-700
};

function drawIcon(size, maskable) {
  const buf = Buffer.alloc(size * size * 4);
  const SS = 3; // supersampling
  const safe = maskable ? 0.36 : 0.0; // maskable safe-zone padding (icon scales down)

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (px + (sx + 0.5) / SS) / size;
          const y = (py + (sy + 0.5) / SS) / size;

          // Background: rounded square with vertical gradient
          let cr, cg, cb, ca = 1;
          if (inRoundedRect(x, y, 0.5, 0.5, 1, 1, maskable ? 0.22 : 0.22)) {
            const t = y;
            cr = lerp(C.bgTop[0], C.bgBottom[0], t);
            cg = lerp(C.bgTop[1], C.bgBottom[1], t);
            cb = lerp(C.bgTop[2], C.bgBottom[2], t);
          } else {
            cr = cg = cb = 0;
            ca = 0;
          }

          // Icon glyph (scaled into safe zone when maskable)
          const cx = 0.5, cy = 0.5, s = maskable ? 0.62 : 1;
          const gx = cx + (x - cx) / s;
          const gy = cy + (y - cy) / s;
          const part = inCap(gx, gy);
          if (part) {
            if (part === "board") {
              const t = Math.max(0, Math.min(1, (gy - 0.3) / 0.3));
              cr = lerp(C.accentLight[0], C.accent[0], t);
              cg = lerp(C.accentLight[1], C.accent[1], t);
              cb = lerp(C.accentLight[2], C.accent[2], t);
            } else if (part === "button") {
              [cr, cg, cb] = C.white;
            } else if (part === "head") {
              [cr, cg, cb] = C.head;
              // subtle top highlight on head
              if (gy < 0.6) { cr += 18; cg += 18; cb += 28; }
            } else {
              [cr, cg, cb] = C.accentLight;
            }
          }

          r += cr * ca; g += cg * ca; b += cb * ca; a += ca;
        }
      }
      const i = (py * size + px) * 4;
      buf[i] = Math.round(r / (SS * SS));
      buf[i + 1] = Math.round(g / (SS * SS));
      buf[i + 2] = Math.round(b / (SS * SS));
      buf[i + 3] = Math.round((a / (SS * SS)) * 255);
    }
  }
  return encodePNG(size, size, buf);
}

const jobs = [
  ["pwa-192x192.png", 192, false],
  ["pwa-512x512.png", 512, false],
  ["pwa-maskable-512x512.png", 512, true],
  ["apple-touch-icon.png", 180, false],
];

for (const [file, size, maskable] of jobs) {
  const png = drawIcon(size, maskable);
  const path = join(outDir, file);
  writeFileSync(path, png);
  console.log(`✓ ${file} (${size}x${size}${maskable ? ", maskable" : ""}) ${png.length} bytes`);
}
console.log("Done.");
