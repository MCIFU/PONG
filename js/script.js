// ==========================================================
//  PONG — un juego sencillo en HTML, CSS y JavaScript puro
// ==========================================================

// 1. Referencias a los elementos de la página
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const splashEl = document.getElementById('splash');
const splashProgressEl = document.getElementById('splash-progress');
const splashBar = document.getElementById('splash-bar');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const gamePointEl = document.getElementById('game-point');
const difficultyBadge = document.getElementById('difficulty-badge');
const label1El = document.getElementById('label1');
const label2El = document.getElementById('label2');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlaySubtitle = document.getElementById('overlay-subtitle');
const restartBtn = document.getElementById('restart');
const setupStartBtn = document.getElementById('setup-start');
const musicVolumeSlider = document.getElementById('music-volume');
const effectsVolumeSlider = document.getElementById('effects-volume');
const musicToggleBtn = document.getElementById('music-toggle');
const effectsToggleBtn = document.getElementById('effects-toggle');
const themeClasicoBtn = document.getElementById('theme-clasico');
const themeEnergeticoBtn = document.getElementById('theme-energetico');
const themeTranquiloBtn = document.getElementById('theme-tranquilo');
const toastEl = document.getElementById('toast');
const confettiEl = document.getElementById('confetti');
const explosionEl = document.getElementById('explosion');
const modePvpBtn = document.getElementById('mode-pvp');
const modeAiBtn = document.getElementById('mode-ai');
const diffFacilBtn = document.getElementById('diff-facil');
const diffNormalBtn = document.getElementById('diff-normal');
const diffDificilBtn = document.getElementById('diff-dificil');
const difficultyDescEl = document.getElementById('difficulty-desc');
const difficultySelector = document.getElementById('difficulty-selector');
const sideSelector = document.getElementById('side-selector');
const sideLeftBtn = document.getElementById('side-left');
const sideRightBtn = document.getElementById('side-right');
const bestOf1Btn = document.getElementById('bestof-1');
const bestOf3Btn = document.getElementById('bestof-3');
const bestOf5Btn = document.getElementById('bestof-5');
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const controlsCloseBtn = document.getElementById('controls-close');
const controlsModal = document.getElementById('controls-modal');
const soundCloseBtn = document.getElementById('sound-close');
const soundModal = document.getElementById('sound-modal');
const menuMainEl = document.getElementById('menu-main');
const menuSetupEl = document.getElementById('menu-setup');
const menuJugarBtn = document.getElementById('menu-jugar');
const menuControlesBtn = document.getElementById('menu-controles');
const menuEstadisticasBtn = document.getElementById('menu-estadisticas');
const menuSonidoBtn = document.getElementById('menu-sonido');
const menuIdiomaBtn = document.getElementById('menu-idioma');
const menuPersonalizarBtn = document.getElementById('menu-personalizar');
const menuVolverBtn = document.getElementById('menu-volver');
const languageModal = document.getElementById('language-modal');
const languageCloseBtn = document.getElementById('language-close');
const installBtn = document.getElementById('install-btn');
const aboutModal = document.getElementById('about-modal');
const aboutCloseBtn = document.getElementById('about-close');
const aboutVersionEl = document.getElementById('about-version');
const menuAcercaBtn = document.getElementById('menu-acerca');
const personalizeModal = document.getElementById('personalize-modal');
const personalizeCloseBtn = document.getElementById('personalize-close');
const resetAllBtn = document.getElementById('reset-all-settings');
const paletteVerdeBtn = document.getElementById('palette-verde');
const paletteAzulBtn = document.getElementById('palette-azul');
const paletteAmbarBtn = document.getElementById('palette-ambar');
const paletteRosaBtn = document.getElementById('palette-rosa');
const themeDarkBtn = document.getElementById('theme-dark');
const themeLightBtn = document.getElementById('theme-light');
const themeSystemBtn = document.getElementById('theme-system');
const orientationLandscapeBtn = document.getElementById('orientation-landscape');
const orientationPortraitBtn = document.getElementById('orientation-portrait');
const touchPauseBtn = document.getElementById('touch-pause');
const touchRestartBtn = document.getElementById('touch-restart');
const touchMenuBtn = document.getElementById('touch-menu');
const touchSoundBtn = document.getElementById('touch-sound');
const touchPauseIcon = document.getElementById('touch-pause-icon');
const touchSoundIcon = document.getElementById('touch-sound-icon');
const touchControlsEl = document.getElementById('touch-controls');
const statsCloseBtn = document.getElementById('stats-close');
const statsResetBtn = document.getElementById('stats-reset');
const statsModal = document.getElementById('stats-modal');
const confirmModal = document.getElementById('confirm-modal');
const confirmTitleEl = document.getElementById('confirm-title');
const confirmMessageEl = document.getElementById('confirm-message');
const confirmOkBtn = document.getElementById('confirm-ok');
const confirmCancelBtn = document.getElementById('confirm-cancel');
const statsTotalEl = document.getElementById('stats-total');
const statsWinsEl = document.getElementById('stats-wins');
const statsLossesEl = document.getElementById('stats-losses');
const statsTimeEl = document.getElementById('stats-time');
const statsIaBarEl = document.getElementById('stats-ia-bar');
const statsIaPercentEl = document.getElementById('stats-ia-percent');
const streakFacilEl = document.getElementById('streak-facil');
const streakNormalEl = document.getElementById('streak-normal');
const streakDificilEl = document.getElementById('streak-dificil');
const stage = document.querySelector('.stage');

// Tipografías del juego. La arcade está embebida en la PWA (offline).
const DISPLAY_FONT = "'Press Start 2P', 'Arial Rounded MT Bold', 'Trebuchet MS', 'Segoe UI', Verdana, sans-serif";

// 1.5. Idiomas (internacionalización)
// El juego se puede jugar en español e inglés. Cada idioma es un diccionario
// clave->texto; applyLanguage() aplica el idioma actual a la interfaz.
let language = 'es';

const TRANSLATIONS = {
  es: {
    'common.close': 'Cerrar',
    'common.player1': 'Jugador 1',
    'common.player2': 'Jugador 2',
    'menu.play': 'Jugar', 'menu.controls': 'Controles', 'menu.stats': 'Estadísticas', 'menu.sound': 'Sonido',
    'menu.language': 'Idioma', 'menu.install': 'Instalar',
    'update.check': 'Buscar actualizaciones', 'update.checking': 'Buscando…',
    'update.upToDate': 'Ya tienes la última versión', 'update.available': 'Nueva versión {v} disponible',
    'update.downloading': 'Descargando… {p}%',
    'update.downloaded': 'Actualización lista: se instalará al cerrar',
    'update.installNow': 'Reiniciar e instalar', 'update.error': 'No se pudo buscar actualizaciones',
    'about.title': 'Acerca de', 'about.version': 'Versión {v}',
    'about.desc': 'Pong clásico hecho con HTML, CSS y JavaScript puro. Sin dependencias.',
    'setup.subtitle': 'Configura la partida',
    'setup.modeAi': '1 jugador (vs IA)', 'setup.modePvp': '2 jugadores',
    'setup.difficulty': 'Dificultad', 'setup.easy': 'Fácil', 'setup.normal': 'Normal', 'setup.hard': 'Difícil',
    'setup.side': 'Lado', 'setup.left': 'Izquierda', 'setup.right': 'Derecha',
    'setup.points': 'Puntos para ganar',
    'setup.customize': 'Personalizar', 'setup.back': '← Volver', 'setup.start': 'Empezar',
    'desc.facil': 'Pala larga. La IA es un poco torpe y falla a veces.',
    'desc.normal': 'Pala media. La IA es equilibrada y comete algunos errores.',
    'desc.dificil': 'Pala algo más corta. La IA es rápida y precisa.',
    'rotate.hint': 'Gira el móvil a horizontal para jugar mejor',
    'touch.hint': 'Arrastra por el tablero para mover tu pala',
    'touch.pause': 'Pausa', 'touch.restart': 'Reiniciar partida', 'touch.back': 'Volver al menú',
    'touch.resume': 'Reanudar', 'touch.mute': 'Silenciar sonido', 'touch.unmute': 'Restaurar sonido',
    'gamepoint': '¡Punto de partido!',
    'stats.title': 'Estadísticas', 'stats.total': 'Partidas', 'stats.wins': 'Victorias', 'stats.losses': 'Derrotas',
    'stats.time': 'Tiempo', 'stats.vsIa': 'vs IA', 'stats.againstAi': 'Contra la IA',
    'stats.reset': 'Borrar historial', 'stats.ia': 'IA',
    'stats.byDifficulty': 'Victorias por dificultad',
    'stats.winBarAria': 'Porcentaje de victorias contra la IA',
    'stats.winPct': 'Victorias: {pct}',
    'controls.title': 'Controles', 'controls.keyboard': 'Teclado',
    'controls.ws': 'Pala izquierda (subir / bajar)', 'controls.arrows': 'Pala derecha (subir / bajar)',
    'controls.space': 'Empezar / reiniciar', 'controls.pause': 'Pausar', 'controls.esc': 'Volver al menú',
    'controls.mute': 'Silenciar / restaurar sonido', 'controls.touch': 'Táctil',
    'controls.touchDrag': 'Arrastra por el tablero para mover tu pala',
    'controls.touchP1': '1 jugador', 'controls.touchP2': '2 jugadores',
    'controls.touchP2Desc': 'Cada mitad de la pantalla mueve su pala',
    'controls.touchButtons': 'Botones',
    'controls.touchPause': 'Pausa', 'controls.touchRestart': 'Reiniciar', 'controls.touchMenu': 'Menú', 'controls.touchSound': 'Sonido',
    'sound.title': 'Sonido', 'sound.volume': 'Volumen', 'sound.music': 'Música', 'sound.effects': 'Efectos',
    'sound.toggleTitle': 'Encender/apagar la música de fondo', 'sound.effectsToggle': 'Encender/apagar los efectos de sonido', 'sound.theme': 'Tema musical',
    'sound.themeClassic': 'Clásico', 'sound.themeEnergy': 'Energético', 'sound.themeRelax': 'Tranquilo',
    'language.title': 'Idioma',
    'lang.es': 'Español', 'lang.en': 'Inglés',
    'customize.title': 'Personalizar', 'customize.paddleColor': 'Color de las palas', 'customize.names': 'Nombres',
    'customize.palette': 'Tema de color', 'customize.mode': 'Tema (claro / oscuro)',
    'customize.dark': 'Oscuro', 'customize.light': 'Claro', 'customize.system': 'Sistema',
    'customize.orientation': 'Orientación', 'customize.orientLandscape': 'Horizontal', 'customize.orientPortrait': 'Vertical',
    'customize.orientDesc': 'Desbloquea el juego en vertical para no tener que girar el móvil.',
    'customize.reset': 'Restablecer', 'customize.resetAll': 'Restablecer todo',
    'customize.resetDesc': 'Vuelve a los valores por defecto: colores, volúmenes, temas y estadísticas.',
    'customize.done': 'Hecho', 'customize.p1': 'Jugador 1', 'customize.p2': 'Jugador 2',
    'customize.p1Aria': 'Nombre del jugador de la izquierda', 'customize.p2Aria': 'Nombre del jugador de la derecha',
    'customize.default': 'Por defecto (sigue el tema)',
    'customize.green': 'Verde', 'customize.blue': 'Azul', 'customize.amber': 'Ámbar', 'customize.pink': 'Rosa',
    'game.win': '¡Has ganado, {name}!', 'game.iaWins': '¡La IA gana!', 'game.playerWins': '¡{name} gana!',
    'game.record': '¡Nuevo récord!', 'game.bestStreak': 'Mejor racha en {diff}: {n}',
    'game.result': 'Resultado: {s1} - {s2}', 'game.playAgain': 'Jugar de nuevo', 'game.serve': 'SACA',
    'pause.title': 'PAUSA', 'pause.continue': 'Pulsa P para continuar',
    'pause.restart': 'ESPACIO para reiniciar', 'pause.exit': 'ESC para salir al menú',
    'pause.touchContinue': 'Toca en cualquier punto para continuar', 'pause.touchRestart': 'Pulsa Reiniciar para empezar de nuevo', 'pause.touchExit': 'Pulsa Casa para salir al menú',
    'toast.muted': 'Sonido silenciado (M para restaurar)', 'toast.unmuted': 'Sonido restaurado',
    'toast.reset': 'Ajustes restablecidos', 'toast.installing': '¡Instalando la app…!', 'toast.installed': '¡App instalada!',
    'confirm.resetStats': '¿Borrar el historial de victorias?',
    'confirm.cannotUndo': 'Esta acción no se puede deshacer.', 'confirm.cancel': 'Cancelar', 'confirm.delete': 'Borrar',
    'confirm.resetAll': '¿Restablecer todos los ajustes y estadísticas a los valores por defecto?',
    'confirm.quitTitle': '¿Salir de la partida?', 'confirm.quitMessage': 'Se perderá el progreso de esta partida.', 'confirm.quitOk': 'Salir',
    'confirm.restartTitle': '¿Reiniciar la partida?', 'confirm.restartMessage': 'Se perderá el progreso actual de la partida.', 'confirm.restartOk': 'Reiniciar',
    'time.h': 'h', 'time.min': 'min', 'time.s': 's'
  },
  en: {
    'common.close': 'Close', 'common.player1': 'Player 1', 'common.player2': 'Player 2',
    'menu.play': 'Play', 'menu.controls': 'Controls', 'menu.stats': 'Statistics', 'menu.sound': 'Sound',
    'menu.language': 'Language', 'menu.install': 'Install',
    'update.check': 'Check for updates', 'update.checking': 'Checking…',
    'update.upToDate': 'You are up to date', 'update.available': 'New version {v} available',
    'update.downloading': 'Downloading… {p}%',
    'update.downloaded': 'Update ready: it will install on quit',
    'update.installNow': 'Restart and install', 'update.error': 'Could not check for updates',
    'about.title': 'About', 'about.version': 'Version {v}',
    'about.desc': 'A classic Pong made with pure HTML, CSS and JavaScript. No dependencies.',
    'setup.subtitle': 'Set up the match',
    'setup.modeAi': '1 player (vs AI)', 'setup.modePvp': '2 players',
    'setup.difficulty': 'Difficulty', 'setup.easy': 'Easy', 'setup.normal': 'Normal', 'setup.hard': 'Hard',
    'setup.side': 'Side', 'setup.left': 'Left', 'setup.right': 'Right',
    'setup.points': 'Points to win',
    'setup.customize': 'Customize', 'setup.back': '← Back', 'setup.start': 'Start',
    'desc.facil': 'Long paddle. The AI is a bit clumsy and sometimes misses.',
    'desc.normal': 'Medium paddle. The AI is balanced and makes some mistakes.',
    'desc.dificil': 'Slightly shorter paddle. The AI is fast and precise.',
    'rotate.hint': 'Turn your phone sideways for a better experience',
    'touch.hint': 'Drag on the board to move your paddle',
    'touch.pause': 'Pause', 'touch.restart': 'Restart match', 'touch.back': 'Back to menu',
    'touch.resume': 'Resume', 'touch.mute': 'Mute sound', 'touch.unmute': 'Restore sound',
    'gamepoint': 'Match point!',
    'stats.title': 'Statistics', 'stats.total': 'Games', 'stats.wins': 'Wins', 'stats.losses': 'Losses',
    'stats.time': 'Time', 'stats.vsIa': 'vs AI', 'stats.againstAi': 'Against the AI',
    'stats.reset': 'Clear history', 'stats.ia': 'AI',
    'stats.byDifficulty': 'Wins by difficulty',
    'stats.winBarAria': 'Percentage of wins against the AI',
    'stats.winPct': 'Wins: {pct}',
    'controls.title': 'Controls', 'controls.keyboard': 'Keyboard',
    'controls.ws': 'Left paddle (up / down)', 'controls.arrows': 'Right paddle (up / down)',
    'controls.space': 'Start / restart', 'controls.pause': 'Pause', 'controls.esc': 'Back to menu',
    'controls.mute': 'Mute / restore sound', 'controls.touch': 'Touch',
    'controls.touchDrag': 'Drag on the board to move your paddle',
    'controls.touchP1': '1 player', 'controls.touchP2': '2 players',
    'controls.touchP2Desc': 'Each half of the screen moves its paddle',
    'controls.touchButtons': 'Buttons',
    'controls.touchPause': 'Pause', 'controls.touchRestart': 'Restart', 'controls.touchMenu': 'Menu', 'controls.touchSound': 'Sound',
    'sound.title': 'Sound', 'sound.volume': 'Volume', 'sound.music': 'Music', 'sound.effects': 'Effects',
    'sound.toggleTitle': 'Turn background music on/off', 'sound.effectsToggle': 'Turn sound effects on/off', 'sound.theme': 'Music theme',
    'sound.themeClassic': 'Classic', 'sound.themeEnergy': 'Energetic', 'sound.themeRelax': 'Relaxing',
    'language.title': 'Language',
    'lang.es': 'Spanish', 'lang.en': 'English',
    'customize.title': 'Customize', 'customize.paddleColor': 'Paddle color', 'customize.names': 'Names',
    'customize.palette': 'Color theme', 'customize.mode': 'Theme (light / dark)',
    'customize.dark': 'Dark', 'customize.light': 'Light', 'customize.system': 'System',
    'customize.orientation': 'Orientation', 'customize.orientLandscape': 'Landscape', 'customize.orientPortrait': 'Portrait',
    'customize.orientDesc': 'Unlock portrait play so you don\'t have to rotate the phone.',
    'customize.reset': 'Reset', 'customize.resetAll': 'Reset everything',
    'customize.resetDesc': 'Restores default values: colors, volumes, themes and statistics.',
    'customize.done': 'Done', 'customize.p1': 'Player 1', 'customize.p2': 'Player 2',
    'customize.p1Aria': 'Name of the left player', 'customize.p2Aria': 'Name of the right player',
    'customize.default': 'Default (follows theme)',
    'customize.green': 'Green', 'customize.blue': 'Blue', 'customize.amber': 'Amber', 'customize.pink': 'Pink',
    'game.win': 'You won, {name}!', 'game.iaWins': 'The AI wins!', 'game.playerWins': '{name} wins!',
    'game.record': 'New record!', 'game.bestStreak': 'Best streak in {diff}: {n}',
    'game.result': 'Result: {s1} - {s2}', 'game.playAgain': 'Play again', 'game.serve': 'SERVE',
    'pause.title': 'PAUSE', 'pause.continue': 'Press P to continue',
    'pause.restart': 'SPACE to restart', 'pause.exit': 'ESC to exit to menu',
    'pause.touchContinue': 'Tap anywhere to continue', 'pause.touchRestart': 'Press Restart to start over', 'pause.touchExit': 'Press Home for the menu',
    'toast.muted': 'Sound muted (M to restore)', 'toast.unmuted': 'Sound restored',
    'toast.reset': 'Settings reset', 'toast.installing': 'Installing the app…!', 'toast.installed': 'App installed!',
    'confirm.resetStats': 'Delete the win history?',
    'confirm.cannotUndo': 'This action cannot be undone.', 'confirm.cancel': 'Cancel', 'confirm.delete': 'Delete',
    'confirm.resetAll': 'Reset all settings and statistics to default values?',
    'confirm.quitTitle': 'Leave the match?', 'confirm.quitMessage': 'Your progress in this match will be lost.', 'confirm.quitOk': 'Leave',
    'confirm.restartTitle': 'Restart the match?', 'confirm.restartMessage': 'Your current progress in this match will be lost.', 'confirm.restartOk': 'Restart',
    'time.h': 'h', 'time.min': 'min', 'time.s': 's'
  }
};

