// Puente seguro entre la página del juego y el proceso principal de Electron.
// Con contextIsolation activo, la página no tiene acceso a Node; aquí exponemos
// solo lo necesario para buscar actualizaciones de forma controlada.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pongDesktop', {
  // Pide al proceso principal que compruebe si hay una versión nueva.
  // Devuelve { state, version } (o lanza en modo desarrollo).
  checkForUpdates: () => ipcRenderer.invoke('pong:check-for-updates'),

  // Reinicia la app e instala la actualización ya descargada.
  quitAndInstall: () => ipcRenderer.invoke('pong:quit-and-install'),

  // Devuelve la versión de la app (para la pantalla "Acerca de").
  getVersion: () => ipcRenderer.invoke('pong:get-version'),

  // Se suscribe a los avisos de estado (checking / available / downloaded…).
  // Devuelve una función para cancelar la suscripción.
  onUpdateStatus: (callback) => {
    const listener = (_event, data) => callback(data);
    ipcRenderer.on('pong:update-status', listener);
    return () => ipcRenderer.removeListener('pong:update-status', listener);
  }
});
