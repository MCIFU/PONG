// Genera los iconos PNG del juego sin dependencias externas.
// Uso (desde la raíz del proyecto): node tools/generate-icons.js
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ---- Codificador PNG mínimo (RGBA, 8 bits) ----
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(size, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // profundidad de bits
  ihdr[9] = 6;  // tipo de color: RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filtro "none" por fila
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// ---- Dibujo del icono: fondo con gradiente, palas, pelota con estela y línea central ----
function drawIcon(size) {
  const rgba = Buffer.alloc(size * size * 4);

  // Mezcla "source-over" para poder pintar brillos suaves sobre el fondo.
  function blend(x, y, r, g, b, a) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    const sa = a / 255;
    const da = rgba[i + 3] / 255;
    const oa = sa + da * (1 - sa);
    if (oa <= 0) return;
    rgba[i] = Math.round((r * sa + rgba[i] * da * (1 - sa)) / oa);
    rgba[i + 1] = Math.round((g * sa + rgba[i + 1] * da * (1 - sa)) / oa);
    rgba[i + 2] = Math.round((b * sa + rgba[i + 2] * da * (1 - sa)) / oa);
    rgba[i + 3] = Math.round(oa * 255);
  }

  function fillRect(x0, y0, w, h, color, a = 255) {
    for (let y = Math.max(0, y0); y < Math.min(size, y0 + h); y++) {
      for (let x = Math.max(0, x0); x < Math.min(size, x0 + w); x++) {
        blend(x, y, color[0], color[1], color[2], a);
      }
    }
  }

  // Brillo radial suave con caída cuadrática (para la pelota y las palas).
  function radialGlow(cx, cy, radius, color, maxA) {
    const r2 = radius * radius;
    const x0 = Math.max(0, Math.floor(cx - radius));
    const x1 = Math.min(size - 1, Math.ceil(cx + radius));
    const y0 = Math.max(0, Math.floor(cy - radius));
    const y1 = Math.min(size - 1, Math.ceil(cy + radius));
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 > r2) continue;
        const t = 1 - Math.sqrt(d2) / radius;
        blend(x, y, color[0], color[1], color[2], Math.round(maxA * t * t));
      }
    }
  }

  const bgInner = [20, 20, 43];   // #14142b
  const bgOuter = [5, 5, 8];      // #050508
  const white = [245, 245, 245];  // palas
  const green = [124, 252, 0];    // acento del tema (#7cfc00)
  const line = [70, 70, 90];      // línea central punteada

  // 1. Fondo: gradiente radial como el del juego (centro ligeramente arriba).
  const gx = size * 0.5;
  const gy = size * 0.42;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - gx;
      const dy = y - gy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const t = Math.min(1, d / (size * 0.75));
      const r = Math.round(bgInner[0] + (bgOuter[0] - bgInner[0]) * t);
      const g = Math.round(bgInner[1] + (bgOuter[1] - bgInner[1]) * t);
      const b = Math.round(bgInner[2] + (bgOuter[2] - bgInner[2]) * t);
      const i = (y * size + x) * 4;
      rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = 255;
    }
  }

  // 2. Línea central punteada (detrás de la pelota y las palas).
  const cx = Math.floor(size / 2);
  const lineW = Math.max(1, Math.round(size * 0.004));
  const dashH = Math.round(size * 0.035);
  const gap = Math.round(size * 0.05);
  for (let y = Math.round(size * 0.12); y < size * 0.88; y += dashH + gap) {
    fillRect(cx - Math.floor(lineW / 2), y, lineW, dashH, line);
  }

  // 3. Palas (dentro de la zona segura para iconos enmascarables).
  const paddleW = Math.max(3, Math.round(size * 0.05));
  const paddleH = Math.round(size * 0.42);
  const top = Math.round(size * 0.29);
  const leftX = Math.round(size * 0.19);
  const rightX = Math.round(size * 0.81) - paddleW;

  // Brillo suave tras las palas para que resalten sobre el fondo oscuro.
  radialGlow(leftX + paddleW / 2, top + paddleH / 2, size * 0.14, white, 55);
  radialGlow(rightX + paddleW / 2, top + paddleH / 2, size * 0.14, white, 55);

  // 4. Pelota con estela: la bola va hacia arriba-derecha, dejando un rastro verde.
  const ball = Math.max(3, Math.round(size * 0.07));
  const bx = Math.floor(size / 2) - Math.floor(ball / 2);
  const by = Math.floor(size / 2) - Math.floor(ball / 2);

  // Estela diagonal (dos cuadros desvanecidos abajo-izquierda).
  fillRect(bx - ball, by + ball, ball, ball, green, 80);
  fillRect(bx - 2 * ball, by + 2 * ball, ball, ball, green, 40);

  // Brillo de la pelota.
  radialGlow(size / 2, size / 2, size * 0.16, green, 200);

  // 5. Palas sólidas encima de su brillo.
  fillRect(leftX, top, paddleW, paddleH, white);
  fillRect(rightX, top, paddleW, paddleH, white);

  // 6. Pelota sólida encima de su brillo.
  fillRect(bx, by, ball, ball, green);

  return rgba;
}

// Redondea las esquinas dejándolas transparentes (versión iOS / apple-touch-icon).
// El radio se expresa como fracción del tamaño; ~0.22 se acerca a la esquina
// redondeada que aplica iOS a sus iconos.
function roundCorners(size, rgba, radiusRatio) {
  const r = Math.max(1, Math.round(size * radiusRatio));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Distancia al rectángulo interior (truco del "rounded rect SDF"):
      // si el píxel queda fuera del arco de la esquina, se hace transparente.
      const cx = Math.min(Math.max(x, r), size - 1 - r);
      const cy = Math.min(Math.max(y, r), size - 1 - r);
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy > r * r) {
        const i = (y * size + x) * 4;
        rgba[i] = rgba[i + 1] = rgba[i + 2] = rgba[i + 3] = 0;
      }
    }
  }
}

// Los iconos se escriben en ../assets/icons/ (relativo a la carpeta tools/).
const ICONS_DIR = path.join(__dirname, '..', 'assets', 'icons');

const icons = {
  'icon-1024.png': 1024,
  'icon-512.png': 512,
  'icon-192.png': 192,
  'icon-180.png': 180,
  'icon-96.png': 96,
  'icon-32.png': 32
};

for (const [name, size] of Object.entries(icons)) {
  const png = encodePng(size, drawIcon(size));
  fs.writeFileSync(path.join(ICONS_DIR, name), png);
  console.log('Creado', name, '(' + png.length + ' bytes)');
}

// Iconos con esquinas redondeadas (iOS / apple-touch-icon y tiendas de apps).
// 152 y 167 son los tamaños de iPad (152 = iPad/iPad mini, 167 = iPad Pro).
for (const size of [152, 167, 180, 512]) {
  const rgba = drawIcon(size);
  roundCorners(size, rgba, 0.22);
  const png = encodePng(size, rgba);
  const name = 'icon-' + size + '-ios.png';
  fs.writeFileSync(path.join(ICONS_DIR, name), png);
  console.log('Creado', name, '(' + png.length + ' bytes)');
}