// Devuelve el texto traducido de una clave, con sustitución opcional de {variables}
function t(key, vars) {
  const dict = TRANSLATIONS[language] || TRANSLATIONS.es;
  let text = dict[key];
  if (text === undefined) text = TRANSLATIONS.es[key];
  if (text === undefined) return key;
  if (vars) {
    for (const name in vars) {
      text = text.split('{' + name + '}').join(String(vars[name]));
    }
  }
  return text;
}

// Nombre traducible de cada dificultad
function difficultyName(d) {
  const keys = { facil: 'setup.easy', normal: 'setup.normal', dificil: 'setup.hard' };
  return t(keys[d] || 'setup.normal');
}

// Aplica el idioma actual a toda la interfaz (textos estáticos, atributos y
// secciones que se rellenan desde JavaScript)
function applyLanguage() {
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.i18nTitle));
  });

  // Marca el idioma seleccionado en el selector
  ['es', 'en'].forEach((code) => {
    const btn = document.getElementById('lang-' + code);
    if (btn) btn.classList.toggle('selected', code === language);
  });

  // Textos generados por JavaScript
  if (typeof updateScoreLabels === 'function') updateScoreLabels();
  if (typeof updateDifficultyBadge === 'function') updateDifficultyBadge();
  if (typeof updatePauseButton === 'function') updatePauseButton();
  if (typeof updateSoundButton === 'function') updateSoundButton();
  if (typeof renderUpdateButton === 'function') renderUpdateButton();
  if (typeof renderAbout === 'function') renderAbout();
  if (typeof difficultyDescEl !== 'undefined' && difficultyDescEl) {
    difficultyDescEl.textContent = t('desc.' + difficulty);
  }
  if (typeof renderStats === 'function') renderStats();
  if (typeof overlaySubtitle !== 'undefined' && overlaySubtitle) {
    if (state === 'setup') overlaySubtitle.textContent = t('setup.subtitle');
  }
  if (restartBtn) {
    restartBtn.textContent = t('game.playAgain');
  }
}

// Cargamos el idioma guardado en el navegador
(function loadLanguage() {
  try {
    const saved = localStorage.getItem('pong-language');
    if (TRANSLATIONS[saved]) language = saved;
  } catch (error) {
    // sin acceso a localStorage: usamos el español
  }
})();

// Cambia el idioma, lo guarda y lo aplica
function setLanguage(newLanguage) {
  if (!TRANSLATIONS[newLanguage]) return;
  language = newLanguage;
  try {
    localStorage.setItem('pong-language', language);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  applyLanguage();
}

// 2. Ajustes del juego (puedes cambiar estos números para experimentar)
const WIDTH = 800;   // ancho lógico del juego
const HEIGHT = 500;  // alto lógico del juego

// Escala de dibujado: se ajusta al tamaño real del lienzo en pantalla.
let renderScaleX = 1;
let renderScaleY = 1;

// Ajusta la resolución del lienzo al tamaño que ocupa en pantalla
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return; // aún sin tamaño visible

  // Escala: la necesaria para cubrir el tamaño CSS del lienzo (el juego se
  // dibuja a 1x, su resolución lógica). NO usamos devicePixelRatio porque, en
  // Chrome/Safari, ese valor incluye el zoom del navegador y hacía crecer el
  // buffer de dibujado al hacer zoom. Con image-rendering: pixelated, el
  // navegador amplía el bitmap con vecino más cercano y se ve nítido a
  // cualquier tamaño o zoom sin coste extra.
  const scale = Math.max(1, Math.floor(rect.width / WIDTH));

  const width = WIDTH * scale;
  const height = HEIGHT * scale;

  // Si el tamaño no cambió, no tocamos el lienzo (evita limpiarlo sin necesidad)
  if (width === canvas.width && height === canvas.height) return;

  canvas.width = width;
  canvas.height = height;
  renderScaleX = scale;
  renderScaleY = scale;
}

// Durante el arrastre del borde de la ventana llegan decenas de eventos de resize.
// Redimensionar el lienzo es costoso (reasigna el buffer), así que en vez de hacerlo
// en cada evento esperamos a que el usuario se detenga un instante y lo hacemos una
// sola vez. Así no compite por CPU mientras se arrastra.
let resizeTimer = null;
function scheduleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 150);
}
const PADDLE_WIDTH = 12;
const PADDLE_SPEED = 6;        // velocidad de las palas
const BALL_SIZE = 12;
const MAX_BALL_SPEED = 13;     // tope normal de velocidad (los rallies se aceleran hasta aquí)
const RALLY_MAX_SPEED = 15;    // techo absoluto: solo se alcanza si un rally no termina
const RALLY_EXTRA_SPEED = 0.5;  // subida extra por golpe una vez alcanzado el tope
const TRAIL_LENGTH = 12;       // longitud de la estela de la pelota
const SHADOW_OFFSET = 2;       // desplazamiento (px lógicos) de la sombra dura de palas y pelota
const AI_ACCEL = 0.22;         // inercia de la IA: cuánto acelera/frena su velocidad por fotograma
const AI_SPEED_ERROR_BONUS = 1.5; // error extra de puntería a pleno sprint (la IA apunta peor corriendo)
const PADDLE_ACCEL = 0.5;      // pequeña aceleración de las palas por teclado (física, sin arranques secos)

// Ajustes según la dificultad elegida
const DIFFICULTY = {
  // La pelota empieza a un ritmo vivo y acelera con cada golpe (speedUp) hasta
  // el tope MAX_BALL_SPEED: rallies cada vez más rápidos. La dificultad cambia
  // sobre todo el tamaño de la pala y lo rápida/precisa que es la IA.
  facil:   { paddleHeight: 120, ballSpeed: 5.5,  aiSpeed: 4.5,  speedUp: 1.08, reactionDelay: 18, aimError: 30, reactionJitter: 0.8,
             description: 'Pala larga. La IA es un poco torpe y falla a veces.' },
  // Intermedio exacto entre Fácil y Difícil.
  normal:  { paddleHeight: 110, ballSpeed: 5.75, aiSpeed: 5.25, speedUp: 1.09, reactionDelay: 13, aimError: 22, reactionJitter: 0.6,
             description: 'Pala media. La IA es equilibrada y comete algunos errores.' },
  dificil: { paddleHeight: 100, ballSpeed: 6,    aiSpeed: 6,    speedUp: 1.10, reactionDelay: 7,  aimError: 13, reactionJitter: 0.45,
             description: 'Pala algo más corta. La IA es rápida y precisa.' },
};

// Estos valores cambian al elegir la dificultad
let paddleHeight = DIFFICULTY.normal.paddleHeight;
let ballSpeed = DIFFICULTY.normal.ballSpeed;
let ballSpeedUp = DIFFICULTY.normal.speedUp; // aceleración por golpe de pala
let aiSpeed = DIFFICULTY.normal.aiSpeed;
let aiReactionDelay = DIFFICULTY.normal.reactionDelay; // fotogramas de "tiempo de reacción"
let aiAimError = DIFFICULTY.normal.aimError; // error máximo de puntería de la IA (en píxeles)
let aiReactionJitter = DIFFICULTY.normal.reactionJitter; // cuánto varía la reacción (0 = constante, 1 = muy irregular)
let paddleColor = '#ffffff'; // color de las palas (personalizable)

// Paletas de color del tema (afectan a botones, títulos, brillos y estela).
// Cada paleta tiene su versión neón (modo oscuro) y una variante más oscura
// y saturada para el modo claro, igual que las variables CSS --accent.
const PALETTES = {
  // "overdrive" es el tono "caliente" de cada paleta: la estela y el halo se
  // mezclan hacia él cuando la bola supera el tope normal de velocidad.
  // "overdriveLight" es la variante oscura y saturada para el tema claro.
  verde: { label: 'Verde', hex: '#7cfc00', rgb: '124, 252, 0', lightHex: '#14802a', lightRgb: '20, 128, 42', overdrive: '255, 200, 60', overdriveLight: '180, 83, 9' },
  azul:  { label: 'Azul',  hex: '#4da6ff', rgb: '77, 166, 255', lightHex: '#0f5fcf', lightRgb: '15, 95, 207', overdrive: '80, 220, 255', overdriveLight: '0, 121, 140' },
  ambar: { label: 'Ámbar', hex: '#ffb020', rgb: '255, 176, 32', lightHex: '#b85e00', lightRgb: '184, 94, 0', overdrive: '255, 90, 30', overdriveLight: '194, 65, 12' },
  rosa:  { label: 'Rosa',  hex: '#ff4dd8', rgb: '255, 77, 216', lightHex: '#d21f66', lightRgb: '210, 31, 102', overdrive: '255, 70, 70', overdriveLight: '186, 26, 32' },
};
let palette = 'verde'; // paleta de color seleccionada
let theme = 'system'; // tema de la interfaz: 'dark' | 'light' | 'system' (sigue al SO)
let allowPortrait = false; // permite jugar en vertical (por defecto se pide girar el móvil)

// Color de acento según el tema efectivo: neón en oscuro, variante oscura en claro
function accentHex() {
  const p = PALETTES[palette];
  return resolvedTheme() === 'light' ? p.lightHex : p.hex;
}
function accentRgb() {
  const p = PALETTES[palette];
  return resolvedTheme() === 'light' ? p.lightRgb : p.rgb;
}
// Tono "caliente" de la paleta para el overdrive, según el tema: en claro usa
// la variante oscura y saturada para que se distinga sobre el tablero claro.
function overdriveRgb() {
  const p = PALETTES[palette];
  return resolvedTheme() === 'light' ? p.overdriveLight : p.overdrive;
}

// Fondo del tablero e "tinta" (pelota, palas por defecto, textos) según el tema.
// Oscuro = tablero negro y elementos blancos; claro = tablero claro y elementos oscuros.
function boardBg() {
  return resolvedTheme() === 'light' ? '#e9ecf3' : '#0a0a0f';
}
function inkColor() {
  return resolvedTheme() === 'light' ? '#1a1a24' : '#ffffff';
}
// Color de las palas: el color por defecto (#ffffff) sigue el tema; los personalizados se mantienen.
// Si el color elegido coincide con una paleta, en tema claro se usa su variante
// oscura y saturada (lightHex) para que siga viéndose sobre el tablero claro.
function paddleFillColor() {
  if (paddleColor === '#ffffff') return inkColor();
  if (resolvedTheme() === 'light') {
    for (const key of Object.keys(PALETTES)) {
      if (PALETTES[key].hex === paddleColor) return PALETTES[key].lightHex;
    }
  }
  return paddleColor;
}
// Aclara un color hexadecimal hacia el blanco (amount de 0 a 1).
function lightenHex(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amount);
  const g = Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amount);
  const b = Math.round((n & 255) + (255 - (n & 255)) * amount);
  return `rgb(${r}, ${g}, ${b})`;
}
// Contorno de las palas: un tono más claro del relleno, para que se vea un borde sutil.
function paddleOutlineColor() {
  return lightenHex(paddleFillColor(), 0.42);
}
// Sombra dura estilo píxel (un rectángulo sólido desplazado, sin desenfoque).
// En tablero claro: negro translúcido (clásico). En tablero oscuro: gris medio
// que se distingue entre el objeto y el fondo.
function hardShadowColor() {
  return resolvedTheme() === 'light' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(96, 100, 116, 0.55)';
}

// 3. Estado del juego
const paddle1 = { x: 30, y: HEIGHT / 2 - paddleHeight / 2, vel: 0 };
const paddle2 = { x: WIDTH - 30 - PADDLE_WIDTH, y: HEIGHT / 2 - paddleHeight / 2, vel: 0 };
const ball = { x: WIDTH / 2 - BALL_SIZE / 2, y: HEIGHT / 2 - BALL_SIZE / 2, vx: 0, vy: 0 };
const trail = []; // posiciones anteriores de la pelota para dibujar la estela
let overspeedHits = 0; // golpes seguidos una vez alcanzado el tope de velocidad

// Posiciones "anteriores" para interpolar el dibujado entre pasos de lógica:
// así el movimiento se ve suave incluso si el navegador dibuja a pocos FPS.
let prevBallX = ball.x, prevBallY = ball.y;
let prevPaddle1Y = paddle1.y, prevPaddle2Y = paddle2.y;
let renderAlpha = 0; // fracción (0..1) del paso actual usada para interpolar

// Sincroniza las posiciones anteriores con las actuales (tras un reinicio o salto).
function syncRenderState() {
  prevBallX = ball.x;
  prevBallY = ball.y;
  prevPaddle1Y = paddle1.y;
  prevPaddle2Y = paddle2.y;
}

let score1 = 0;
let score2 = 0;
let lastScore1 = 0; // último valor mostrado, para animar solo cuando cambia
let lastScore2 = 0;
let stats = {
  humanWins: 0,   // victorias del jugador humano contra la IA
  iaWins: 0,      // victorias de la IA
  p1Wins: 0,      // victorias del Jugador 1 (modo 2 jugadores)
  p2Wins: 0,      // victorias del Jugador 2 (modo 2 jugadores)
  playTimeMs: 0,   // tiempo total de juego (en milisegundos)
  streaks: { facil: 0, normal: 0, dificil: 0 },     // racha actual por dificultad
  bestStreaks: { facil: 0, normal: 0, dificil: 0 }, // mejor racha por dificultad
  winsByDifficulty: { facil: 0, normal: 0, dificil: 0 } // victorias totales por dificultad
};
let mode = 'ai';       // 'ai' = 1 jugador contra la IA | 'pvp' = 2 jugadores (por defecto: vs IA)
let difficulty = 'normal'; // dificultad del juego: 'facil' | 'normal' | 'dificil'
let playerSide = 'left';   // lado del jugador contra la IA: 'left' | 'right'
let serverSide = 'left';   // quién saca la próxima bola: 'left' | 'right'
let bestOf = 5;            // puntos para ganar la partida: 1, 3 o 5
let player1Name = 'Jugador 1'; // nombre del jugador de la izquierda
let player2Name = 'Jugador 2'; // nombre del jugador de la derecha
let state = 'start';   // 'start' = menú principal | 'setup' = configuración | 'playing' = jugando | 'gameover' = fin de la partida
let paused = false;    // true mientras el juego está en pausa
let launchTimer = 0;   // fotogramas restantes hasta el siguiente número de la cuenta atrás
let countdown = 0;     // número que se muestra antes del saque (3, 2, 1...)
let resumeCountdown = false; // true cuando la cuenta atrás es para reanudar tras una pausa
let touchHintShown = false; // el aviso táctil solo se muestra en la primera cuenta atrás
// ¿Es un dispositivo táctil? (se evalúa una vez al cargar, no en cada fotograma)
const IS_TOUCH_DEVICE = typeof matchMedia === 'function' && matchMedia('(hover: none) and (pointer: coarse)').matches;

