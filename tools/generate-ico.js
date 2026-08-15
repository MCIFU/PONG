// Genera los iconos .ico de Windows para la app de escritorio (Electron).
// Uso (desde la raíz del proyecto): node tools/generate-ico.js
//
// Produce dos variantes:
//   - build/icon.ico          (cuadrado, clásico)
//   - build/icon-rounded.ico  (esquinas redondeadas, estilo Fluent de Win11)
//
// Sin dependencias: reutiliza el dibujado, el redondeado de esquinas y el
// codificador PNG de generate-icons.js. Cada .ico contiene varios tamaños
// (16–128 en DIB y 256 en PNG) para que Windows use el más cercano a cada
// contexto (barra de tareas, acceso directo, explorador).
const fs = require('fs');
const path = require('path');
const { encodePng, drawIcon, roundCorners } = require('./generate-icons.js');

const SIZES = [16, 24, 32, 48, 64, 128];
const PNG_SIZE = 256;

// Radio de la variante redondeada. El estilo de Windows 11 usa ~25 % del
// tamaño del icono como radio de esquina (64 px sobre un lienzo de 256).
const WIN11_RADIUS = 0.25;

// Convierte el RGBA (de arriba a abajo) de drawIcon a BGRA de abajo a arriba,
// que es como los iconos almacenan los píxeles.
function rgbaToBgraBottomUp(rgba, size) {
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const dstRow = size - 1 - y;
    for (let x = 0; x < size; x++) {
      const si = (y * size + x) * 4;
      const di = (dstRow * size + x) * 4;
      out[di] = rgba[si + 2];     // B
      out[di + 1] = rgba[si + 1]; // G
      out[di + 2] = rgba[si];     // R
      out[di + 3] = rgba[si + 3]; // A
    }
  }
  return out;
}

// Máscara AND (1 bit por píxel) a ceros: en iconos de 32 bpp la transparencia
// la aporta el canal alfa, así que la máscara no marca ningún píxel.
function andMask(size) {
  const rowBytes = Math.ceil(size / 32) * 4; // filas alineadas a 32 bits
  return Buffer.alloc(rowBytes * size);
}

// Imagen DIB (BITMAPINFOHEADER + píxeles + máscara) para un tamaño dado.
function dibEntry(size, rgba) {
  const pixels = rgbaToBgraBottomUp(rgba, size);
  const mask = andMask(size);

  const bih = Buffer.alloc(40);
  bih.writeUInt32LE(40, 0);              // biSize
  bih.writeInt32LE(size, 4);             // biWidth
  bih.writeInt32LE(size * 2, 8);         // biHeight = imagen + máscara
  bih.writeUInt16LE(1, 12);              // biPlanes
  bih.writeUInt16LE(32, 14);             // biBitCount
  bih.writeUInt32LE(0, 16);              // biCompression = BI_RGB
  bih.writeUInt32LE(pixels.length + mask.length, 20); // biSizeImage

  return Buffer.concat([bih, pixels, mask]);
}

// Entrada de directorio ICO (16 bytes) que apunta a un bloque de imagen.
function dirEntry(size, byteLength, offset, isPng) {
  const entry = Buffer.alloc(16);
  entry[0] = isPng ? 0 : size; // ancho (0 = 256 en el caso PNG)
  entry[1] = isPng ? 0 : size; // alto
  entry[2] = 0;                // paleta de colores
  entry[3] = 0;                // reservado
  entry.writeUInt16LE(1, 4);   // planos de color
  entry.writeUInt16LE(32, 6);  // bits por píxel
  entry.writeUInt32LE(byteLength, 8);
  entry.writeUInt32LE(offset, 12);
  return entry;
}

// Construye un .ico completo a partir de una función que dibuja cada tamaño.
function buildIco(makeRgba) {
  const images = SIZES.map((size) => dibEntry(size, makeRgba(size)));
  const png = encodePng(PNG_SIZE, makeRgba(PNG_SIZE));
  images.push(png);

  const sizes = [...SIZES, PNG_SIZE];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);             // reservado
  header.writeUInt16LE(1, 2);             // tipo: icono
  header.writeUInt16LE(images.length, 4); // número de imágenes

  let offset = 6 + 16 * images.length;
  const entries = images.map((data, i) => {
    const entry = dirEntry(sizes[i], data.length, offset, i === images.length - 1);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images]);
}

function square(size) {
  return drawIcon(size);
}

function rounded(size) {
  const rgba = drawIcon(size);
  roundCorners(size, rgba, WIN11_RADIUS);
  return rgba;
}

const OUT_DIR = path.join(__dirname, '..', 'build');
fs.mkdirSync(OUT_DIR, { recursive: true });

const outputs = {
  'icon.ico': buildIco(square),
  'icon-rounded.ico': buildIco(rounded)
};

for (const [name, data] of Object.entries(outputs)) {
  fs.writeFileSync(path.join(OUT_DIR, name), data);
  console.log('Creado build/' + name + ' (' + data.length + ' bytes, ' + (SIZES.length + 1) + ' tamaños)');
}
