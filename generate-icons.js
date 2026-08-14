// Genera los iconos PNG del juego sin dependencias externas.
// Uso: node generate-icons.js
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

// ---- Dibujo del icono (fondo, palas, pelota y línea central) ----
function drawIcon(size) {
  const rgba = Buffer.alloc(size * size * 4);

  function set(x, y, r, g, b, a) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    rgba[i] = r;
    rgba[i + 1] = g;
    rgba[i + 2] = b;
    rgba[i + 3] = a;
  }

  function fillRect(x0, y0, w, h, color) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        set(x, y, color[0], color[1], color[2], color[3]);
      }
    }
  }

  const bg = [10, 10, 15, 255];
  const white = [245, 245, 245, 255];
  const green = [124, 252, 0, 255];
  const line = [70, 70, 90, 255];

  // Fondo
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      set(x, y, bg[0], bg[1], bg[2], bg[3]);
    }
  }

  // Palas (mantenidas dentro de la zona segura para iconos enmascarables)
  const paddleW = Math.max(2, Math.round(size * 0.05));
  const paddleH = Math.round(size * 0.44);
  const top = Math.round(size * 0.28);
  fillRect(Math.round(size * 0.18), top, paddleW, paddleH, white);
  fillRect(Math.round(size * 0.82) - paddleW, top, paddleW, paddleH, white);

  // Línea central punteada
  const cx = Math.floor(size / 2);
  const dashH = Math.round(size * 0.03);
  const gap = Math.round(size * 0.06);
  for (let y = Math.round(size * 0.1); y < size * 0.9; y += dashH + gap) {
    fillRect(cx - 1, y, 2, dashH, line);
  }

  // Pelota
  const ball = Math.max(2, Math.round(size * 0.06));
  const bx = Math.floor(size / 2) - Math.floor(ball / 2);
  const by = Math.floor(size / 2) - Math.floor(ball / 2);
  fillRect(bx, by, ball, ball, green);

  return rgba;
}

const icons = {
  'icon-512.png': 512,
  'icon-192.png': 192,
  'icon-180.png': 180
};

for (const [name, size] of Object.entries(icons)) {
  const png = encodePng(size, drawIcon(size));
  fs.writeFileSync(path.join(__dirname, name), png);
  console.log('Creado', name, '(' + png.length + ' bytes)');
}