// ¿Debe la interfaz mostrar los controles táctiles? Igual que el CSS de los
// botones táctiles: dispositivo táctil O ventana estrecha (en pantallas muy
// pequeñas tampoco hay teclado físico). Se usa para los textos de la pausa.
function hasTouchUI() {
  return IS_TOUCH_DEVICE || (typeof matchMedia === 'function' && matchMedia('(max-width: 700px)').matches);
}
let aiTargetY = HEIGHT / 2; // a dónde apunta la IA (se actualiza con retraso)
let aiReactionTimer = 0;    // fotogramas restantes hasta que la IA reaccione

// 4. Teclado: guardamos qué teclas están pulsadas
const keys = {};
const activePointers = {};     // dedos activos sobre el lienzo (pointerId -> lado)
const pointerPositions = {};   // última posición Y de cada dedo (pointerId -> clientY)
const pointerStartY = {};      // posición Y inicial de cada dedo al tocar (pointerId -> clientY)
const paddleStartY = {};       // posición inicial de cada pala al tocar (side -> paddle.y)

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  // Si estamos escribiendo en un campo de texto (p. ej. los nombres),
  // no lanzamos los atajos del juego para no interferir con la escritura.
  const tag = event.target && event.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  keys[key] = true;

  // Evitamos que las flechas muevan la página
  if (key === 'arrowup' || key === 'arrowdown' || key === ' ') {
    event.preventDefault();
  }

  if (key === ' ') {
    handleSpace();
  }

  if (key === 'p') {
    togglePause();
  }

  if (key === 'm') {
    toggleMute();
  }

  if (key === 'escape') {
    // ESC cierra el diálogo de confirmación primero, luego modales o menú
    if (!confirmModal.classList.contains('hidden')) {
      closeConfirm();
    } else if (!statsModal.classList.contains('hidden')) {
      closeStats();
    } else if (!controlsModal.classList.contains('hidden')) {
      closeControls();
    } else if (!personalizeModal.classList.contains('hidden')) {
      closePersonalize();
    } else if (!soundModal.classList.contains('hidden')) {
      closeSound();
    } else if (!languageModal.classList.contains('hidden')) {
      closeLanguage();
    } else if (!aboutModal.classList.contains('hidden')) {
      closeAbout();
    } else {
      quitToMenu();
    }
  }
});

document.addEventListener('keyup', (event) => {
  keys[event.key.toLowerCase()] = false;
});

// 5. Sonido (Web Audio API)
let audioCtx = null;
let musicVolume = 1;   // volumen de la música de fondo (bucle de ambiente)
let effectsVolume = 1; // volumen de los efectos (rebotes, puntos, pausa, victoria/derrota/récord)
let muted = false;            // true mientras el sonido está silenciado con la tecla M
let savedMusicVolume = 1;     // volumen de música antes de silenciar
let savedEffectsVolume = 1;   // volumen de efectos antes de silenciar
let musicEnabled = true;      // ¿está encendida la música de fondo?
let effectsEnabled = true;    // ¿están encendidos los efectos de sonido?
let effectsVolumeBeforeOff = 1; // volumen de efectos antes de apagarlos con el botón

// El navegador solo permite sonido después de una acción del usuario
// (pulsar una tecla o hacer clic), por eso lo activamos al empezar.
function ensureAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Reproduce un pitido con la frecuencia y duración indicadas.
// `when` permite programar notas en el reloj de audio (para melodías sin desfases).
function beep(frequency, duration = 0.08, type = 'square', level = 0.2, when = 0, category = 'effect') {
  const vol = category === 'music' ? musicVolume : effectsVolume;
  if (!audioCtx || vol === 0) return;

  const t0 = audioCtx.currentTime + when;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  // Ataque muy rápido y caída suave para evitar el "clic" al cortar
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(level * vol, t0 + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start(t0);
  oscillator.stop(t0 + duration + 0.01);
}

// Sonidos concretos del juego
function playWallBounce() {
  beep(160, 0.08, 'square', 0.16); // rebote en pared: tono grave
}

// Sonido de arranque tipo "encendido arcade": barrido ascendente de tono
function playStartupSound() {
  if (!audioCtx || effectsVolume === 0) return;
  const t0 = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(140, t0);
  osc.frequency.exponentialRampToValueAtTime(880, t0 + 0.28);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.2 * effectsVolume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.36);
}

// Sonido de apagado: barrido descendente (el inverso del encendido)
function playPowerOffSound() {
  if (!audioCtx || effectsVolume === 0) return;
  const t0 = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(880, t0);
  osc.frequency.exponentialRampToValueAtTime(140, t0 + 0.3);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.2 * effectsVolume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.36);
}

// Pequeño "clic" de interfaz al pulsar los botones del menú.
// `frequency` permite un tono distinto según la jerarquía del botón.
function playClick(frequency = 800) {
  ensureAudio(); // el primer clic del usuario activa el AudioContext (requiere gesto)
  beep(frequency, 0.04, 'square', 0.1);
}

function playPaddleBounce() {
  beep(520, 0.07, 'square', 0.22); // tu pala: tono medio-alto
}

function playRivalBounce() {
  beep(390, 0.07, 'square', 0.22); // la pala del rival: tono más grave
}

function playScore() {
  beep(660, 0.14, 'sawtooth', 0.22); // punto marcado: tono agudo
}

function playWin() {
  // Melodía ascendente (Do-Mi-Sol-Do). Sigue el volumen de EFECTOS, no el de
  // música: es un aviso de partida, no música de fondo.
  beep(523, 0.14, 'square', 0.22, 0, 'effect');
  beep(659, 0.14, 'square', 0.22, 0.15, 'effect');
  beep(784, 0.18, 'square', 0.22, 0.30, 'effect');
  beep(1047, 0.25, 'square', 0.26, 0.45, 'effect');
}

function playLose() {
  // Melodía descendente (Sol-Mi-Do), también con el volumen de efectos.
  beep(392, 0.16, 'sawtooth', 0.2, 0, 'effect');
  beep(330, 0.16, 'sawtooth', 0.2, 0.18, 'effect');
  beep(262, 0.28, 'sawtooth', 0.2, 0.36, 'effect');
}

// Melodía de celebración al batir un récord (volumen de efectos).
function playRecord() {
  beep(523, 0.1, 'square', 0.25, 0, 'effect');      // Do
  beep(659, 0.1, 'square', 0.25, 0.12, 'effect');   // Mi
  beep(784, 0.1, 'square', 0.25, 0.24, 'effect');   // Sol
  beep(1047, 0.15, 'square', 0.3, 0.36, 'effect');  // Do agudo
  beep(1319, 0.25, 'square', 0.3, 0.50, 'effect');  // Mi agudo
}

// Música de fondo: varios temas generados con osciladores (melodía + bajo)
const MUSIC_GAIN = 0.16; // volumen base de la música (se multiplica por musicVolume)

// Filtro lowpass que "abre" la música al empezar (fundido de graves → sonido completo)
const MUSIC_OPEN_START = 200;  // Hz al empezar: solo se oyen los graves
const MUSIC_OPEN_END = 20000;  // Hz al final: sonido completo (prácticamente sin filtro)
const MUSIC_OPEN_TIME = 1.5;   // segundos que tarda en abrirse

// Cada tema define su ritmo (step, en segundos), su instrumentación (tipo de
// onda por voz), su ataque y sus voces (melodía, acompañamiento opcional y bajo).
// 0 = silencio. Los tres temas suenan claramente distintos entre sí.
const MUSIC_THEMES = {
  clasico: {
    label: 'Clásico',
    step: 0.24,
    melodyType: 'triangle', // flauta suave, legato
    bassType: 'sine',
    attack: 0.02,
    // Arpegios sobre la cadencia La menor → Fa → Sol → Mi menor
    melody: [
      440.00, 523.25, 659.25, 523.25,   // La Do Mi Do
      349.23, 440.00, 523.25, 440.00,   // Fa La Do La
      392.00, 493.88, 587.33, 493.88,   // Sol Si Re Si
      329.63, 392.00, 493.88, 392.00    // Mi Sol Si Sol
    ],
    bass: [
      110.00, 0, 0, 0, 87.31, 0, 0, 0,
      98.00, 0, 0, 0, 82.41, 0, 0, 0
    ]
  },
  energetico: {
    label: 'Energético',
    step: 0.19,
    melodyType: 'square', // 8-bit afilado y directo
    bassType: 'square',
    attack: 0.005,         // ataque casi instantáneo = pegada
    // Escala de Mi menor subiendo y bajando, con un bajo machacón
    melody: [
      329.63, 369.99, 392.00, 440.00,   // Mi Fa# Sol La
      440.00, 392.00, 369.99, 329.63,   // La Sol Fa# Mi
      329.63, 369.99, 392.00, 440.00,   // Mi Fa# Sol La
      493.88, 440.00, 392.00, 329.63    // Si La Sol Mi
    ],
    harmonyType: 'square',
    harmonyLevel: 0.18,     // quinta por encima en los tiempos fuertes
    harmony: [
      0, 0, 659.25, 0, 0, 0, 659.25, 0,
      0, 0, 659.25, 0, 0, 0, 587.33, 0
    ],
    bass: [
      82.41, 82.41, 0, 82.41, 82.41, 82.41, 0, 82.41,
      73.42, 73.42, 0, 73.42, 73.42, 73.42, 0, 73.42
    ]
  },
  tranquilo: {
    label: 'Tranquilo',
    step: 0.32,
    melodyType: 'sine', // pad suave, sin armónicos
    bassType: 'sine',
    attack: 0.1,         // entrada lenta, como un suspiro
    sustain: 2,          // notas largas que se solapan = colchón ambiental continuo
    // Pentatónica de La menor fluida: sube y baja suavemente, sin largos silencios
    melody: [
      440.00, 523.25, 587.33, 659.25,   // La Do Re Mi (subida suave)
      587.33, 523.25, 440.00, 0,        // Re Do La (bajada y respiro)
      392.00, 440.00, 523.25, 587.33,   // Sol La Do Re
      523.25, 440.00, 392.00, 0         // Do La Sol
    ],
    harmonyType: 'sine',
    harmonyLevel: 0.15,
    harmony: [
      220.00, 0, 0, 0, 261.63, 0, 0, 0,
      196.00, 0, 0, 0, 220.00, 0, 0, 0
    ],
    bass: [
      110.00, 0, 0, 0, 82.41, 0, 0, 0,  // La → Mi (raíz y quinta graves)
      98.00, 0, 0, 0, 73.42, 0, 0, 0    // Sol → Re
    ]
  }
};

let currentTheme = 'clasico'; // tema musical seleccionado

// Cómo cambia la música según la dificultad de la IA (en 2 jugadores usa 'normal').
// La variación de tempo es sutil: apenas un ±8 %, para que el cambio se note
// pero no marea ni suene atropellado.
const DIFFICULTY_MUSIC = {
  facil:   { tempo: 1.08, intensity: 0.85 }, // un poco más lento y suave
  normal:  { tempo: 1.0,  intensity: 1.0 },
  dificil: { tempo: 0.92, intensity: 1.12 }  // un poco más rápido e intenso
};

let musicOn = false;   // true mientras la música de fondo está sonando
let musicGain = null;  // nodo de volumen de la música (para ajustarla por separado)
let musicFilter = null; // filtro lowpass que se abre al empezar la música
let musicStep = 0;     // paso actual de la secuencia
let musicNextTime = 0; // instante (reloj de audio) de la próxima nota
let musicTimer = null; // temporizador que programa las notas por adelantado

// Empieza la música de fondo (solo si el audio está disponible y está activada)
function startBackgroundMusic() {
  if (!musicEnabled || musicOn) return;
  ensureAudio(); // crea/reanuda el contexto de audio (necesario tras volver a primer plano)
  if (!audioCtx) return;
  stopMusicPreview(); // si había una vista previa sonando, la cortamos
  musicOn = true;
  musicGain = audioCtx.createGain();
  musicGain.gain.value = musicVolume * MUSIC_GAIN;

  // Filtro lowpass: arranca cerrado (solo graves, sonido apagado)
  // y se abre gradualmente hasta dejar pasar todo el espectro.
  musicFilter = audioCtx.createBiquadFilter();
  musicFilter.type = 'lowpass';
  musicFilter.frequency.setValueAtTime(MUSIC_OPEN_START, audioCtx.currentTime);
  musicFilter.frequency.exponentialRampToValueAtTime(
    MUSIC_OPEN_END,
    audioCtx.currentTime + MUSIC_OPEN_TIME
  );
  musicFilter.Q.value = 0.7;

  musicGain.connect(musicFilter);
  musicFilter.connect(audioCtx.destination);
  musicNextTime = audioCtx.currentTime + 0.05;
  musicStep = 0;
  musicTimer = setInterval(scheduleMusic, 50);
}

// Detiene la música de fondo
function stopBackgroundMusic() {
  if (!musicOn) return;
  musicOn = false;
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (musicGain) {
    musicGain.disconnect();
    musicGain = null;
  }
  if (musicFilter) {
    musicFilter.disconnect();
    musicFilter = null;
  }
}

// Programa las notas de música hasta ~0,2 s por delante del reloj de audio.
// El tempo y la intensidad cambian según la dificultad de la IA.
function scheduleMusic() {
  if (!musicOn || !audioCtx) return;
  const musicTheme = MUSIC_THEMES[currentTheme];
  const music = DIFFICULTY_MUSIC[mode === 'ai' ? difficulty : 'normal'];
  const stepDuration = musicTheme.step * music.tempo;
  while (musicNextTime < audioCtx.currentTime + 0.2) {
    scheduleMusicStep(musicTheme, musicStep, musicNextTime, stepDuration, music.intensity);
    musicNextTime += stepDuration;
    musicStep = (musicStep + 1) % musicTheme.melody.length;
  }
}

// Programa la melodía, el acompañamiento (si lo hay) y el bajo de un paso
function scheduleMusicStep(musicTheme, step, when, stepDuration, intensity, destination = null) {
  const attack = musicTheme.attack || 0.02;
  const sustain = musicTheme.sustain || 1; // >1 = notas largas que se solapan (legato/pad)
  const noteDuration = stepDuration * sustain;
  playMusicNote(musicTheme.melody[step], when, musicTheme.melodyType || 'triangle', 0.5 * intensity, noteDuration, attack, destination);
  if (musicTheme.harmony) {
    playMusicNote(musicTheme.harmony[step], when, musicTheme.harmonyType || 'triangle', (musicTheme.harmonyLevel || 0.2) * intensity, noteDuration, attack, destination);
  }
  playMusicNote(musicTheme.bass[step], when, musicTheme.bassType || 'sine', 0.4 * intensity, noteDuration, attack, destination);
}

function playMusicNote(frequency, when, type, level, duration, attack = 0.02, destination = null) {
  if (!frequency) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;

  // Ataque y caída configurables: cada tema tiene su carácter (agudo para lo
  // enérgico, suave para lo tranquilo) sin producir "clics" al empezar o cortar.
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(level, when + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration * 0.95);

  osc.connect(gain);
  gain.connect(destination || musicGain);
  osc.start(when);
  osc.stop(when + duration);
}

function handleVolumeChange() {
  musicVolume = Number(musicVolumeSlider.value);
  effectsVolume = Number(effectsVolumeSlider.value);
  muted = false; // al mover un deslizador salimos del modo silencio
  updateSoundButton();
  // El deslizador también sirve para quitar el volumen: sincronizamos el botón ON/OFF
  effectsEnabled = effectsVolume > 0;
  updateEffectsToggleBtn();
  try {
    localStorage.setItem('pong-music-volume', String(musicVolume));
    localStorage.setItem('pong-effects-volume', String(effectsVolume));
  } catch (error) {
    // si el navegador bloquea localStorage, seguimos sin guardar
  }
  // Ajustamos la música de fondo en tiempo real si está sonando
  if (musicGain) musicGain.gain.value = musicVolume * MUSIC_GAIN;
}

