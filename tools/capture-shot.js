// Captura una captura de pantalla del juego a tamaño escritorio (para el README).
// Uso: node tools/capture-shot.js <url> <salida.png>
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const url = process.argv[2] || 'http://localhost:8211/';
const out = process.argv[3] || path.join(__dirname, '..', 'screenshot.png');
const log = path.join(__dirname, 'capture-log.txt');

function logMsg(m) {
  try { fs.appendFileSync(log, new Date().toISOString() + ' ' + m + '\n'); } catch (e) {}
}

logMsg('script started, args=' + JSON.stringify(process.argv));
app.disableHardwareAcceleration();

app.whenReady().then(async () => {
  try {
    logMsg('app ready');
    const win = new BrowserWindow({
      width: 1280,
      height: 800,
      show: false,
      webPreferences: { offscreen: false },
    });
    logMsg('window created');
    await win.loadURL(url);
    logMsg('url loaded');
    await new Promise((r) => setTimeout(r, 8000));
    const image = await win.webContents.capturePage();
    fs.writeFileSync(out, image.toPNG());
    logMsg('saved: ' + out + ' (' + image.toPNG().length + ' bytes)');
    app.quit();
  } catch (e) {
    logMsg('ERROR: ' + (e && e.stack ? e.stack : String(e)));
    app.exit(1);
  }
});
