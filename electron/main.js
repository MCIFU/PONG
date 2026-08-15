// Punto de entrada de la app de escritorio (Electron).
// Carga index.html directamente desde el disco: no necesita servidor ni internet.
// El juego funciona igual que en el navegador (sin service worker, que en
// Electron no aplica; localStorage y la fuente local sí funcionan).
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 640,
    minHeight: 480,
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, '..', 'build', 'icon-rounded.ico'),
    title: 'Pong',
    // Aislamos la página del proceso de Node por seguridad. El preload expone
    // únicamente la API de actualizaciones (window.pongDesktop).
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Sin menú de aplicación: es un juego, sobra.
  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
}

// Envía el estado de la actualización a la interfaz (si la ventana sigue viva).
function sendUpdateStatus(data) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('pong:update-status', data);
  }
}

// Auto-actualización (solo en la app empaquetada, no en `npm run desktop`).
// electron-updater consulta la fuente configurada en "publish" (GitHub
// Releases) y, si hay una versión nueva: la descarga en segundo plano, avisa
// con una notificación y la instala al cerrar la app. Requiere haber subido
// una versión publicada con `electron-builder --publish`.
function setupAutoUpdater() {
  const { autoUpdater } = require('electron-updater');

  autoUpdater.autoDownload = true; // descarga sin pedir permiso
  autoUpdater.autoInstallOnAppQuit = true; // NSIS instala al salir
  autoUpdater.logger = console; // sin dependencias extra de logging

  // Reenviamos cada evento a la página para que el botón del menú muestre el
  // resultado ("Buscando…", "Nueva versión…", "Listo", "Error"…).
  autoUpdater.on('checking-for-update', () => sendUpdateStatus({ state: 'checking' }));
  autoUpdater.on('update-available', (info) => sendUpdateStatus({ state: 'available', version: info.version }));
  autoUpdater.on('download-progress', (progress) => sendUpdateStatus({ state: 'downloading', percent: Math.round(progress.percent) }));
  autoUpdater.on('update-not-available', () => sendUpdateStatus({ state: 'up-to-date' }));
  autoUpdater.on('update-downloaded', (info) => sendUpdateStatus({ state: 'downloaded', version: info.version }));
  autoUpdater.on('error', (err) => sendUpdateStatus({ state: 'error', message: err.message }));

  // Botón "Buscar actualizaciones" de la interfaz.
  ipcMain.handle('pong:check-for-updates', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return {
        state: result ? 'available' : 'up-to-date',
        version: result && result.updateInfo ? result.updateInfo.version : null
      };
    } catch (error) {
      return { state: 'error', message: error.message };
    }
  });

  // "Reiniciar e instalar" cuando la descarga ya ha terminado.
  ipcMain.handle('pong:quit-and-install', () => {
    setImmediate(() => autoUpdater.quitAndInstall());
    return true;
  });

  // Comprueba al arrancar y notifica solo si encuentra algo.
  autoUpdater.checkForUpdatesAndNotify().catch(() => {});
}

app.whenReady().then(() => {
  // Versión de la app para la pantalla "Acerca de" (también en desarrollo).
  ipcMain.handle('pong:get-version', () => app.getVersion());

  createWindow();
  if (app.isPackaged) setupAutoUpdater();

  // En macOS es habitual reabrir una ventana al pulsar el icono del dock.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// En Windows/Linux, cerrar todas las ventanas cierra la app.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