// Activa o desactiva la música de fondo y guarda la preferencia
function setMusicEnabled(enabled) {
  musicEnabled = enabled;
  try {
    localStorage.setItem('pong-music-enabled', String(enabled));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  updateMusicToggleBtn();
  if (enabled) {
    // Solo arrancamos si estamos en plena partida (si no, lo hará al jugar)
    if (state === 'playing' && !paused) startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
}

function updateMusicToggleBtn() {
  musicToggleBtn.textContent = musicEnabled ? 'ON' : 'OFF';
  musicToggleBtn.classList.toggle('off', !musicEnabled);
  musicToggleBtn.setAttribute('aria-pressed', String(musicEnabled));
  musicToggleBtn.title = musicEnabled ? 'Apagar la música de fondo' : 'Encender la música de fondo';
}

// Activa o desactiva los efectos de sonido (el botón ON/OFF de la fila Efectos)
function setEffectsEnabled(enabled) {
  effectsEnabled = enabled;
  try {
    localStorage.setItem('pong-effects-enabled', String(enabled));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  if (!enabled) {
    // Recordamos el volumen actual y lo quitamos por completo
    effectsVolumeBeforeOff = effectsVolume;
    effectsVolume = 0;
  } else {
    // Restauramos el volumen que había antes de apagarlo
    effectsVolume = effectsVolumeBeforeOff > 0 ? effectsVolumeBeforeOff : 1;
  }
  effectsVolumeSlider.value = String(effectsVolume);
  updateEffectsToggleBtn();
}

function updateEffectsToggleBtn() {
  effectsToggleBtn.textContent = effectsEnabled ? 'ON' : 'OFF';
  effectsToggleBtn.classList.toggle('off', !effectsEnabled);
  effectsToggleBtn.setAttribute('aria-pressed', String(effectsEnabled));
  effectsToggleBtn.title = effectsEnabled ? 'Apagar los efectos de sonido' : 'Encender los efectos de sonido';
}

// Cambia el tema musical y lo guarda
function setMusicTheme(musicTheme) {
  if (!MUSIC_THEMES[musicTheme]) return;
  currentTheme = musicTheme;
  try {
    localStorage.setItem('pong-music-theme', musicTheme);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  updateThemeButtons();
  // Si la música está sonando, reiniciamos el bucle con el nuevo tema
  if (musicOn) {
    stopBackgroundMusic();
    startBackgroundMusic();
  }
}

function updateThemeButtons() {
  themeClasicoBtn.classList.toggle('selected', currentTheme === 'clasico');
  themeEnergeticoBtn.classList.toggle('selected', currentTheme === 'energetico');
  themeTranquiloBtn.classList.toggle('selected', currentTheme === 'tranquilo');
}

// Vista previa de ~3 segundos de un tema musical al tocarlo en Personalizar,
// sin necesidad de entrar en partida. Usa un nodo de ganancia propio,
// independiente del bucle de fondo, para no interferir con la música en curso.
let previewGain = null;
let previewStopTimer = null;
const PREVIEW_LENGTH = 3; // segundos que dura la vista previa

function previewMusicTheme(theme) {
  const musicTheme = MUSIC_THEMES[theme];
  if (!musicTheme) return;
  ensureAudio();
  if (!audioCtx) return;
  stopMusicPreview();

  previewGain = audioCtx.createGain();
  // La vista previa se oye siempre (aunque el volumen de música esté a 0),
  // respetando el volumen si está subido.
  const level = (musicVolume > 0 ? musicVolume : 0.5) * MUSIC_GAIN;
  previewGain.gain.value = level;
  previewGain.connect(audioCtx.destination);

  const stepDuration = musicTheme.step;
  const startTime = audioCtx.currentTime + 0.06;
  let step = 0;
  let when = startTime;
  while (when < startTime + PREVIEW_LENGTH) {
    scheduleMusicStep(musicTheme, step, when, stepDuration, 1, previewGain);
    when += stepDuration;
    step = (step + 1) % musicTheme.melody.length;
  }

  // Fundido de salida suave al final de la vista previa
  previewGain.gain.setValueAtTime(level, startTime + PREVIEW_LENGTH - 0.25);
  previewGain.gain.linearRampToValueAtTime(0.0001, startTime + PREVIEW_LENGTH);

  previewStopTimer = setTimeout(stopMusicPreview, (PREVIEW_LENGTH + 0.3) * 1000);
}

function stopMusicPreview() {
  if (previewStopTimer) {
    clearTimeout(previewStopTimer);
    previewStopTimer = null;
  }
  if (previewGain) {
    try { previewGain.disconnect(); } catch (error) { /* ya estaba desconectado */ }
    previewGain = null;
  }
}

// Silencia o restaura el sonido con la tecla M (recuerda los volúmenes anteriores)
function toggleMute() {
  if (!muted) {
    // Guardamos los volúmenes actuales y silenciamos todo
    savedMusicVolume = musicVolume;
    savedEffectsVolume = effectsVolume;
    musicVolume = 0;
    effectsVolume = 0;
    muted = true;
  } else {
    // Restauramos los volúmenes que había antes de silenciar
    musicVolume = savedMusicVolume;
    effectsVolume = savedEffectsVolume;
    muted = false;
  }

  // Sincronizamos deslizadores, botones ON/OFF y la música de fondo si está sonando
  musicVolumeSlider.value = String(musicVolume);
  effectsVolumeSlider.value = String(effectsVolume);
  effectsEnabled = effectsVolume > 0;
  updateEffectsToggleBtn();
  if (musicGain) musicGain.gain.value = musicVolume * MUSIC_GAIN;
  updateSoundButton(); // sincroniza el botón táctil de sonido
  showToast(muted ? t('toast.muted') : t('toast.unmuted'));
}

// 6. Funciones auxiliares
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScoreboard() {
  score1El.textContent = score1;
  score2El.textContent = score2;

  // Resaltamos la tarjeta del jugador que va ganando
  const lead = score1 === score2 ? 0 : (score1 > score2 ? 1 : 2);
  score1El.closest('.score').classList.toggle('leading', lead === 1);
  score2El.closest('.score').classList.toggle('leading', lead === 2);

  // Pequeño "pop" en el número que cambia
  if (score1 !== lastScore1) popScore(score1El);
  if (score2 !== lastScore2) popScore(score2El);
  lastScore1 = score1;
  lastScore2 = score2;

  // Mostramos el aviso cuando alguien está a un punto de ganar la partida
  const atGamePoint = score1 === bestOf - 1 || score2 === bestOf - 1;
  gamePointEl.classList.toggle('hidden', !atGamePoint);
}

// Anima el número de la puntuación al cambiar
function popScore(el) {
  el.classList.remove('pop');
  void el.offsetWidth; // fuerza reiniciar la animación si ya estaba activa
  el.classList.add('pop');
}

// Muestra el nivel de dificultad de la IA en el marcador durante la partida
function updateDifficultyBadge() {
  const show = mode === 'ai' && state === 'playing';
  difficultyBadge.classList.toggle('hidden', !show);
  if (show) {
    difficultyBadge.textContent = difficultyName(difficulty);
  }
}

// Sacude la zona de juego (animación definida en style.css)
function shakeScreen(big = false) {
  const className = big ? 'shake-big' : 'shake';
  stage.classList.remove('shake', 'shake-big', 'shake-hit');
  void stage.offsetWidth; // fuerza reiniciar la animación si ya estaba activa
  stage.classList.add(className);
}

// Vibración sutil al golpear la pelota con la pala.
// `intensity` escala la amplitud según la velocidad de la pelota (1 = suave).
function shakeHit(intensity = 1) {
  const amp = Math.max(1, Math.round(2 * intensity)); // píxeles de desplazamiento
  stage.style.setProperty('--hit-amp', amp + 'px');
  stage.classList.remove('shake', 'shake-big', 'shake-hit');
  void stage.offsetWidth; // fuerza reiniciar la animación si ya estaba activa
  stage.classList.add('shake-hit');
}

// Intensidad de la vibración según la velocidad actual de la pelota:
// 0.5 cuando va lenta (recién sacada) y hasta 1.5 cerca del tope de velocidad.
// Así la vibración crece a medida que la partida se acelera.
function speedIntensity(speed) {
  const ratio = clamp(speed / MAX_BALL_SPEED, 0, 1);
  return 0.5 + ratio; // 0.5 … 1.5
}

// Fracción 0..1 de "sobrecalentamiento": cuánto ha superado la bola el tope normal.
function overdriveFactor(speed) {
  if (speed <= MAX_BALL_SPEED) return 0;
  return clamp((speed - MAX_BALL_SPEED) / (RALLY_MAX_SPEED - MAX_BALL_SPEED), 0, 1);
}

// Mezcla un color "r, g, b" hacia el tono "caliente" de la paleta actual,
// según la intensidad del sobrecalentamiento (0 = color original, 1 = caliente).
function mixOverdrive(rgbString, over) {
  const target = overdriveRgb().split(',').map(Number);
  const [r, g, b] = rgbString.split(',').map(Number);
  const rr = Math.round(r + (target[0] - r) * over);
  const gg = Math.round(g + (target[1] - g) * over);
  const bb = Math.round(b + (target[2] - b) * over);
  return `${rr}, ${gg}, ${bb}`;
}

function handleSpace() {
  // ESPACIO empieza la partida desde el menú o la configuración, y la reinicia
  // tanto en plena partida como en pausa.
  requestRestart();
}

// Reinicia la partida. Si hay una en curso, pide confirmación antes de reiniciar.
function requestRestart() {
  if (state === 'playing') {
    // Congela la partida mientras decides; al cancelar se reanuda con cuenta atrás 3-2-1.
    if (!paused) setPaused(true);
    // Estado visual del botón de reiniciar mientras el diálogo está abierto.
    touchRestartBtn.classList.add('pending');
    openConfirm(
      t('confirm.restartTitle'),
      t('confirm.restartMessage'),
      t('confirm.restartOk'),
      () => {
        touchRestartBtn.classList.remove('pending');
        startGame();
      },
      'danger',
      () => {
        touchRestartBtn.classList.remove('pending');
        setPaused(false);
      }
    );
    return;
  }
  startGame();
}

function togglePause() {
  if (state !== 'playing') return; // solo se puede pausar durante la partida
  setPaused(!paused);
}

// Pone o quita la pausa (con su pitido) solo si el juego está en marcha
function setPaused(newPaused) {
  if (state !== 'playing' || paused === newPaused) return;
  paused = newPaused;
  // Al reanudar (siempre es un gesto del usuario: tecla o toque), reanudamos el
  // AudioContext. iOS lo suspende al cambiar de app o perder el foco, y si no lo
  // despertamos aquí, el sonido quedaría mudo tras volver.
  if (!newPaused) ensureAudio();
  beep(paused ? 250 : 500, 0.08, 'square', 0.2); // grave al pausar, agudo al reanudar
  if (paused) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic();
    // Al reanudar no se lanza la pelota de golpe: cuenta atrás 3-2-1 primero.
    // Solo si no había ya una cuenta atrás en curso (p. ej. un saque).
    if (countdown === 0) {
      countdown = 3;
      launchTimer = 60;
      resumeCountdown = true;
    }
  }
  updatePauseButton();
}

// Botón de pausa del móvil: muestra ⏸ jugando y ▶ (atenuado) en pausa.
function updatePauseButton() {
  touchPauseBtn.classList.toggle('off', paused);
  touchPauseIcon.className = paused ? 'icon icon-play' : 'icon icon-pause';
  touchPauseBtn.setAttribute('aria-label', t(paused ? 'touch.resume' : 'touch.pause'));
}

// Botón de sonido del móvil: altavoz con volumen, o altavoz tachado (atenuado)
// cuando todo está silenciado.
function updateSoundButton() {
  touchSoundBtn.classList.toggle('off', muted);
  touchSoundIcon.className = muted ? 'icon icon-mute' : 'icon icon-sound';
  touchSoundBtn.setAttribute('aria-label', t(muted ? 'touch.unmute' : 'touch.mute'));
  touchSoundBtn.setAttribute('aria-pressed', String(muted));
}

// Pausa automáticamente al cambiar de pestaña o perder el foco.
// Solo pausa: nunca reanuda sola, para no sorprender al volver.
function pauseForLostFocus() {
  setPaused(true);
  // Al perder el foco, el navegador puede "perderse" los eventos keyup/pointerup,
  // dejando teclas o dedos atascados. Limpiamos todo el estado de entrada.
  for (const key in keys) delete keys[key];
  for (const id in activePointers) delete activePointers[id];
  for (const id in pointerPositions) delete pointerPositions[id];
}

// Muestra el menú principal (Jugar / Controles / Estadísticas)
function showMainMenu() {
  state = 'start';
  menuMainEl.classList.remove('hidden');
  menuSetupEl.classList.add('hidden');
  restartBtn.classList.add('hidden');
  overlayTitle.classList.add('hidden'); // el título "PONG" grande ya está arriba del marcador
  overlaySubtitle.classList.add('hidden'); // menú principal sin subtítulo
  overlay.classList.remove('hidden');
}

// Muestra la pantalla de configuración de la partida
function showSetup() {
  state = 'setup';
  menuMainEl.classList.add('hidden');
  menuSetupEl.classList.remove('hidden');
  overlayTitle.classList.add('hidden'); // sin título redundante: el "PONG" grande ya está arriba
  overlaySubtitle.classList.remove('hidden');
  overlaySubtitle.textContent = t('setup.subtitle');
  overlay.classList.remove('hidden');
}

// Oculta los menús y deja solo el botón de continuar/reiniciar
function showResultScreen() {
  menuMainEl.classList.add('hidden');
  menuSetupEl.classList.add('hidden');
  restartBtn.classList.remove('hidden');
}

// Vuelve al menú principal, descartando la partida en curso.
// Si hay una partida sin terminar, pide confirmación antes de salir.
function quitToMenu() {
  if (state === 'start') return; // ya estamos en el menú principal
  if (state === 'playing') {
    // Congela la partida mientras decides; al cancelar se reanuda con cuenta atrás 3-2-1.
    if (!paused) setPaused(true);
    openConfirm(
      t('confirm.quitTitle'),
      t('confirm.quitMessage'),
      t('confirm.quitOk'),
      doQuitToMenu,
      'danger',
      () => setPaused(false)
    );
    return;
  }
  doQuitToMenu();
}

function doQuitToMenu() {
  stopBackgroundMusic();
  playPowerOffSound();
  paused = false;
  score1 = 0;
  score2 = 0;
  updateScoreboard();
  resetBall(); // deja la pelota centrada y limpia la estela
  showMainMenu();
  updateDifficultyBadge();
  touchControlsEl.classList.remove('in-game'); // ocultamos los botones táctiles
}

function setMode(newMode) {
  mode = newMode;
  modePvpBtn.classList.toggle('selected', mode === 'pvp');
  modeAiBtn.classList.toggle('selected', mode === 'ai');

  // El selector de lado y el de dificultad solo tienen sentido contra la IA
  sideSelector.classList.toggle('hidden', mode !== 'ai');
  difficultySelector.classList.toggle('hidden', mode !== 'ai');
  difficultyDescEl.classList.toggle('hidden', mode !== 'ai');

  if (mode === 'pvp') {
    // En 2 jugadores no hay dificultad: pala y pelota equilibradas (valores "normal")
    paddleHeight = DIFFICULTY.normal.paddleHeight;
    ballSpeed = DIFFICULTY.normal.ballSpeed;
    ballSpeedUp = DIFFICULTY.normal.speedUp;
    paddle1.y = HEIGHT / 2 - paddleHeight / 2;
    paddle2.y = HEIGHT / 2 - paddleHeight / 2;
  } else {
    // Aplicamos la dificultad elegida (pala, pelota y comportamiento de la IA)
    setDifficulty(difficulty);
  }

  updateScoreLabels();
}

function updateScoreLabels() {
  if (mode === 'ai') {
    const iaLabel = t('stats.ia');
    label1El.textContent = playerSide === 'left' ? humanName() : iaLabel;
    label2El.textContent = playerSide === 'left' ? iaLabel : humanName();
  } else {
    label1El.textContent = player1Name;
    label2El.textContent = player2Name;
  }
}

// Nombres personalizados de los jugadores (guardados en el navegador)
function updatePlayerNames() {
  player1Name = name1Input.value.trim() || 'Jugador 1';
  player2Name = name2Input.value.trim() || 'Jugador 2';
  saveNames();
  updateScoreLabels();
}

function saveNames() {
  try {
    localStorage.setItem('pong-names', JSON.stringify({ p1: player1Name, p2: player2Name }));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
}

function loadNames() {
  try {
    const saved = JSON.parse(localStorage.getItem('pong-names'));
    if (saved) {
      player1Name = saved.p1 || 'Jugador 1';
      player2Name = saved.p2 || 'Jugador 2';
    }
  } catch (error) {
    // si no se puede leer, usamos los nombres por defecto
  }
}

function setPlayerSide(side) {
  playerSide = side;
  sideLeftBtn.classList.toggle('selected', playerSide === 'left');
  sideRightBtn.classList.toggle('selected', playerSide === 'right');
  updateScoreLabels();
}

// Nombre del jugador humano contra la IA. Siempre es el Jugador 1 (tu nombre),
// sin importar el lado que elijas: la IA es el rival, no el "Jugador 2".
function humanName() {
  return player1Name;
}

function setBestOf(newBestOf) {
  bestOf = newBestOf;
  bestOf1Btn.classList.toggle('selected', bestOf === 1);
  bestOf3Btn.classList.toggle('selected', bestOf === 3);
  bestOf5Btn.classList.toggle('selected', bestOf === 5);
}

function setDifficulty(newDifficulty) {
  difficulty = newDifficulty;
  paddleHeight = DIFFICULTY[difficulty].paddleHeight;
  ballSpeed = DIFFICULTY[difficulty].ballSpeed;
  ballSpeedUp = DIFFICULTY[difficulty].speedUp;
  aiSpeed = DIFFICULTY[difficulty].aiSpeed;
  aiReactionDelay = DIFFICULTY[difficulty].reactionDelay;
  aiAimError = DIFFICULTY[difficulty].aimError;
  aiReactionJitter = DIFFICULTY[difficulty].reactionJitter;

  // Recolocamos las palas centradas con su nueva altura
  paddle1.y = HEIGHT / 2 - paddleHeight / 2;
  paddle2.y = HEIGHT / 2 - paddleHeight / 2;

  diffFacilBtn.classList.toggle('selected', difficulty === 'facil');
  diffNormalBtn.classList.toggle('selected', difficulty === 'normal');
  diffDificilBtn.classList.toggle('selected', difficulty === 'dificil');
  difficultyDescEl.textContent = DIFFICULTY[difficulty].description;

}

// Estadísticas de victorias (guardadas en el navegador)
function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem('pong-stats'));
    if (saved) {
      if (saved.humanWins !== undefined) {
        // Formato nuevo: contadores separados por modo
        stats.humanWins = saved.humanWins || 0;
        stats.iaWins = saved.iaWins || 0;
        stats.p1Wins = saved.p1Wins || 0;
        stats.p2Wins = saved.p2Wins || 0;
      } else {
        // Formato antiguo: el viejo "p1" mezclaba victorias vs IA y del Jugador 1;
        // lo atribuimos a las victorias contra la IA (no se puede separar con certeza).
        stats.humanWins = saved.p1 || 0;
        stats.iaWins = saved.ia || 0;
        stats.p1Wins = 0;
        stats.p2Wins = saved.p2 || 0;
      }
      if (saved.streaks) {
        stats.streaks = {
          facil: saved.streaks.facil || 0,
          normal: saved.streaks.normal || 0,
          dificil: saved.streaks.dificil || 0
        };
      }
      if (saved.bestStreaks) {
        stats.bestStreaks = {
          facil: saved.bestStreaks.facil || 0,
          normal: saved.bestStreaks.normal || 0,
          dificil: saved.bestStreaks.dificil || 0
        };
      }
      if (saved.winsByDifficulty) {
        stats.winsByDifficulty = {
          facil: saved.winsByDifficulty.facil || 0,
          normal: saved.winsByDifficulty.normal || 0,
          dificil: saved.winsByDifficulty.dificil || 0
        };
      }
      stats.playTimeMs = saved.playTimeMs || 0;
    }
  } catch (error) {
    // si no se puede leer, empezamos desde cero
  }
}

function saveStats() {
  try {
    localStorage.setItem('pong-stats', JSON.stringify(stats));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
}

// Confirmación visual personalizada (en vez del confirm() del navegador).
// Es reutilizable: se le pasa el texto y la acción a ejecutar al confirmar.
// `variant` es 'danger' (rojo, para borrar) o 'warning' (ámbar, para restablecer).
let confirmCallback = null;
let confirmCancelCallback = null; // acción al cancelar (Cancelar, ESC o clic fuera)

function openConfirm(title, message, okLabel, onConfirm, variant = 'danger', onCancel = null) {
  confirmTitleEl.textContent = title;
  confirmMessageEl.textContent = message;
  confirmOkBtn.textContent = okLabel;
  confirmCallback = onConfirm;
  confirmCancelCallback = onCancel;
  confirmModal.classList.toggle('warning', variant === 'warning');
  confirmModal.classList.remove('hidden');
}

function closeConfirm(runCancel = true) {
  const cancelCb = confirmCancelCallback;
  confirmModal.classList.add('hidden');
  confirmModal.classList.remove('warning');
  confirmCallback = null;
  confirmCancelCallback = null;
  if (runCancel && cancelCb) cancelCb();
}

function resetStats() {
  openConfirm(
    t('confirm.resetStats'),
    t('confirm.cannotUndo'),
    t('confirm.delete'),
    () => {
      stats = {
        humanWins: 0,
        iaWins: 0,
        p1Wins: 0,
        p2Wins: 0,
        playTimeMs: 0,
        streaks: { facil: 0, normal: 0, dificil: 0 },
        bestStreaks: { facil: 0, normal: 0, dificil: 0 },
        winsByDifficulty: { facil: 0, normal: 0, dificil: 0 }
      };
      saveStats();
      renderStats(); // actualizamos el modal de estadísticas en el que se pulsa el botón
    }
  );
}

// Restablece todos los ajustes guardados y las estadísticas a sus valores por defecto
function resetAllSettings() {
  openConfirm(t('confirm.resetAll'), t('confirm.cannotUndo'), t('customize.resetAll'), doResetAll, 'danger');
}

function doResetAll() {
  // 1. Borramos todas las claves guardadas del juego
  try {
    [
      'pong-music-volume', 'pong-effects-volume', 'pong-volume',
      'pong-music-enabled', 'pong-effects-enabled', 'pong-music-theme', 'pong-stats', 'pong-names',
      'pong-color', 'pong-palette', 'pong-theme', 'pong-allow-portrait'
    ].forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    // si el navegador bloquea localStorage, seguimos con los valores por defecto
  }

  // 2. Devolvemos las variables en memoria a sus valores por defecto
  musicVolume = 1;
  effectsVolume = 1;
  muted = false;
  savedMusicVolume = 1;
  savedEffectsVolume = 1;
  musicEnabled = true;
  effectsEnabled = true;
  effectsVolumeBeforeOff = 1;
  currentTheme = 'clasico';
  paddleColor = '#ffffff';
  palette = 'verde';
  theme = 'system';
  allowPortrait = false;
  player1Name = 'Jugador 1';
  player2Name = 'Jugador 2';
  stats = {
    humanWins: 0,
    iaWins: 0,
    p1Wins: 0,
    p2Wins: 0,
    playTimeMs: 0,
    streaks: { facil: 0, normal: 0, dificil: 0 },
    bestStreaks: { facil: 0, normal: 0, dificil: 0 },
    winsByDifficulty: { facil: 0, normal: 0, dificil: 0 }
  };

  // 3. Sincronizamos toda la interfaz con los valores por defecto
  musicVolumeSlider.value = '1';
  effectsVolumeSlider.value = '1';
  updateMusicToggleBtn();
  updateEffectsToggleBtn();
  updateSoundButton(); // el sonido vuelve a estar activado
  updateThemeButtons();
  setPaddleColor(paddleColor);
  setPalette(palette);
  setTheme(theme);
  setAllowPortrait(allowPortrait);
  resizeCanvas(); // reaplicamos la resolución automática sin el tope anterior
  name1Input.value = player1Name;
  name2Input.value = player2Name;
  saveNames();
  updateScoreLabels();
  saveStats();

  showToast(t('toast.reset'));
}

// Pantalla de estadísticas
function openStats() {
  // Si estamos en plena partida, la pausamos (también detiene la música)
  setPaused(true);
  renderStats();
  statsModal.classList.remove('hidden');
}

function closeStats() {
  statsModal.classList.add('hidden');
}

function openControls() {
  setPaused(true); // pausa la partida (y detiene la música) si hay una en curso
  controlsModal.classList.remove('hidden');
}

function closeControls() {
  controlsModal.classList.add('hidden');
}

function openPersonalize() {
  setPaused(true); // pausa la partida (y detiene la música) si hay una en curso
  personalizeModal.classList.remove('hidden');
}

function closePersonalize() {
  personalizeModal.classList.add('hidden');
}

function openSound() {
  setPaused(true); // pausa la partida (y detiene la música) si hay una en curso
  soundModal.classList.remove('hidden');
}

function closeSound() {
  soundModal.classList.add('hidden');
}

function openLanguage() {
  setPaused(true); // pausa la partida (y detiene la música) si hay una en curso
  languageModal.classList.remove('hidden');
}

function closeLanguage() {
  languageModal.classList.add('hidden');
}

// --- Acerca de ---
// Versión por defecto para el navegador (PWA); en la app de escritorio se
// sustituye por la versión real que reporta el proceso principal de Electron.
let appVersion = '1.0.0';

function renderAbout() {
  if (aboutVersionEl) {
    aboutVersionEl.textContent = t('about.version', { v: appVersion || '—' });
  }
}

async function openAbout() {
  renderAbout();
  aboutModal.classList.remove('hidden');
  if (window.pongDesktop && window.pongDesktop.getVersion) {
    try {
      const version = await window.pongDesktop.getVersion();
      if (version) appVersion = version;
      renderAbout();
    } catch (error) {
      // Si falla (p. ej. no es Electron), mostramos la versión por defecto.
    }
  }
}

function closeAbout() {
  aboutModal.classList.add('hidden');
}

// Cambia el color de las palas y lo guarda
function setPaddleColor(color) {
  paddleColor = color;
  try {
    localStorage.setItem('pong-color', color);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  document.querySelectorAll('.color-swatch').forEach((swatch) => {
    swatch.classList.toggle('selected', swatch.dataset.color === color);
  });
}

// Cambia la paleta de color del tema (botones, títulos, brillos y estela) y la guarda
function setPalette(name) {
  if (!PALETTES[name]) return;
  palette = name;
  try {
    localStorage.setItem('pong-palette', name);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  document.body.classList.remove('palette-verde', 'palette-azul', 'palette-ambar', 'palette-rosa');
  document.body.classList.add('palette-' + name);
  paletteVerdeBtn.classList.toggle('selected', name === 'verde');
  paletteAzulBtn.classList.toggle('selected', name === 'azul');
  paletteAmbarBtn.classList.toggle('selected', name === 'ambar');
  paletteRosaBtn.classList.toggle('selected', name === 'rosa');
  updateThemeColor(); // color del navegador según tema y paleta
}

// Tema efectivo ('light' | 'dark') resolviendo la opción 'system':
// consulta el sistema operativo en cada llamada.
function resolvedTheme() {
  if (theme === 'system') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return theme;
}

// Color de la barra del navegador según el tema efectivo y la paleta
function updateThemeColor() {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) return;
  themeColor.setAttribute('content', resolvedTheme() === 'light' ? '#f4f4f7' : PALETTES[palette].hex);
}

// Cambia el tema (oscuro, claro o sistema) y lo guarda
function setTheme(mode) {
  theme = mode;
  try {
    localStorage.setItem('pong-theme', mode);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  applyTheme();
}

// Aplica el tema efectivo a la interfaz (clase del body, botones y color del navegador)
function applyTheme() {
  document.body.classList.toggle('light', resolvedTheme() === 'light');
  themeDarkBtn.classList.toggle('selected', theme === 'dark');
  themeLightBtn.classList.toggle('selected', theme === 'light');
  themeSystemBtn.classList.toggle('selected', theme === 'system');
  updateThemeColor();
}

// Activa o desactiva el modo vertical (jugar en retrato). Por defecto el juego
// pide girar el móvil; al desbloquearlo se oculta el aviso y se optimiza el layout.
function setAllowPortrait(value) {
  allowPortrait = value;
  try {
    localStorage.setItem('pong-allow-portrait', String(value));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  document.body.classList.toggle('allow-portrait', value);
  orientationLandscapeBtn.classList.toggle('selected', !value);
  orientationPortraitBtn.classList.toggle('selected', value);
  scheduleResize(); // el layout cambia (título/scoreboard) y hay que re-medir el lienzo
}

function renderStats() {
  const total = stats.humanWins + stats.iaWins + stats.p1Wins + stats.p2Wins;
  statsTotalEl.textContent = String(total);
  statsWinsEl.textContent = String(stats.humanWins);
  statsLossesEl.textContent = String(stats.iaWins);
  statsTimeEl.textContent = formatPlayTime(stats.playTimeMs);

  // Contra la IA: barra de porcentaje de victorias
  const iaGames = stats.humanWins + stats.iaWins;
  const iaPct = iaGames === 0 ? 0 : (stats.humanWins / iaGames) * 100;
  statsIaBarEl.style.width = iaPct.toFixed(1) + '%';
  statsIaPercentEl.textContent = t('stats.winPct', { pct: iaGames === 0 ? '—' : Math.round(iaPct) + '%' });

  // Victorias totales por dificultad
  streakFacilEl.textContent = `${difficultyName('facil')} ${stats.winsByDifficulty.facil}`;
  streakNormalEl.textContent = `${difficultyName('normal')} ${stats.winsByDifficulty.normal}`;
  streakDificilEl.textContent = `${difficultyName('dificil')} ${stats.winsByDifficulty.dificil}`;
}

// Convierte milisegundos a un texto legible (p. ej. "2 h 5 min", "42 s")
function formatPlayTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours} h ${minutes} min`;
  if (minutes > 0) return `${minutes} min ${seconds} s`;
  return `${seconds} s`;
}

function startGame() {
  ensureAudio();
  startBackgroundMusic();
  score1 = 0;
  score2 = 0;
  serverSide = Math.random() < 0.5 ? 'left' : 'right'; // primer saque al azar
  paused = false;
  updatePauseButton(); // el botón de pausa vuelve a "pausar" (icono ⏸ brillante)
  updateScoreboard();
  overlay.classList.add('hidden');
  state = 'playing';
  updateDifficultyBadge();
  touchControlsEl.classList.add('in-game'); // botones táctiles solo durante la partida
  touchHintShown = false; // el aviso táctil se muestra en la primera cuenta atrás de cada partida
  resetBall();
}

// Lanza confeti de colores en la pantalla de victoria
function launchConfetti(count = 70) {
  if (!confettiEl) return;
  confettiEl.innerHTML = '';
  const colors = resolvedTheme() === 'light'
    ? ['#14802a', '#0f5fcf', '#b85e00', '#d21f66', '#6b7280']
    : [PALETTES[palette].hex, '#ffffff', '#ffd54a', '#ff4dd8', '#00e5ff'];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (Math.random() * 100) + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (10 + Math.random() * 10) + 'px';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.animationDelay = (Math.random() * 0.9) + 's';
    fragment.appendChild(piece);
  }
  confettiEl.appendChild(fragment);
  // Limpiamos las piezas cuando termina la animación
  setTimeout(() => { confettiEl.innerHTML = ''; }, 5500);
}

// Destello y explosión de chispas en el punto exacto del gol decisivo.
// (x, y) son coordenadas lógicas del lienzo; las convertimos a píxeles de pantalla.
function spawnGoalExplosion(x, y) {
  if (!explosionEl) return;
  explosionEl.innerHTML = '';
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return; // lienzo aún sin tamaño

  const sx = rect.left + (x / WIDTH) * rect.width;
  const sy = rect.top + (y / HEIGHT) * rect.height;
  // Colores de las chispas según el tema: brillantes sobre fondo oscuro,
  // oscuros/saturados sobre el overlay claro.
  const colors = resolvedTheme() === 'light'
    ? [PALETTES[palette].hex, '#1f2937', '#b26a00']
    : [PALETTES[palette].hex, '#ffffff', '#ffd54a'];
  const fragment = document.createDocumentFragment();

  // Destello central: un anillo brillante que crece y se desvanece
  const flash = document.createElement('div');
  flash.className = 'goal-flash';
  flash.style.left = sx + 'px';
  flash.style.top = sy + 'px';
  flash.style.setProperty('--flash-color', PALETTES[palette].hex);
  fragment.appendChild(flash);

  // Chispas que salen disparadas en todas direcciones
  const sparkCount = 26;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'goal-spark';
    spark.style.left = sx + 'px';
    spark.style.top = sy + 'px';
    spark.style.background = colors[Math.floor(Math.random() * colors.length)];
    const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 40 + Math.random() * 90;
    spark.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    spark.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    spark.style.animationDelay = (Math.random() * 0.05) + 's';
    fragment.appendChild(spark);
  }

  explosionEl.appendChild(fragment);
  // Limpiamos los elementos cuando termina la animación
  setTimeout(() => { explosionEl.innerHTML = ''; }, 900);
}

function endGame() {
  state = 'gameover';
  updateDifficultyBadge();
  stopBackgroundMusic();
  touchControlsEl.classList.remove('in-game'); // al terminar, ocultamos los botones táctiles

  // ¿Quién ha ganado el enfrentamiento? (en modo IA el jugador humano puede estar en cualquier lado)
  const leftWonMatch = score1 >= bestOf;
  let humanWon;
  if (mode === 'ai') {
    humanWon = playerSide === 'left' ? leftWonMatch : !leftWonMatch;
  } else {
    humanWon = leftWonMatch; // el jugador 1 está a la izquierda
  }

  // Sumamos la victoria al historial y actualizamos la racha contra la IA
  let newRecord = false;
  if (mode === 'ai') {
    if (humanWon) {
      stats.humanWins++;
      stats.winsByDifficulty[difficulty]++;
      stats.streaks[difficulty]++;
      if (stats.streaks[difficulty] > stats.bestStreaks[difficulty]) {
        stats.bestStreaks[difficulty] = stats.streaks[difficulty];
        newRecord = true;
      }
    } else {
      stats.iaWins++;
      stats.streaks[difficulty] = 0;
    }
  } else if (humanWon) {
    stats.p1Wins++;
  } else {
    stats.p2Wins++;
  }
  saveStats();
  overlayTitle.classList.remove('hidden');
  overlaySubtitle.classList.remove('hidden');

  if (newRecord) {
    // Celebración especial: sonido y mensaje de récord
    playRecord();
    overlayTitle.textContent = t('game.record');
    overlaySubtitle.textContent = t('game.bestStreak', { diff: difficultyName(difficulty), n: stats.bestStreaks[difficulty] });
  } else {
    // Sonido de victoria o derrota (solo hay "derrota" jugando contra la IA)
    if (mode === 'ai' && !humanWon) {
      playLose();
    } else {
      playWin();
    }
    overlayTitle.textContent =
      mode === 'ai'
        ? (humanWon ? t('game.win', { name: humanName() }) : t('game.iaWins'))
        : t('game.playerWins', { name: humanWon ? player1Name : player2Name });
    overlaySubtitle.textContent = t('game.result', { s1: score1, s2: score2 });
  }
  restartBtn.textContent = t('game.playAgain');
  showResultScreen();
  overlay.classList.remove('hidden');
  // Confeti cuando gana un jugador (o el humano contra la IA)
  if (mode !== 'ai' || humanWon) launchConfetti();
}

// Coloca la pelota en el centro e inicia la cuenta atrás antes del saque
function resetBall() {
  trail.length = 0; // limpiamos la estela del punto anterior
  ball.x = WIDTH / 2 - BALL_SIZE / 2;
  ball.y = HEIGHT / 2 - BALL_SIZE / 2;
  ball.vx = 0;
  ball.vy = 0;
  countdown = 3;     // empieza la cuenta atrás
  launchTimer = 60;  // ~1 segundo por número (60 fotogramas a 60 fps)
  resumeCountdown = false; // un saque normal, no una reanudación
  aiTargetY = HEIGHT / 2;
  aiReactionTimer = 0;
  paddle1.vel = 0;
  paddle2.vel = 0;
  overspeedHits = 0; // cada punto vuelve a empezar desde la velocidad de saque
  syncRenderState(); // sin interpolación tras el salto de posición
}

// Lanza la pelota desde el lado que tiene el saque, hacia el rival
function launchBall() {
  const directionX = serverSide === 'left' ? 1 : -1; // hacia el centro
  const directionY = Math.random() < 0.5 ? -1 : 1; // arriba o abajo
  ball.vx = directionX * ballSpeed;
  ball.vy = directionY * ballSpeed * (0.3 + Math.random() * 0.7);

  // No dejamos que el saque supere el tope de velocidad
  const total = Math.hypot(ball.vx, ball.vy);
  if (total > MAX_BALL_SPEED) {
    const factor = MAX_BALL_SPEED / total;
    ball.vx *= factor;
    ball.vy *= factor;
  }
}

// Devuelve el tiempo de reacción de la IA con una variación aleatoria.
// La cantidad de variación depende de la dificultad: más irregular en Fácil
// y más constante en Difícil.
function randomReactionDelay() {
  const spread = Math.max(1, Math.round(aiReactionDelay * aiReactionJitter));
  const variation = Math.floor(Math.random() * (spread * 2 + 1)) - spread;
  return Math.max(1, aiReactionDelay + variation);
}

// 7. Lógica del juego (se ejecuta una vez por fotograma)
function update() {
  if (state !== 'playing' || paused) return;

  // Aplicamos el arrastre táctil una vez por fotograma (no en cada evento)
  applyPointerPaddles();

  // Movimiento de las palas según las teclas pulsadas
  if (mode === 'ai') {
    // Un jugador: controla una pala y la IA la otra
    const humanPaddle = playerSide === 'right' ? paddle2 : paddle1;
    const aiPaddle = playerSide === 'right' ? paddle1 : paddle2;

    // Pala humana con pequeña aceleración (física, sin arranques secos).
    const humanDesired = (keys['w'] ? -PADDLE_SPEED : 0) + (keys['s'] ? PADDLE_SPEED : 0);
    humanPaddle.vel += (humanDesired - humanPaddle.vel) * PADDLE_ACCEL;
    humanPaddle.y += humanPaddle.vel;

    // La IA reacciona a la pelota con un retraso según la dificultad.
    aiReactionTimer--;
    if (aiReactionTimer <= 0) {
      const baseTarget = ball.y + BALL_SIZE / 2;
      // Error aleatorio de puntería, mayor cuanto más rápido va la pala:
      // al esprintar la IA apunta peor (como un jugador que corre).
      const maxSprint = aiSpeed * 1.8;
      const speedFactor = Math.min(1, Math.abs(aiPaddle.vel) / maxSprint);
      const error = aiAimError * (1 + speedFactor * AI_SPEED_ERROR_BONUS);
      aiTargetY = clamp(baseTarget + (Math.random() * 2 - 1) * error, 0, HEIGHT);
      aiReactionTimer = randomReactionDelay();
    }

    const paddleCenter = aiPaddle.y + paddleHeight / 2;
    const dist = aiTargetY - paddleCenter;
    if (Math.abs(dist) > 4) {
      // Velocidad deseada: lenta si la pelota está cerca (control fino) y más
      // rápida cuanto más lejos esté, para esprintar a alcanzarla.
      const maxSpeed = aiSpeed * 1.8;
      const speed = Math.min(maxSpeed, aiSpeed + Math.abs(dist) * 0.06);
      const desired = Math.sign(dist) * speed;
      // Inercia: la velocidad real se acerca suavemente a la deseada, de modo
      // que acelera y frena de forma progresiva en vez de cambiar de golpe.
      aiPaddle.vel += (desired - aiPaddle.vel) * AI_ACCEL;
      // Movemos sin rebasar el objetivo para evitar vaivenes al llegar.
      aiPaddle.y += clamp(aiPaddle.vel, -Math.abs(dist), Math.abs(dist));
    } else {
      // Dentro de la zona muerta la pala se va frenando suavemente.
      aiPaddle.vel *= 0.85;
    }
  } else {
    // 2 jugadores: ambas palas con pequeña aceleración
    const desired1 = (keys['w'] ? -PADDLE_SPEED : 0) + (keys['s'] ? PADDLE_SPEED : 0);
    paddle1.vel += (desired1 - paddle1.vel) * PADDLE_ACCEL;
    paddle1.y += paddle1.vel;

    const desired2 = (keys['arrowup'] ? -PADDLE_SPEED : 0) + (keys['arrowdown'] ? PADDLE_SPEED : 0);
    paddle2.vel += (desired2 - paddle2.vel) * PADDLE_ACCEL;
    paddle2.y += paddle2.vel;
  }

  // Las palas no pueden salirse de la pantalla
  paddle1.y = clamp(paddle1.y, 0, HEIGHT - paddleHeight);
  paddle2.y = clamp(paddle2.y, 0, HEIGHT - paddleHeight);

  // Cuenta atrás antes del saque o de reanudar (3, 2, 1...)
  if (countdown > 0) {
    launchTimer--;
    if (launchTimer <= 0) {
      countdown--;
      launchTimer = 60; // un segundo para el siguiente número
      if (countdown === 0) {
        if (resumeCountdown) {
          resumeCountdown = false; // la pelota conserva su velocidad y continúa
        } else {
          launchBall();
        }
      }
    }
    return;
  }

  // Mover la pelota
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Rebote en el techo y el suelo
  if (ball.y <= 0) {
    ball.y = 0;
    ball.vy = Math.abs(ball.vy);
    playWallBounce();
  } else if (ball.y + BALL_SIZE >= HEIGHT) {
    ball.y = HEIGHT - BALL_SIZE;
    ball.vy = -Math.abs(ball.vy);
    playWallBounce();
  }

  // Rebote en las palas
  if (ballHitsPaddle(paddle1)) bounceOffPaddle(paddle1);
  else if (ballHitsPaddle(paddle2)) bounceOffPaddle(paddle2);

  // Guardamos la posición actual para dibujar la estela
  trail.unshift({ x: ball.x, y: ball.y });
  if (trail.length > TRAIL_LENGTH) trail.pop();

  // Punto: la pelota salió por un lateral
  if (ball.x + BALL_SIZE < 0) {
    score2++; // sale por la izquierda → punto para la pala derecha
    pointScored('right');
  } else if (ball.x > WIDTH) {
    score1++; // sale por la derecha → punto para la pala izquierda
    pointScored('left');
  }
}

function ballHitsPaddle(paddle) {
  return (
    ball.x < paddle.x + PADDLE_WIDTH &&
    ball.x + BALL_SIZE > paddle.x &&
    ball.y < paddle.y + paddleHeight &&
    ball.y + BALL_SIZE > paddle.y
  );
}

// ¿Es la pala que controla la IA? (solo en modo IA)
function isAIPaddle(paddle) {
  if (mode !== 'ai') return false;
  const aiPaddle = playerSide === 'right' ? paddle1 : paddle2;
  return paddle === aiPaddle;
}

function bounceOffPaddle(paddle) {
  const incomingSpeed = Math.hypot(ball.vx, ball.vy); // velocidad antes del rebote

  // En qué parte de la pala golpeó la pelota (-1 arriba, 0 centro, +1 abajo)
  const hitPosition =
    (ball.y + BALL_SIZE / 2 - (paddle.y + paddleHeight / 2)) / (paddleHeight / 2);
  const maxAngle = Math.PI / 4; // rebote máximo de 45 grados
  const angle = hitPosition * maxAngle;
  // Cada golpe acelera según la dificultad (speedUp) hasta el tope normal.
  // El factor móvil solo se aplica en el SAQUE (launchBall); aquí NO se repite,
  // porque multiplicar por un factor < 1 junto al speedUp (> 1) frenaría la bola
  // en cada golpe en vez de acelerarla (0.85 × 1.08 < 1).
  let speed = Math.min(Math.hypot(ball.vx, ball.vy) * ballSpeedUp, MAX_BALL_SPEED);
  if (speed >= MAX_BALL_SPEED) {
    // Tope alcanzado: si el rally no termina, cada golpe suma un poco más de
    // velocidad hasta el techo absoluto, para que acabe por acelerarse.
    overspeedHits++;
    speed = Math.min(MAX_BALL_SPEED + overspeedHits * RALLY_EXTRA_SPEED, RALLY_MAX_SPEED);
  }
  const direction = ball.vx > 0 ? -1 : 1; // rebota hacia el lado contrario

  ball.vx = direction * Math.cos(angle) * speed;
  ball.vy = Math.sin(angle) * speed;

  // Sacamos la pelota de la pala para que no rebote dos veces seguidas
  if (direction > 0) {
    ball.x = paddle.x + PADDLE_WIDTH;
  } else {
    ball.x = paddle.x - BALL_SIZE;
  }

  if (isAIPaddle(paddle)) {
    playRivalBounce();
  } else {
    playPaddleBounce();
  }
  // Vibración proporcional a la velocidad con la que llegó la pelota
  shakeHit(speedIntensity(incomingSpeed) * 2);
}

function pointScored(scoringSide) {
  // El jugador que encaja el punto saca la siguiente bola
  serverSide = scoringSide === 'left' ? 'right' : 'left';
  updateScoreboard();
  const gameOver = score1 >= bestOf || score2 >= bestOf;
  shakeScreen(gameOver); // vibración más fuerte en el punto de la victoria

  if (gameOver) {
    // Explosión en el punto exacto donde la pelota ha marcado el último punto
    // (la pelota sale por el lateral contrario al lado que anota)
    const goalX = scoringSide === 'left' ? WIDTH : 0;
    const goalY = clamp(ball.y + BALL_SIZE / 2, 0, HEIGHT);
    spawnGoalExplosion(goalX, goalY);
  }

  if (gameOver) {
    winGame();
  } else {
    playScore();
    resetBall();
  }
}

// Alguien ha llegado a los puntos necesarios (bestOf): fin de la partida.
function winGame() {
  endGame(); // partida terminada
}

// 8. Dibujado en pantalla
function draw() {
  // Escalamos el contexto al tamaño real del lienzo para que se vea nítido
  ctx.setTransform(renderScaleX, 0, 0, renderScaleY, 0, 0);

  // Fondo
  ctx.fillStyle = boardBg();
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Línea central discontinua
  ctx.strokeStyle = resolvedTheme() === 'light' ? 'rgba(0, 0, 0, 0.18)' : 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 16]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  // Palas: sombra dura, relleno y contorno de 1px del color del tema.
  // Redondeamos la Y para que el contorno quede nítido a escala entera.
  const py1 = Math.round(prevPaddle1Y + (paddle1.y - prevPaddle1Y) * renderAlpha);
  const py2 = Math.round(prevPaddle2Y + (paddle2.y - prevPaddle2Y) * renderAlpha);
  ctx.fillStyle = hardShadowColor();
  ctx.fillRect(paddle1.x + SHADOW_OFFSET, py1 + SHADOW_OFFSET, PADDLE_WIDTH, paddleHeight);
  ctx.fillRect(paddle2.x + SHADOW_OFFSET, py2 + SHADOW_OFFSET, PADDLE_WIDTH, paddleHeight);
  ctx.fillStyle = paddleFillColor();
  ctx.fillRect(paddle1.x, py1, PADDLE_WIDTH, paddleHeight);
  ctx.fillRect(paddle2.x, py2, PADDLE_WIDTH, paddleHeight);
  // El contorno de las palas es un tono más claro del color elegido en Personalizar.
  ctx.strokeStyle = paddleOutlineColor();
  ctx.lineWidth = 1;
  ctx.strokeRect(paddle1.x + 0.5, py1 + 0.5, PADDLE_WIDTH - 1, paddleHeight - 1);
  ctx.strokeRect(paddle2.x + 0.5, py2 + 0.5, PADDLE_WIDTH - 1, paddleHeight - 1);

  // Estela de la pelota: un degradado suave que se estrecha y desvanece.
  // Cuando la bola supera el tope normal, la estela se tiñe de naranja
  // (overdrive) para avisar de que el rally se está calentando.
  const overdrive = overdriveFactor(Math.hypot(ball.vx, ball.vy));
  const trailRgb = overdrive > 0 ? mixOverdrive(accentRgb(), overdrive) : accentRgb();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < trail.length - 1; i++) {
    const progress = i / (trail.length - 1); // 0 = reciente, 1 = antiguo
    // La estela se intensifica en overdrive para que el aviso se note.
    const alpha = (1 - progress) * (0.45 + overdrive * 0.3);
    const lineWidth = BALL_SIZE * (1 - progress * 0.7);
    ctx.strokeStyle = `rgba(${trailRgb}, ${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(trail[i].x + BALL_SIZE / 2, trail[i].y + BALL_SIZE / 2);
    ctx.lineTo(trail[i + 1].x + BALL_SIZE / 2, trail[i + 1].y + BALL_SIZE / 2);
    ctx.stroke();
  }
  ctx.lineCap = 'butt'; // restauramos los valores por defecto
  ctx.lineJoin = 'miter';

  // Pelota (posición redondeada para que se vea nítida a escala entera)
  // y su sombra dura, desplazada hacia abajo-derecha.
  const bx = Math.round(prevBallX + (ball.x - prevBallX) * renderAlpha);
  const by = Math.round(prevBallY + (ball.y - prevBallY) * renderAlpha);
  ctx.fillStyle = hardShadowColor();
  ctx.fillRect(bx + SHADOW_OFFSET, by + SHADOW_OFFSET, BALL_SIZE, BALL_SIZE);
  ctx.fillStyle = inkColor();
  ctx.fillRect(bx, by, BALL_SIZE, BALL_SIZE);
  // Contorno de 1px del color del tema (sprite arcade clásico); en overdrive
  // se tiñe de naranja para reforzar el aviso visual.
  ctx.strokeStyle = overdrive > 0 ? `rgb(${trailRgb})` : accentHex();
  ctx.lineWidth = 1;
  ctx.strokeRect(bx + 0.5, by + 0.5, BALL_SIZE - 1, BALL_SIZE - 1);

  // Destello de overdrive: halo naranja pulsante alrededor de la bola, que
  // crece y parpadea suavemente mientras el rally sigue por encima del tope.
  if (overdrive > 0) {
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 90);
    const glowAlpha = overdrive * (0.2 + 0.4 * pulse);
    const g = 1 + Math.round(overdrive * 3);
    ctx.strokeStyle = `rgba(${overdriveRgb()}, ${glowAlpha})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(bx - g + 0.5, by - g + 0.5, BALL_SIZE + g * 2 - 1, BALL_SIZE + g * 2 - 1);
  }

  // Cuenta atrás antes del saque
  if (countdown > 0 && state === 'playing' && !paused) {
    ctx.fillStyle = inkColor();
    ctx.font = '48px ' + DISPLAY_FONT;
    ctx.textAlign = 'center';
    ctx.fillText(countdown, WIDTH / 2, HEIGHT / 2);

    // En móvil, un pequeño aviso bajo el número: se muestra solo en la primera
    // cuenta atrás de la partida y desaparece al lanzar la pelota.
    if (IS_TOUCH_DEVICE && !touchHintShown) {
      ctx.font = '12px ' + DISPLAY_FONT;
      if (mode === 'pvp') {
        // 2 jugadores: cada mitad de la pantalla controla su pala.
        // Línea divisoria brillante + etiqueta con flecha en cada lado.
        ctx.strokeStyle = `rgba(${accentRgb()}, 0.55)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 10]);
        ctx.beginPath();
        // Dos tramos con un hueco central: la pelota y el número de la cuenta
        // atrás viven en el centro (y ≈ 216..256), así que la línea no debe
        // pasar por ahí o los taparía.
        ctx.moveTo(WIDTH / 2, HEIGHT / 2 - 100); // tramo superior
        ctx.lineTo(WIDTH / 2, HEIGHT / 2 - 56);
        ctx.moveTo(WIDTH / 2, HEIGHT / 2 + 14);  // tramo inferior
        ctx.lineTo(WIDTH / 2, HEIGHT / 2 + 92);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = accentHex();
        ctx.textAlign = 'right';
        ctx.fillText('< ' + t('setup.left').toUpperCase(), WIDTH / 2 - 24, HEIGHT / 2 + 46);
        ctx.textAlign = 'left';
        ctx.fillText(t('setup.right').toUpperCase() + ' >', WIDTH / 2 + 24, HEIGHT / 2 + 46);
        ctx.textAlign = 'center';
      } else {
        ctx.fillStyle = accentHex();
        ctx.textAlign = 'center';
        ctx.fillText(t('touch.hint'), WIDTH / 2, HEIGHT / 2 + 42);
      }
      if (countdown === 1) touchHintShown = true;
    }

    // Indicador de quién saca: flecha hacia el centro junto a su pala.
    // Solo en un saque real; al reanudar no hay saque.
    if (!resumeCountdown) {
      const serving = serverSide === 'left' ? paddle1 : paddle2;
      const dir = serverSide === 'left' ? 1 : -1;
      const edgeX = serverSide === 'left' ? serving.x + PADDLE_WIDTH : serving.x;
      const cy = (serverSide === 'left' ? py1 : py2) + paddleHeight / 2;

      ctx.fillStyle = accentHex();
      ctx.beginPath();
      ctx.moveTo(edgeX + dir * 16, cy);
      ctx.lineTo(edgeX + dir * 4, cy - 8);
      ctx.lineTo(edgeX + dir * 4, cy + 8);
      ctx.closePath();
      ctx.fill();

      ctx.font = '16px ' + DISPLAY_FONT;
      ctx.textAlign = serverSide === 'left' ? 'left' : 'right';
      ctx.fillText(t('game.serve'), edgeX + dir * 22, cy + 5);
    }
  }

  // Pantalla de pausa
  if (paused && state === 'playing') {
    ctx.fillStyle = resolvedTheme() === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(5, 5, 10, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = inkColor();
    ctx.font = '36px ' + DISPLAY_FONT;
    ctx.textAlign = 'center';
    ctx.fillText(t('pause.title'), WIDTH / 2, HEIGHT / 2 - 10);
    ctx.font = '18px ' + DISPLAY_FONT;
    if (hasTouchUI()) {
      // En móvil no hay teclado: las instrucciones apuntan a los botones táctiles
      ctx.fillText(t('pause.touchContinue'), WIDTH / 2, HEIGHT / 2 + 30);
      ctx.fillText(t('pause.touchRestart'), WIDTH / 2, HEIGHT / 2 + 56);
      ctx.fillText(t('pause.touchExit'), WIDTH / 2, HEIGHT / 2 + 82);
    } else {
      ctx.fillText(t('pause.continue'), WIDTH / 2, HEIGHT / 2 + 30);
      ctx.fillText(t('pause.restart'), WIDTH / 2, HEIGHT / 2 + 56);
      ctx.fillText(t('pause.exit'), WIDTH / 2, HEIGHT / 2 + 82);
    }
  }
}

