// Verifica que cada clave usada en HTML/JS exista en los 9 diccionarios de TRANSLATIONS.
// Uso: node tools/check-i18n.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js', 'script.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Extraer el objeto TRANSLATIONS por conteo de llaves y evaluarlo de verdad
const marker = 'const TRANSLATIONS = ';
const start = src.indexOf(marker) + marker.length;
let depth = 0, i = start, inStr = null;
for (; i < src.length; i++) {
  const ch = src[i];
  if (inStr) {
    if (ch === '\\') { i++; continue; }
    if (ch === inStr) inStr = null;
    continue;
  }
  if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
  if (ch === '{') depth++;
  if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
}
const objText = src.slice(start, i);
const TRANSLATIONS = new Function('return ' + objText)();
const codes = Object.keys(TRANSLATIONS);
console.log('Idiomas (' + codes.length + '):', codes.join(', '));

const htmlKeys = new Set();
const attrRe = /data-i18n(?:-placeholder|-aria|-title)?="([^"]+)"/g;
let a;
while ((a = attrRe.exec(html))) htmlKeys.add(a[1]);

const jsKeys = new Set();
const tRe = /\bt\(\s*'([^']+)'/g;
let tm;
while ((tm = tRe.exec(src))) {
  const key = tm[1];
  if (!key.endsWith('.')) jsKeys.add(key); // 'desc.' + difficulty es concatenacion
}

const allKeys = new Set([...htmlKeys, ...jsKeys]);
let missing = 0;
for (const key of [...allKeys].sort()) {
  for (const code of codes) {
    if (!(key in TRANSLATIONS[code])) {
      console.log('FALTA [' + code + '] ' + key);
      missing++;
    }
  }
}
console.log('Claves totales:', allKeys.size, '| Faltantes:', missing);
console.log(missing === 0 ? 'TODO COMPLETO' : 'HAY FALTANTES');
process.exit(missing === 0 ? 0 : 1);
