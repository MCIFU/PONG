// Servidor local estático sin dependencias (solo módulos incluidos en Node).
// Sirve la carpeta del juego para poder probar la PWA y el service worker
// (que no funcionan al abrir index.html directamente con file://).
//
// Uso:
//   npm start                 (desde la raíz del proyecto)
//   node tools/server.js
//   PORT=8080 npm start       (para usar otro puerto)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..'); // carpeta raíz del juego
const PORT = Number(process.env.PORT) || 8000;

// Tipos MIME de los archivos que usa el juego. El .webmanifest y el .woff2
// necesitan su tipo correcto para que el navegador los interprete bien.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 - Petición no válida');
    return;
  }

  // Seguridad: normaliza la ruta y evita que se salga de la carpeta (../).
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(ROOT, safePath);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 - Prohibido');
    return;
  }

  // Si piden un directorio (o la raíz), servimos su index.html.
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - No encontrado: ' + pathname);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    // En desarrollo no cacheamos: el navegador debe revalidar cada vez para que
    // los cambios de CSS/JS se vean al recargar (si no, sirve la versión vieja).
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('Pong disponible en http://localhost:' + PORT);
  console.log('Pulsa Ctrl+C para detener el servidor.');
});