// 9. Bucle principal. La lógica corre con PASO FIJO (60 pasos por segundo):
// así la velocidad de la bola y los temporizadores NO dependen del FPS del
// navegador (que cambia con el zoom, la pantalla o el dispositivo).
let lastFrameTime = 0; // timestamp del fotograma anterior (para medir el tiempo real)
let lastAutoSaveTime = 0; // último guardado automático del tiempo (para no perder minutos)
let accumulator = 0;      // tiempo real acumulado aún no simulado (ms)
const STEP_MS = 1000 / 60; // duración de un paso de lógica (16,67 ms)

function loop(now) {
  if (lastFrameTime > 0) {
    // Tiempo real transcurrido desde el fotograma anterior (en ms).
    const realDelta = now - lastFrameTime;

    // Sumamos el tiempo real que llevamos jugando (solo en plena partida, sin pausa)
    if (state === 'playing' && !paused) {
      stats.playTimeMs += realDelta;
      // Guardamos cada ~30 s para no perder minutos si la app se cierra de golpe
      if (now - lastAutoSaveTime >= 30000) {
        saveStats();
        lastAutoSaveTime = now;
      }
    }

    // Acumulamos el tiempo para la simulación. Lo limitamos a 100 ms por
    // fotograma para evitar un "espiral de la muerte" si la pestaña se
    // congela (p. ej. al cambiar de ventana o pestaña).
    accumulator += Math.min(realDelta, 100);
  }
  lastFrameTime = now;

  // Ejecutamos los pasos de lógica que toquen. Si el navegador va a pocos FPS
  // (zoom grande) se ejecutan varios pasos por fotograma; si va a muchos
  // (zoom pequeño) se ejecuta un paso cada pocos fotogramas. En ambos casos la
  // bola avanza lo mismo por segundo real.
  while (accumulator >= STEP_MS) {
    // Guardamos la posición previa ANTES de cada paso para interpolar
    // el dibujado entre el estado anterior y el actual.
    prevBallX = ball.x;
    prevBallY = ball.y;
    prevPaddle1Y = paddle1.y;
    prevPaddle2Y = paddle2.y;
    update();
    accumulator -= STEP_MS;
  }
  // Fracción del siguiente paso aún no ejecutada: mezclamos las posiciones
  // anterior y actual para que el movimiento se vea fluido a cualquier FPS.
  renderAlpha = accumulator / STEP_MS;

  draw();
  requestAnimationFrame(loop);
}

// 10. Arranque
restartBtn.addEventListener('click', handleSpace);
setupStartBtn.addEventListener('click', handleSpace);
musicVolumeSlider.addEventListener('input', handleVolumeChange);
effectsVolumeSlider.addEventListener('input', handleVolumeChange);
// Al soltar el deslizador, reproducimos un pitido de muestra con el nuevo volumen
musicVolumeSlider.addEventListener('change', () => {
  ensureAudio();
  beep(440, 0.15, 'triangle', 0.25, 0, 'music');
});
effectsVolumeSlider.addEventListener('change', () => {
  ensureAudio();
  beep(520, 0.08, 'square', 0.25);
});
musicToggleBtn.addEventListener('click', () => setMusicEnabled(!musicEnabled));
effectsToggleBtn.addEventListener('click', () => setEffectsEnabled(!effectsEnabled));
name1Input.addEventListener('input', updatePlayerNames);
name2Input.addEventListener('input', updatePlayerNames);
name1Input.addEventListener('change', () => { name1Input.value = player1Name; });
name2Input.addEventListener('change', () => { name2Input.value = player2Name; });

window.addEventListener('resize', scheduleResize);

// Pausa automática si la pestaña pierde el foco o cambias de ventana
window.addEventListener('blur', pauseForLostFocus);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseForLostFocus();
    saveStats(); // guardamos el tiempo de juego al cambiar de pestaña
  }
});

// Guardamos el tiempo de juego al cerrar la pestaña o la ventana
window.addEventListener('beforeunload', saveStats);
window.addEventListener('pagehide', saveStats);
modePvpBtn.addEventListener('click', () => setMode('pvp'));
modeAiBtn.addEventListener('click', () => setMode('ai'));
diffFacilBtn.addEventListener('click', () => setDifficulty('facil'));
diffNormalBtn.addEventListener('click', () => setDifficulty('normal'));
diffDificilBtn.addEventListener('click', () => setDifficulty('dificil'));
sideLeftBtn.addEventListener('click', () => setPlayerSide('left'));
sideRightBtn.addEventListener('click', () => setPlayerSide('right'));
bestOf1Btn.addEventListener('click', () => setBestOf(1));
bestOf3Btn.addEventListener('click', () => setBestOf(3));
bestOf5Btn.addEventListener('click', () => setBestOf(5));

// Control táctil por arrastre (también funciona con el ratón).
// En MÓVIL escuchamos en TODA la ventana (no solo en el tablero): el lienzo
// (proporción 8:5) es más estrecho que la pantalla y los pulgares descansan en
// los bordes, fuera del lienzo. Así, en 2 jugadores cada mitad de la PANTALLA
// controla su pala y los dos pueden jugar a la vez. Se ignoran los botones y
// controles para no secuestrar sus toques. En escritorio se mantienen los
// listeners del tablero originales (arrastrar fuera del tablero no hace nada).
// En los eventos solo guardamos la última posición; el movimiento real se
// aplica una vez por fotograma en applyPointerPaddles(), para no hacer trabajo
// de más cuando llegan ráfagas de eventos pointermove.
const DRAG_IGNORE = 'button, input, select, textarea, a, [role="dialog"]';
if (IS_TOUCH_DEVICE) {
  window.addEventListener('pointerdown', (event) => {
    if (state !== 'playing') return;
    // En pausa, un toque en cualquier punto de la pantalla reanuda la partida
    if (paused) {
      if (event.target.closest(DRAG_IGNORE)) return; // los botones táctiles ya gestionan su acción
      setPaused(false);
      return;
    }
    if (event.target.closest(DRAG_IGNORE)) return; // no secuestrar botones táctiles
    const side = getSideForPointer(event.clientX);
    activePointers[event.pointerId] = side;
    pointerPositions[event.pointerId] = event.clientY;
    // Arrastre RELATIVO: recordamos dónde estaba el dedo y dónde estaba la pala
    // al tocar, así la pala se mueve con el dedo a partir de su posición, sin
    // saltos bruscos ni tapando la pala con el pulgar (el toque puede empezar
    // en cualquier punto de la pantalla, no solo sobre la pala).
    pointerStartY[event.pointerId] = event.clientY;
    const paddle = side === 'left' ? paddle1 : paddle2;
    paddleStartY[side] = paddle.y;
    event.preventDefault();
  });

  window.addEventListener('pointermove', (event) => {
    if (activePointers[event.pointerId] === undefined) return;
    pointerPositions[event.pointerId] = event.clientY;
    event.preventDefault(); // evita que el navegador inicie scroll/zoom al arrastrar
  });

  window.addEventListener('pointerup', (event) => {
    if (activePointers[event.pointerId] === undefined) return;
    delete activePointers[event.pointerId];
    delete pointerPositions[event.pointerId];
    delete pointerStartY[event.pointerId];
  });

  window.addEventListener('pointercancel', (event) => {
    if (activePointers[event.pointerId] === undefined) return;
    delete activePointers[event.pointerId];
    delete pointerPositions[event.pointerId];
    delete pointerStartY[event.pointerId];
  });
} else {
  stage.addEventListener('pointerdown', (event) => {
    if (state !== 'playing') return;
    // En pausa, un clic en cualquier punto del tablero reanuda la partida
    if (paused) {
      setPaused(false);
      return;
    }
    const side = getSideForPointer(event.clientX);
    activePointers[event.pointerId] = side;
    pointerPositions[event.pointerId] = event.clientY;
    if (stage.setPointerCapture) stage.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  stage.addEventListener('pointermove', (event) => {
    if (activePointers[event.pointerId] === undefined) return;
    pointerPositions[event.pointerId] = event.clientY;
  });

  stage.addEventListener('pointerup', (event) => {
    delete activePointers[event.pointerId];
    delete pointerPositions[event.pointerId];
  });

  stage.addEventListener('pointercancel', (event) => {
    delete activePointers[event.pointerId];
    delete pointerPositions[event.pointerId];
  });
}

touchPauseBtn.addEventListener('click', () => togglePause());
touchRestartBtn.addEventListener('click', () => {
  playClick(880); // clic de reinicio (tono distinto a los demás)
  handleSpace();  // reinicia la partida, igual que ESPACIO
});
touchMenuBtn.addEventListener('click', quitToMenu);
touchSoundBtn.addEventListener('click', () => {
  ensureAudio(); // por si es la primera interacción de la sesión
  toggleMute();
});

// Devuelve qué lado controla un toque según su posición y el modo de juego.
// En 2 jugadores en móvil, cada mitad de la PANTALLA controla su pala (los
// dedos pueden estar en los bordes del móvil, fuera del lienzo). En escritorio
// se divide por el centro del tablero, como antes.
function getSideForPointer(clientX) {
  if (mode === 'ai') {
    return playerSide; // un solo jugador: cualquier toque mueve tu pala
  }
  if (IS_TOUCH_DEVICE) {
    return clientX < window.innerWidth / 2 ? 'left' : 'right';
  }
  const rect = canvas.getBoundingClientRect();
  return clientX < rect.left + rect.width / 2 ? 'left' : 'right';
}

// Aplica la última posición táctil guardada a cada pala, una vez por fotograma.
// En móvil el arrastre es RELATIVO: la pala se desplaza lo mismo que el dedo
// desde la posición en que empezó el toque (sin saltos al apoyar el pulgar ni
// tapa la pala). En escritorio se mantiene el arrastre ABSOLUTO original: la
// pala va al punto del cursor (así lo pediste para el PC).
function applyPointerPaddles() {
  const ids = Object.keys(activePointers);
  if (ids.length === 0) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.height === 0) return; // el lienzo aún no tiene tamaño visible
  const scaleY = HEIGHT / rect.height;

  for (const id of ids) {
    const clientY = pointerPositions[id];
    if (clientY === undefined) continue;
    const side = activePointers[id];
    const paddle = side === 'left' ? paddle1 : paddle2;
    if (IS_TOUCH_DEVICE) {
      // Móvil: arrastre relativo
      const startY = pointerStartY[id];
      if (startY === undefined) continue;
      paddle.vel = 0;
      const baseY = paddleStartY[side] !== undefined ? paddleStartY[side] : paddle.y;
      paddle.y = clamp(baseY + (clientY - startY) * scaleY, 0, HEIGHT - paddleHeight);
    } else {
      // Escritorio: arrastre absoluto (la pala sigue al cursor)
      paddle.vel = 0;
      paddle.y = clamp((clientY - rect.top) * scaleY - paddleHeight / 2, 0, HEIGHT - paddleHeight);
    }
  }
}
statsResetBtn.addEventListener('click', resetStats);
statsCloseBtn.addEventListener('click', closeStats);

// Diálogo de confirmación: confirmar, cancelar, clic fuera y ESC
confirmOkBtn.addEventListener('click', () => {
  const cb = confirmCallback;
  closeConfirm(false); // confirmar no debe disparar la acción de cancelar
  if (cb) cb();
});
confirmCancelBtn.addEventListener('click', () => closeConfirm());
confirmModal.addEventListener('click', (event) => {
  if (event.target === confirmModal) closeConfirm();
});
statsModal.addEventListener('click', (event) => {
  if (event.target === statsModal) closeStats();
});
menuControlesBtn.addEventListener('click', openControls);
controlsCloseBtn.addEventListener('click', closeControls);
controlsModal.addEventListener('click', (event) => {
  if (event.target === controlsModal) closeControls();
});
menuSonidoBtn.addEventListener('click', openSound);
soundCloseBtn.addEventListener('click', closeSound);
soundModal.addEventListener('click', (event) => {
  if (event.target === soundModal) closeSound();
});
menuEstadisticasBtn.addEventListener('click', openStats);
menuIdiomaBtn.addEventListener('click', openLanguage);
languageCloseBtn.addEventListener('click', closeLanguage);
languageModal.addEventListener('click', (event) => {
  if (event.target === languageModal) closeLanguage();
});
menuAcercaBtn.addEventListener('click', openAbout);
aboutCloseBtn.addEventListener('click', closeAbout);
aboutModal.addEventListener('click', (event) => {
  if (event.target === aboutModal) closeAbout();
});
// Botones de idioma: cambian el idioma y cierran el modal
['es', 'en'].forEach((code) => {
  const btn = document.getElementById('lang-' + code);
  if (btn) {
    btn.addEventListener('click', () => {
      setLanguage(code);
      closeLanguage();
    });
  }
});
menuJugarBtn.addEventListener('click', showSetup);

// Sonido de clic para todos los botones de la interfaz (menú, configuración y
// modales). Se delega en el documento para cubrir también los botones que se
// creen o muestren después. No afecta a deslizadores ni a controles táctiles.
document.addEventListener('click', (event) => {
  const btn = event.target.closest('.button, .mode-button, .link-button, .touch-btn, .stats-reset');
  if (!btn) return;
  // JUGAR (el botón principal) suena más agudo para diferenciarlo de los secundarios.
  playClick(btn.id === 'menu-jugar' ? 1200 : 800);
});

menuPersonalizarBtn.addEventListener('click', openPersonalize);
menuVolverBtn.addEventListener('click', showMainMenu);
personalizeCloseBtn.addEventListener('click', closePersonalize);
resetAllBtn.addEventListener('click', resetAllSettings);
personalizeModal.addEventListener('click', (event) => {
  if (event.target === personalizeModal) closePersonalize();
});
document.querySelectorAll('.color-swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => setPaddleColor(swatch.dataset.color));
});
paletteVerdeBtn.addEventListener('click', () => setPalette('verde'));
paletteAzulBtn.addEventListener('click', () => setPalette('azul'));
paletteAmbarBtn.addEventListener('click', () => setPalette('ambar'));
paletteRosaBtn.addEventListener('click', () => setPalette('rosa'));
themeDarkBtn.addEventListener('click', () => setTheme('dark'));
themeLightBtn.addEventListener('click', () => setTheme('light'));
themeSystemBtn.addEventListener('click', () => setTheme('system'));
orientationLandscapeBtn.addEventListener('click', () => setAllowPortrait(false));
orientationPortraitBtn.addEventListener('click', () => setAllowPortrait(true));
themeClasicoBtn.addEventListener('click', () => { setMusicTheme('clasico'); previewMusicTheme('clasico'); });
themeEnergeticoBtn.addEventListener('click', () => { setMusicTheme('energetico'); previewMusicTheme('energetico'); });
themeTranquiloBtn.addEventListener('click', () => { setMusicTheme('tranquilo'); previewMusicTheme('tranquilo'); });

// Recuperar el volumen guardado
// (localStorage puede fallar en algunos navegadores, por eso el try/catch)
try {
  const savedMusic = localStorage.getItem('pong-music-volume');
  const savedEffects = localStorage.getItem('pong-effects-volume');
  if (savedMusic !== null) musicVolume = Number(savedMusic);
  if (savedEffects !== null) effectsVolume = Number(savedEffects);
  // Migración desde la versión antigua con un solo volumen
  const savedVolume = localStorage.getItem('pong-volume');
  if (savedMusic === null && savedVolume !== null) {
    musicVolume = Number(savedVolume);
    effectsVolume = Number(savedVolume);
  }
} catch (error) {
  // si no se puede leer, usamos los volúmenes por defecto
}
musicVolumeSlider.value = String(musicVolume);
effectsVolumeSlider.value = String(effectsVolume);

// Recuperar la preferencia de música de fondo (encendida/apagada)
try {
  const savedMusicEnabled = localStorage.getItem('pong-music-enabled');
  if (savedMusicEnabled !== null) musicEnabled = savedMusicEnabled === 'true';
} catch (error) {
  // usamos la música encendida por defecto
}
updateMusicToggleBtn();

// Recuperar la preferencia de efectos de sonido (encendidos/apagados)
try {
  const savedEffectsEnabled = localStorage.getItem('pong-effects-enabled');
  if (savedEffectsEnabled !== null) effectsEnabled = savedEffectsEnabled === 'true';
} catch (error) {
  // usamos los efectos encendidos por defecto
}
if (!effectsEnabled) {
  // Si los efectos estaban apagados, dejamos el volumen a cero
  effectsVolumeBeforeOff = effectsVolume > 0 ? effectsVolume : 1;
  effectsVolume = 0;
  effectsVolumeSlider.value = '0';
}
updateEffectsToggleBtn();

// Recuperar el tema musical guardado
try {
  const savedTheme = localStorage.getItem('pong-music-theme');
  if (savedTheme && MUSIC_THEMES[savedTheme]) currentTheme = savedTheme;
} catch (error) {
  // usamos el tema por defecto
}
updateThemeButtons();

// Recuperar y mostrar el historial de victorias guardado
loadStats();
loadNames();
name1Input.value = player1Name;
name2Input.value = player2Name;
updateScoreLabels();

// Recuperar el color de las palas guardado
try {
  const savedColor = localStorage.getItem('pong-color');
  if (savedColor) paddleColor = savedColor;
} catch (error) {
  // usamos el color por defecto
}
setPaddleColor(paddleColor); // sincroniza el botón seleccionado

// Recuperar la paleta de color guardada
try {
  const savedPalette = localStorage.getItem('pong-palette');
  if (savedPalette && PALETTES[savedPalette]) palette = savedPalette;
} catch (error) {
  // usamos la paleta por defecto (verde)
}
setPalette(palette); // sincroniza botones, clase del body y color del tema

// Recuperar el tema guardado. Si el usuario no ha elegido nada, el valor por
// defecto es 'system': la interfaz sigue el tema del sistema operativo en vivo.
try {
  const savedTheme = localStorage.getItem('pong-theme');
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
    theme = savedTheme;
  }
} catch (error) {
  // usamos 'system' por defecto
}
setTheme(theme); // aplica la clase al body y el color del navegador

// Recuperar la preferencia de orientación (desbloquear el modo vertical)
try {
  allowPortrait = localStorage.getItem('pong-allow-portrait') === 'true';
} catch (error) {
  // usamos el modo horizontal (bloqueado) por defecto
}
setAllowPortrait(allowPortrait); // sincroniza el botón y la clase del body

// Si el usuario eligió 'system', seguimos los cambios del sistema operativo en vivo.
const prefersDarkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
const onSystemThemeChange = () => { if (theme === 'system') applyTheme(); };
if (prefersDarkQuery) {
  if (prefersDarkQuery.addEventListener) {
    prefersDarkQuery.addEventListener('change', onSystemThemeChange);
  } else if (prefersDarkQuery.addListener) {
    prefersDarkQuery.addListener(onSystemThemeChange); // Safari antiguo
  }
}

showMainMenu();
updateScoreboard();
resizeCanvas();
requestAnimationFrame(loop);

// Sonido de arranque: los navegadores solo permiten audio tras una acción
// del usuario, así que se reproduce en la primera interacción (toque o tecla).
let startupSoundPlayed = false;
function unlockAndPlayStartup() {
  if (startupSoundPlayed) return;
  startupSoundPlayed = true;
  ensureAudio();
  playStartupSound();
}
window.addEventListener('pointerdown', unlockAndPlayStartup, { once: true });
window.addEventListener('keydown', unlockAndPlayStartup, { once: true });

// Al cerrar o abandonar la app se intenta reproducir el sonido de apagado.
// (Puede que el navegador lo corte si la página se cierra de golpe.)
window.addEventListener('pagehide', playPowerOffSound);

// Aviso temporal (toast) que se muestra unos segundos y luego se oculta
let toastTimer = null;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 2500);
}

// --- Pantalla de bienvenida (splash) ---
// La barra refleja el progreso REAL de descarga de los assets de la PWA
// (los mismos que cachea el service worker). Se completa cuando todos han
// terminado de cargar y, además, ha pasado un tiempo mínimo para poder
// apreciar la animación del logo.
const PRELOAD_ASSETS = [
  './index.html',
  './css/style.css',
  './js/script.js',
  './assets/fonts/press-start-2p.woff2',
  './manifest.webmanifest',
  './assets/icons/icon-180.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-96.png',
  './assets/icons/icon-32.png',
  './assets/icons/icon-152-ios.png',
  './assets/icons/icon-167-ios.png',
  './assets/icons/icon-180-ios.png',
  './assets/icons/icon-512-ios.png'
];

// Tiempo mínimo visible del splash: en móvil dura 1 s más para poder
// disfrutar de la animación del logo y de la barra de carga (en el escritorio
// se mantiene el original, más breve).
const SPLASH_MIN_MS = IS_TOUCH_DEVICE ? 2500 : 1500;
let splashHidden = false;
let splashStarted = false;
let splashProgress = 0;    // 0..1, solo avanza
let assetsDone = false;    // todos los assets han terminado de cargar
let minTimeElapsed = false;
let splashDripTimer = null; // temporizador de la carga visual simulada

function hideSplash() {
  if (splashHidden) return; // evita ejecutar el fundido dos veces
  splashHidden = true;
  splashEl.classList.add('fade-out');
  setTimeout(() => splashEl.classList.add('hidden'), 500);
}

function setSplashProgress(value) {
  splashProgress = Math.min(1, Math.max(splashProgress, value)); // nunca retrocede
  splashBar.style.width = (splashProgress * 100).toFixed(1) + '%';
  splashProgressEl.setAttribute('aria-valuenow', String(Math.round(splashProgress * 100)));
}

function maybeFinishSplash() {
  if (assetsDone && minTimeElapsed) {
    setSplashProgress(1); // completamos la barra antes de desaparecer
    hideSplash();
  }
}

function finishSplashNow() {
  assetsDone = true;
  minTimeElapsed = true;
  setSplashProgress(1);
  hideSplash();
}

// Carga visual simulada: aunque los assets ya estén en caché (segunda visita
// o app instalada) y terminen de cargar al instante, la barra avanza poco a
// poco hasta el 88 % para que se vea el progreso durante todo el splash. Al
// terminar, el salto al 100 % llega con la transición CSS (movimiento suave).
function startSplashDrip() {
  let dripped = 0;
  const step = () => {
    if (splashHidden || splashProgress >= 1) return;
    if (assetsDone && minTimeElapsed) return; // ya no hace falta simular
    // Avance desacelerado: empieza rápido y se ralentiza cerca del tope.
    dripped += (0.88 - dripped) * 0.045 + 0.006;
    const cap = assetsDone ? 0.98 : 0.88;
    setSplashProgress(Math.min(cap, dripped));
    splashDripTimer = setTimeout(step, 60);
  };
  splashDripTimer = setTimeout(step, 60);
}

// Descarga un asset leyendo su flujo de bytes para medir el progreso real.
// Si no hay streaming o tamaño conocido, el asset se cuenta como completo.
async function preloadAsset(url, onFraction) {
  try {
    const response = await fetch(url);
    const total = Number(response.headers.get('content-length')) || 0;
    if (!total || !response.body || !response.body.getReader) {
      onFraction(1);
      return;
    }
    const reader = response.body.getReader();
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      onFraction(received / total);
    }
    onFraction(1);
  } catch (error) {
    // Si falla (p. ej. sin conexión), no bloqueamos la entrada al juego.
    onFraction(1);
  }
}

function startSplashLoading() {
  if (splashStarted) return;
  splashStarted = true;

  // Precargamos la fuente arcade para que el lienzo la tenga lista al dibujar
  if (document.fonts && document.fonts.load) {
    document.fonts.load('16px "Press Start 2P"').catch(() => {});
  }

  // Tiempo mínimo para disfrutar la animación del logo
  setTimeout(() => { minTimeElapsed = true; maybeFinishSplash(); }, SPLASH_MIN_MS);
  // Barra de carga visible: avanza suavemente aunque los assets estén en caché
  startSplashDrip();
  // Red de seguridad: si algo se queda colgado, entramos igualmente.
  setTimeout(finishSplashNow, 8000);

  const fractions = new Array(PRELOAD_ASSETS.length).fill(0);
  function updateOverall() {
    const sum = fractions.reduce((a, b) => a + b, 0);
    setSplashProgress(sum / PRELOAD_ASSETS.length);
    if (sum >= PRELOAD_ASSETS.length) {
      assetsDone = true;
      maybeFinishSplash();
    }
  }

  PRELOAD_ASSETS.forEach((url, index) => {
    preloadAsset(url, (fraction) => {
      fractions[index] = fraction;
      updateOverall();
    });
  });
}

// --- Actualizaciones de la app de escritorio (Electron) ---
// Solo en la app empaquetada aparece el botón "Buscar actualizaciones" del
// menú. En el navegador (PWA) no existe window.pongDesktop y queda oculto.
// El puente electron/preload.js expone checkForUpdates() y onUpdateStatus().
const updateBtn = document.getElementById('menu-actualizar');
let updateState = 'idle'; // idle | checking | downloading | up-to-date | available | downloaded | error
let updateVersion = null;
let updatePercent = 0;

function renderUpdateButton() {
  if (!updateBtn) return;
  let key = 'update.check';
  let vars = null;
  if (updateState === 'checking') {
    key = 'update.checking';
  } else if (updateState === 'downloading') {
    key = 'update.downloading';
    vars = { p: updatePercent };
  } else if (updateState === 'up-to-date') {
    key = 'update.upToDate';
  } else if (updateState === 'available') {
    key = 'update.available';
    vars = { v: updateVersion || '' };
  } else if (updateState === 'downloaded') {
    key = 'update.installNow';
  } else if (updateState === 'error') {
    key = 'update.error';
  }
  updateBtn.textContent = t(key, vars);
  updateBtn.disabled = (updateState === 'checking' || updateState === 'downloading');
}

function handleUpdateStatus(data) {
  if (!data || !data.state) return;
  updateState = data.state;
  if (data.version) updateVersion = data.version;
  if (data.percent !== undefined && data.percent !== null) updatePercent = data.percent;
  renderUpdateButton();
  // 'downloading' no muestra toast: el porcentaje se ve directamente en el botón.
  if (data.state === 'available') {
    showToast(t('update.available', { v: data.version || '' }));
  } else if (data.state === 'downloaded') {
    showToast(t('update.downloaded'));
  } else if (data.state === 'up-to-date') {
    showToast(t('update.upToDate'));
  } else if (data.state === 'error') {
    showToast(t('update.error'));
  }
}

// Dentro de Electron (preload presente): mostramos el botón y nos suscribimos
// a los avisos de estado que reenvía el proceso principal.
if (window.pongDesktop && window.pongDesktop.checkForUpdates) {
  updateBtn.classList.remove('hidden');
  if (window.pongDesktop.onUpdateStatus) {
    window.pongDesktop.onUpdateStatus(handleUpdateStatus);
  }
}

updateBtn.addEventListener('click', () => {
  if (!window.pongDesktop) return;
  // Si ya se ha descargado, el clic reinicia e instala.
  if (updateState === 'downloaded' && window.pongDesktop.quitAndInstall) {
    window.pongDesktop.quitAndInstall().catch(() => {});
    return;
  }
  if (!window.pongDesktop.checkForUpdates) return;
  updateState = 'checking';
  renderUpdateButton();
  window.pongDesktop.checkForUpdates()
    .then(handleUpdateStatus)
    .catch(() => handleUpdateStatus({ state: 'error' }));
});

// Aplicamos el idioma guardado nada más arrancar (el HTML viene en español por
// defecto). Va aquí, DESPUÉS de las declaraciones, para no leer variables que
// aún están en su zona muerta temporal (TDZ).
applyLanguage();

// Arrancamos la carga del splash aquí, DESPUÉS de las declaraciones anteriores,
// para no leer variables que aún están en su zona muerta temporal (TDZ).
startSplashLoading();
// Un toque o clic completa la carga al instante (atajo).
splashEl.addEventListener('pointerdown', finishSplashNow, { once: true });

// Registrar el service worker (solo funciona servido por HTTP/HTTPS, no con file://)
// En la app de escritorio (Electron) lo omitimos: bajo file:// el SW interceptaría
// las peticiones y devolvería respuestas inválidas, rompiendo la carga del juego.
const isElectron = navigator.userAgent.indexOf('Electron') !== -1;
if ('serviceWorker' in navigator && !isElectron) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
  // En cuanto el SW está activo, le pedimos que precargue en segundo plano
  // cualquier asset que falte, para que la siguiente visita sea instantánea.
  navigator.serviceWorker.ready
    .then((registration) => {
      if (registration.active) {
        registration.active.postMessage({ type: 'PRECACHE' });
      }
    })
    .catch(() => {});
}

// Instalación personalizada de la PWA (botón propio en el menú)
let deferredPrompt = null; // evento beforeinstallprompt guardado

window.addEventListener('beforeinstallprompt', (event) => {
  // Evitamos el aviso automático del navegador para mostrar nuestro botón
  event.preventDefault();
  deferredPrompt = event;
  installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); // muestra el diálogo de instalación
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
  if (choice.outcome === 'accepted') {
    showToast(t('toast.installing'));
  }
});

// Si ya se ha instalado, ocultamos el botón
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installBtn.classList.add('hidden');
  showToast(t('toast.installed'));
});
