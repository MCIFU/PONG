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
const musicVolumeSlider = document.getElementById('music-volume');
const effectsVolumeSlider = document.getElementById('effects-volume');
const musicToggleBtn = document.getElementById('music-toggle');
const effectsToggleBtn = document.getElementById('effects-toggle');
const themeClasicoBtn = document.getElementById('theme-clasico');
const themeEnergeticoBtn = document.getElementById('theme-energetico');
const themeTranquiloBtn = document.getElementById('theme-tranquilo');
const rotateHint = document.getElementById('rotate-hint');
const rotateHintClose = document.getElementById('rotate-hint-close');
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
const touchPauseBtn = document.getElementById('touch-pause');
const touchRestartBtn = document.getElementById('touch-restart');
const touchMenuBtn = document.getElementById('touch-menu');
const touchControlsEl = document.getElementById('touch-controls');
const statsCloseBtn = document.getElementById('stats-close');
const statsResetBtn = document.getElementById('stats-reset');
const statsModal = document.getElementById('stats-modal');
const statsTotalEl = document.getElementById('stats-total');
const statsWinsEl = document.getElementById('stats-wins');
const statsLossesEl = document.getElementById('stats-losses');
const statsTimeEl = document.getElementById('stats-time');
const statsBestLineEl = document.getElementById('stats-best-line');
const statsIaBarEl = document.getElementById('stats-ia-bar');
const statsIaLineEl = document.getElementById('stats-ia-line');
const statsIaPercentEl = document.getElementById('stats-ia-percent');
const streakFacilEl = document.getElementById('streak-facil');
const streakNormalEl = document.getElementById('streak-normal');
const streakDificilEl = document.getElementById('streak-dificil');
const statsPvpBarEl = document.getElementById('stats-pvp-bar');
const statsPvpLineEl = document.getElementById('stats-pvp-line');
const statsPvpPercentEl = document.getElementById('stats-pvp-percent');
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
    'setup.subtitle': 'Configura la partida',
    'setup.modeAi': '1 jugador (vs IA)', 'setup.modePvp': '2 jugadores',
    'setup.difficulty': 'Dificultad', 'setup.easy': 'Fácil', 'setup.normal': 'Normal', 'setup.hard': 'Difícil',
    'setup.side': 'Lado', 'setup.left': 'Izquierda', 'setup.right': 'Derecha',
    'setup.points': 'Puntos para ganar',
    'setup.customize': 'Personalizar', 'setup.back': '← Volver', 'setup.start': 'Empezar',
    'desc.facil': 'Pala larga. La IA es torpe y falla a menudo.',
    'desc.normal': 'Pala media. La IA comete algunos errores.',
    'desc.dificil': 'Pala corta. La IA predice la trayectoria y casi no falla.',
    'rotate.hint': 'Gira el móvil a horizontal para jugar mejor',
    'touch.hint': 'Arrastra por el tablero para mover tu pala',
    'touch.pause': 'Pausa', 'touch.restart': 'Reiniciar partida', 'touch.back': 'Volver al menú',
    'gamepoint': '¡Punto de partido!',
    'stats.title': 'Estadísticas', 'stats.total': 'Partidas', 'stats.wins': 'Victorias', 'stats.losses': 'Derrotas',
    'stats.time': 'Tiempo', 'stats.best': 'Mejor resultado', 'stats.vsIa': 'vs IA', 'stats.againstAi': 'Contra la IA',
    'stats.streak': 'Mejor racha', 'stats.reset': 'Borrar historial', 'stats.ia': 'IA',
    'stats.winBarAria': 'Porcentaje de victorias contra la IA', 'stats.pvpBarAria': 'Porcentaje de victorias del jugador 1',
    'stats.winPct': 'Victorias: {pct}%', 'stats.winPctP1': 'Victorias J1: {pct}%',
    'controls.title': 'Controles', 'controls.keyboard': 'Teclado',
    'controls.ws': 'Pala izquierda (subir / bajar)', 'controls.arrows': 'Pala derecha (subir / bajar)',
    'controls.space': 'Empezar / reiniciar', 'controls.pause': 'Pausar', 'controls.esc': 'Volver al menú',
    'controls.mute': 'Silenciar / restaurar sonido', 'controls.touch': 'Táctil',
    'controls.touchDrag': 'Arrastra por el tablero para mover tu pala',
    'controls.touchBtns': 'Pausa, reiniciar y volver al menú con los botones táctiles',
    'sound.title': 'Sonido', 'sound.volume': 'Volumen', 'sound.music': 'Música', 'sound.effects': 'Efectos',
    'sound.toggleTitle': 'Encender/apagar la música de fondo', 'sound.effectsToggle': 'Encender/apagar los efectos de sonido', 'sound.theme': 'Tema musical',
    'sound.themeClassic': 'Clásico', 'sound.themeEnergy': 'Energético', 'sound.themeRelax': 'Tranquilo',
    'language.title': 'Idioma',
    'lang.es': 'Español', 'lang.en': 'Inglés',
    'customize.title': 'Personalizar', 'customize.paddleColor': 'Color de las palas', 'customize.names': 'Nombres',
    'customize.palette': 'Tema de color', 'customize.mode': 'Tema (claro / oscuro)',
    'customize.dark': 'Oscuro', 'customize.light': 'Claro', 'customize.system': 'Sistema',
    'customize.reset': 'Restablecer', 'customize.resetAll': 'Restablecer todo',
    'customize.resetDesc': 'Vuelve a los valores por defecto: colores, volúmenes, temas y estadísticas.',
    'customize.done': 'Hecho', 'customize.p1': 'Jugador 1', 'customize.p2': 'Jugador 2',
    'customize.p1Aria': 'Nombre del jugador de la izquierda', 'customize.p2Aria': 'Nombre del jugador de la derecha',
    'customize.default': 'Por defecto (sigue el tema)',
    'customize.green': 'Verde', 'customize.blue': 'Azul', 'customize.amber': 'Ámbar', 'customize.pink': 'Rosa',
    'customize.cyan': 'Cian', 'customize.yellow': 'Amarillo', 'customize.red': 'Rojo',
    'game.win': '¡Has ganado, {name}!', 'game.iaWins': '¡La IA gana!', 'game.playerWins': '¡{name} gana!',
    'game.record': '¡Nuevo récord!', 'game.bestStreak': 'Mejor racha en {diff}: {n}',
    'game.result': 'Resultado: {s1} - {s2}', 'game.playAgain': 'Jugar de nuevo', 'game.serve': 'SACA',
    'pause.title': 'PAUSA', 'pause.continue': 'Pulsa P para continuar',
    'pause.restart': 'ESPACIO para reiniciar', 'pause.exit': 'ESC para salir al menú',
    'pause.touchContinue': 'Pulsa Pausa para continuar', 'pause.touchRestart': 'Pulsa Reiniciar para empezar de nuevo', 'pause.touchExit': 'Pulsa Casa para salir al menú',
    'toast.muted': 'Sonido silenciado (M para restaurar)', 'toast.unmuted': 'Sonido restaurado',
    'toast.reset': 'Ajustes restablecidos', 'toast.installing': '¡Instalando la app…!', 'toast.installed': '¡App instalada!',
    'confirm.resetStats': '¿Borrar el historial de victorias?',
    'confirm.resetAll': '¿Restablecer todos los ajustes y estadísticas a los valores por defecto?',
    'time.h': 'h', 'time.min': 'min', 'time.s': 's'
  },
  en: {
    'common.close': 'Close', 'common.player1': 'Player 1', 'common.player2': 'Player 2',
    'menu.play': 'Play', 'menu.controls': 'Controls', 'menu.stats': 'Statistics', 'menu.sound': 'Sound',
    'menu.language': 'Language', 'menu.install': 'Install',
    'setup.subtitle': 'Set up the match',
    'setup.modeAi': '1 player (vs AI)', 'setup.modePvp': '2 players',
    'setup.difficulty': 'Difficulty', 'setup.easy': 'Easy', 'setup.normal': 'Normal', 'setup.hard': 'Hard',
    'setup.side': 'Side', 'setup.left': 'Left', 'setup.right': 'Right',
    'setup.points': 'Points to win',
    'setup.customize': 'Customize', 'setup.back': '← Back', 'setup.start': 'Start',
    'desc.facil': 'Long paddle. The AI is clumsy and often misses.',
    'desc.normal': 'Medium paddle. The AI makes some mistakes.',
    'desc.dificil': 'Short paddle. The AI predicts the trajectory and almost never misses.',
    'rotate.hint': 'Turn your phone sideways for a better experience',
    'touch.hint': 'Drag on the board to move your paddle',
    'touch.pause': 'Pause', 'touch.restart': 'Restart match', 'touch.back': 'Back to menu',
    'gamepoint': 'Match point!',
    'stats.title': 'Statistics', 'stats.total': 'Games', 'stats.wins': 'Wins', 'stats.losses': 'Losses',
    'stats.time': 'Time', 'stats.best': 'Best result', 'stats.vsIa': 'vs AI', 'stats.againstAi': 'Against the AI',
    'stats.streak': 'Best streak', 'stats.reset': 'Clear history', 'stats.ia': 'AI',
    'stats.winBarAria': 'Percentage of wins against the AI', 'stats.pvpBarAria': 'Percentage of wins for player 1',
    'stats.winPct': 'Wins: {pct}%', 'stats.winPctP1': 'Player 1 wins: {pct}%',
    'controls.title': 'Controls', 'controls.keyboard': 'Keyboard',
    'controls.ws': 'Left paddle (up / down)', 'controls.arrows': 'Right paddle (up / down)',
    'controls.space': 'Start / restart', 'controls.pause': 'Pause', 'controls.esc': 'Back to menu',
    'controls.mute': 'Mute / restore sound', 'controls.touch': 'Touch',
    'controls.touchDrag': 'Drag on the board to move your paddle',
    'controls.touchBtns': 'Pause, restart and return to menu with the touch buttons',
    'sound.title': 'Sound', 'sound.volume': 'Volume', 'sound.music': 'Music', 'sound.effects': 'Effects',
    'sound.toggleTitle': 'Turn background music on/off', 'sound.effectsToggle': 'Turn sound effects on/off', 'sound.theme': 'Music theme',
    'sound.themeClassic': 'Classic', 'sound.themeEnergy': 'Energetic', 'sound.themeRelax': 'Relaxing',
    'language.title': 'Language',
    'lang.es': 'Spanish', 'lang.en': 'English',
    'customize.title': 'Customize', 'customize.paddleColor': 'Paddle color', 'customize.names': 'Names',
    'customize.palette': 'Color theme', 'customize.mode': 'Theme (light / dark)',
    'customize.dark': 'Dark', 'customize.light': 'Light', 'customize.system': 'System',
    'customize.reset': 'Reset', 'customize.resetAll': 'Reset everything',
    'customize.resetDesc': 'Restores default values: colors, volumes, themes and statistics.',
    'customize.done': 'Done', 'customize.p1': 'Player 1', 'customize.p2': 'Player 2',
    'customize.p1Aria': 'Name of the left player', 'customize.p2Aria': 'Name of the right player',
    'customize.default': 'Default (follows theme)',
    'customize.green': 'Green', 'customize.blue': 'Blue', 'customize.amber': 'Amber', 'customize.pink': 'Pink',
    'customize.cyan': 'Cyan', 'customize.yellow': 'Yellow', 'customize.red': 'Red',
    'game.win': 'You won, {name}!', 'game.iaWins': 'The AI wins!', 'game.playerWins': '{name} wins!',
    'game.record': 'New record!', 'game.bestStreak': 'Best streak in {diff}: {n}',
    'game.result': 'Result: {s1} - {s2}', 'game.playAgain': 'Play again', 'game.serve': 'SERVE',
    'pause.title': 'PAUSE', 'pause.continue': 'Press P to continue',
    'pause.restart': 'SPACE to restart', 'pause.exit': 'ESC to exit to menu',
    'pause.touchContinue': 'Press Pause to continue', 'pause.touchRestart': 'Press Restart to start over', 'pause.touchExit': 'Press Home for the menu',
    'toast.muted': 'Sound muted (M to restore)', 'toast.unmuted': 'Sound restored',
    'toast.reset': 'Settings reset', 'toast.installing': 'Installing the app…!', 'toast.installed': 'App installed!',
    'confirm.resetStats': 'Delete the win history?',
    'confirm.resetAll': 'Reset all settings and statistics to default values?',
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
  if (typeof difficultyDescEl !== 'undefined' && difficultyDescEl) {
    difficultyDescEl.textContent = t('desc.' + difficulty);
  }
  if (typeof renderStats === 'function') renderStats();
  if (typeof overlaySubtitle !== 'undefined' && overlaySubtitle) {
    if (state === 'setup') overlaySubtitle.textContent = t('setup.subtitle');
  }
  if (restartBtn) {
    restartBtn.textContent = state === 'gameover' ? t('game.playAgain') : t('setup.start');
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
const MAX_BALL_SPEED = 11;     // tope de velocidad total (deja margen para que cada golpe acelere)
const TRAIL_LENGTH = 12;       // longitud de la estela de la pelota
const SHADOW_OFFSET = 2;       // desplazamiento (px lógicos) de la sombra dura de palas y pelota
const AI_ACCEL = 0.22;         // inercia de la IA: cuánto acelera/frena su velocidad por fotograma
const AI_SPEED_ERROR_BONUS = 1.5; // error extra de puntería a pleno sprint (la IA apunta peor corriendo)
const PADDLE_ACCEL = 0.5;      // pequeña aceleración de las palas por teclado (física, sin arranques secos)

// Ajustes según la dificultad elegida
const DIFFICULTY = {
  // La pelota empieza a un ritmo vivo pero sin pasarse (más rápido que el
  // original, algo más lento que antes del ajuste). Lo que cambia entre
  // dificultades es el tamaño de la pala y lo torpe/precisa que es la IA.
  // `speedUp` acelera la bola con cada golpe de pala: rallies cada vez más rápidos.
  facil:   { paddleHeight: 120, ballSpeed: 5.5, aiSpeed: 3, speedUp: 1.06, reactionDelay: 25, aimError: 40, reactionJitter: 1.0,
             description: 'Pala larga. La IA es torpe y falla a menudo.' },
  normal:  { paddleHeight: 100, ballSpeed: 6,   aiSpeed: 5, speedUp: 1.08, reactionDelay: 10, aimError: 20, reactionJitter: 0.6,
             description: 'Pala media. La IA comete algunos errores.' },
  dificil: { paddleHeight: 70,  ballSpeed: 7.5, aiSpeed: 7, speedUp: 1.10, reactionDelay: 2,  aimError: 5,  reactionJitter: 0.2,
             description: 'Pala corta. La IA predice la trayectoria y casi no falla.' },
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
  verde: { label: 'Verde', hex: '#7cfc00', rgb: '124, 252, 0', lightHex: '#14802a', lightRgb: '20, 128, 42' },
  azul:  { label: 'Azul',  hex: '#4da6ff', rgb: '77, 166, 255', lightHex: '#0f5fcf', lightRgb: '15, 95, 207' },
  ambar: { label: 'Ámbar', hex: '#ffb020', rgb: '255, 176, 32', lightHex: '#b85e00', lightRgb: '184, 94, 0' },
  rosa:  { label: 'Rosa',  hex: '#ff4dd8', rgb: '255, 77, 216', lightHex: '#d21f66', lightRgb: '210, 31, 102' },
};
let palette = 'verde'; // paleta de color seleccionada
let theme = 'system'; // tema de la interfaz: 'dark' | 'light' | 'system' (sigue al SO)

// Color de acento según el tema efectivo: neón en oscuro, variante oscura en claro
function accentHex() {
  const p = PALETTES[palette];
  return resolvedTheme() === 'light' ? p.lightHex : p.hex;
}
function accentRgb() {
  const p = PALETTES[palette];
  return resolvedTheme() === 'light' ? p.lightRgb : p.rgb;
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
function paddleFillColor() {
  return paddleColor === '#ffffff' ? inkColor() : paddleColor;
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

let score1 = 0;
let score2 = 0;
let lastScore1 = 0; // último valor mostrado, para animar solo cuando cambia
let lastScore2 = 0;
let stats = {
  humanWins: 0,   // victorias del jugador humano contra la IA
  iaWins: 0,      // victorias de la IA
  p1Wins: 0,      // victorias del Jugador 1 (modo 2 jugadores)
  p2Wins: 0,      // victorias del Jugador 2 (modo 2 jugadores)
  bestMargin: 0,   // mayor diferencia de puntos en una sola partida
  bestResult: '—', // marcador de esa mejor partida (ej. "5-0")
  playTimeMs: 0,   // tiempo total de juego (en milisegundos)
  streaks: { facil: 0, normal: 0, dificil: 0 },     // racha actual por dificultad
  bestStreaks: { facil: 0, normal: 0, dificil: 0 }  // mejor racha por dificultad
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
let touchHintShown = false; // el aviso táctil solo se muestra en la primera cuenta atrás
// ¿Es un dispositivo táctil? (se evalúa una vez al cargar, no en cada fotograma)
const IS_TOUCH_DEVICE = typeof matchMedia === 'function' && matchMedia('(hover: none) and (pointer: coarse)').matches;
let aiTargetY = HEIGHT / 2; // a dónde apunta la IA (se actualiza con retraso)
let aiReactionTimer = 0;    // fotogramas restantes hasta que la IA reaccione

// 4. Teclado: guardamos qué teclas están pulsadas
const keys = {};
const activePointers = {};     // dedos activos sobre el lienzo (pointerId -> lado)
const pointerPositions = {};   // última posición Y de cada dedo (pointerId -> clientY)

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
    // ESC cierra modales o vuelve al menú
    if (!statsModal.classList.contains('hidden')) {
      closeStats();
    } else if (!controlsModal.classList.contains('hidden')) {
      closeControls();
    } else if (!personalizeModal.classList.contains('hidden')) {
      closePersonalize();
    } else if (!soundModal.classList.contains('hidden')) {
      closeSound();
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
let musicVolume = 1;   // volumen de las melodías (victoria/derrota/récord)
let effectsVolume = 1; // volumen de los efectos (rebotes, puntos, pausa)
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
  // Melodía ascendente (Do-Mi-Sol-Do)
  beep(523, 0.14, 'square', 0.22, 0, 'music');
  beep(659, 0.14, 'square', 0.22, 0.15, 'music');
  beep(784, 0.18, 'square', 0.22, 0.30, 'music');
  beep(1047, 0.25, 'square', 0.26, 0.45, 'music');
}

function playLose() {
  // Melodía descendente (Sol-Mi-Do)
  beep(392, 0.16, 'sawtooth', 0.2, 0, 'music');
  beep(330, 0.16, 'sawtooth', 0.2, 0.18, 'music');
  beep(262, 0.28, 'sawtooth', 0.2, 0.36, 'music');
}

// Melodía de celebración al batir un récord
function playRecord() {
  beep(523, 0.1, 'square', 0.25, 0, 'music');      // Do
  beep(659, 0.1, 'square', 0.25, 0.12, 'music');   // Mi
  beep(784, 0.1, 'square', 0.25, 0.24, 'music');   // Sol
  beep(1047, 0.15, 'square', 0.3, 0.36, 'music');  // Do agudo
  beep(1319, 0.25, 'square', 0.3, 0.50, 'music');  // Mi agudo
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
  if (!musicEnabled || musicOn || !audioCtx) return;
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

function handleSpace() {
  // ESPACIO empieza la partida desde el menú o la configuración, y la reinicia
  // tanto en plena partida como en pausa.
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
  beep(paused ? 250 : 500, 0.08, 'square', 0.2); // grave al pausar, agudo al reanudar
  if (paused) stopBackgroundMusic();
  else startBackgroundMusic();
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
  restartBtn.classList.remove('hidden');
  restartBtn.textContent = t('setup.start');
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

// Vuelve al menú principal, descartando la partida en curso
function quitToMenu() {
  if (state === 'start') return; // ya estamos en el menú principal
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

// Nombre del jugador humano (depende del lado elegido contra la IA)
function humanName() {
  return playerSide === 'left' ? player1Name : player2Name;
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
      stats.bestMargin = saved.bestMargin || 0;
      stats.bestResult = saved.bestResult || '—';
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

function resetStats() {
  if (!confirm(t('confirm.resetStats'))) return;
  stats = {
    humanWins: 0,
    iaWins: 0,
    p1Wins: 0,
    p2Wins: 0,
    bestMargin: 0,
    bestResult: '—',
    playTimeMs: 0,
    streaks: { facil: 0, normal: 0, dificil: 0 },
    bestStreaks: { facil: 0, normal: 0, dificil: 0 }
  };
  saveStats();
  renderStats(); // actualizamos el modal de estadísticas en el que se pulsa el botón
}

// Restablece todos los ajustes guardados y las estadísticas a sus valores por defecto
function resetAllSettings() {
  if (!confirm(t('confirm.resetAll'))) return;

  // 1. Borramos todas las claves guardadas del juego
  try {
    [
      'pong-music-volume', 'pong-effects-volume', 'pong-volume',
      'pong-music-enabled', 'pong-effects-enabled', 'pong-music-theme', 'pong-stats', 'pong-names',
      'pong-color', 'pong-palette', 'pong-theme'
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
  player1Name = 'Jugador 1';
  player2Name = 'Jugador 2';
  stats = {
    humanWins: 0,
    iaWins: 0,
    p1Wins: 0,
    p2Wins: 0,
    bestMargin: 0,
    bestResult: '—',
    playTimeMs: 0,
    streaks: { facil: 0, normal: 0, dificil: 0 },
    bestStreaks: { facil: 0, normal: 0, dificil: 0 }
  };

  // 3. Sincronizamos toda la interfaz con los valores por defecto
  musicVolumeSlider.value = '1';
  effectsVolumeSlider.value = '1';
  updateMusicToggleBtn();
  updateEffectsToggleBtn();
  updateThemeButtons();
  setPaddleColor(paddleColor);
  setPalette(palette);
  setTheme(theme);
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

function renderStats() {
  const total = stats.humanWins + stats.iaWins + stats.p1Wins + stats.p2Wins;
  statsTotalEl.textContent = String(total);
  statsWinsEl.textContent = String(stats.humanWins);
  statsLossesEl.textContent = String(stats.iaWins);
  statsTimeEl.textContent = formatPlayTime(stats.playTimeMs);
  statsBestLineEl.textContent = stats.bestResult;

  // Barra de porcentaje contra la IA (verde = victorias tuyas).
  const iaGames = stats.humanWins + stats.iaWins;
  const iaPct = iaGames === 0 ? 0 : (stats.humanWins / iaGames) * 100;
  statsIaBarEl.style.width = iaPct.toFixed(1) + '%';
  statsIaLineEl.textContent = `${humanName()} ${stats.humanWins} · ${t('stats.ia')} ${stats.iaWins}`;
  statsIaPercentEl.textContent = iaGames === 0
    ? 'Victorias: —'
    : `Victorias: ${Math.round(iaPct)}%`;

  streakFacilEl.textContent = `${difficultyName('facil')} ${stats.bestStreaks.facil}`;
  streakNormalEl.textContent = `${difficultyName('normal')} ${stats.bestStreaks.normal}`;
  streakDificilEl.textContent = `${difficultyName('dificil')} ${stats.bestStreaks.dificil}`;

  // Barra de porcentaje en 2 jugadores (verde = victorias del jugador 1).
  const pvpGames = stats.p1Wins + stats.p2Wins;
  const pvpPct = pvpGames === 0 ? 0 : (stats.p1Wins / pvpGames) * 100;
  statsPvpBarEl.style.width = pvpPct.toFixed(1) + '%';
  statsPvpLineEl.textContent = `${player1Name} ${stats.p1Wins} · ${player2Name} ${stats.p2Wins}`;
  statsPvpPercentEl.textContent = pvpGames === 0
    ? 'Victorias J1: —'
    : `Victorias J1: ${Math.round(pvpPct)}%`;
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
  updateScoreboard();
  overlay.classList.add('hidden');
  state = 'playing';
  updateDifficultyBadge();
  touchControlsEl.classList.add('in-game'); // botones táctiles solo durante la partida
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
  aiTargetY = HEIGHT / 2;
  aiReactionTimer = 0;
  paddle1.vel = 0;
  paddle2.vel = 0;
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

// Predice la coordenada Y (centro) a la que llegará la pelota cuando alcance
// la pala de la IA, teniendo en cuenta los rebotes en el techo y el suelo.
// Solo sirve cuando la pelota se dirige hacia la IA.
function predictBallY() {
  const aiOnRight = playerSide === 'left';
  const aiPaddle = aiOnRight ? paddle2 : paddle1;
  // Línea X donde la pelota tocaría la cara de la pala de la IA
  const targetX = aiOnRight ? aiPaddle.x - BALL_SIZE : aiPaddle.x + PADDLE_WIDTH;

  const vx = ball.vx;
  const movingTowardAI = aiOnRight ? vx > 0 : vx < 0;
  if (!movingTowardAI) return ball.y + BALL_SIZE / 2; // aún no podemos predecir

  // Simulamos el vuelo fotograma a fotograma (la velocidad horizontal es constante)
  let x = ball.x;
  let y = ball.y;
  let vy = ball.vy;

  for (let i = 0; i < 2000; i++) {
    x += vx;
    y += vy;

    // Rebotes en el techo y el suelo (igual que en update())
    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y + BALL_SIZE >= HEIGHT) {
      y = HEIGHT - BALL_SIZE;
      vy = -Math.abs(vy);
    }

    if (aiOnRight ? x >= targetX : x <= targetX) {
      return y + BALL_SIZE / 2;
    }
  }

  return ball.y + BALL_SIZE / 2; // por seguridad, devolvemos la posición actual
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

    // Pala humana con pequeña aceleración (física, sin arranques secos)
    const humanDesired = (keys['w'] ? -PADDLE_SPEED : 0) + (keys['s'] ? PADDLE_SPEED : 0);
    humanPaddle.vel += (humanDesired - humanPaddle.vel) * PADDLE_ACCEL;
    humanPaddle.y += humanPaddle.vel;

    // La IA reacciona a la pelota con un retraso según la dificultad.
    // En difícil, además, predice la trayectoria en lugar de solo seguirla.
    aiReactionTimer--;
    if (aiReactionTimer <= 0) {
      const baseTarget =
        difficulty === 'dificil'
          ? predictBallY()
          : ball.y + BALL_SIZE / 2;
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

  // Cuenta atrás antes del saque (3, 2, 1...)
  if (countdown > 0) {
    launchTimer--;
    if (launchTimer <= 0) {
      countdown--;
      launchTimer = 60; // un segundo para el siguiente número
      if (countdown === 0) launchBall();
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
  // Cada golpe acelera según la dificultad (speedUp), sin superar el tope máximo.
  // El factor móvil solo se aplica en el SAQUE (launchBall); aquí NO se repite,
  // porque multiplicar por un factor < 1 junto al speedUp (> 1) frenaría la bola
  // en cada golpe en vez de acelerarla (0.85 × 1.08 < 1).
  const speed = Math.min(Math.hypot(ball.vx, ball.vy) * ballSpeedUp, MAX_BALL_SPEED);
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
  // Mejor resultado: mayor diferencia de puntos en una sola partida
  const margin = Math.abs(score1 - score2);
  if (margin > stats.bestMargin) {
    stats.bestMargin = margin;
    stats.bestResult = `${Math.max(score1, score2)}-${Math.min(score1, score2)}`;
    saveStats();
  }

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
  const py1 = Math.round(paddle1.y);
  const py2 = Math.round(paddle2.y);
  ctx.fillStyle = hardShadowColor();
  ctx.fillRect(paddle1.x + SHADOW_OFFSET, py1 + SHADOW_OFFSET, PADDLE_WIDTH, paddleHeight);
  ctx.fillRect(paddle2.x + SHADOW_OFFSET, py2 + SHADOW_OFFSET, PADDLE_WIDTH, paddleHeight);
  ctx.fillStyle = paddleFillColor();
  ctx.fillRect(paddle1.x, py1, PADDLE_WIDTH, paddleHeight);
  ctx.fillRect(paddle2.x, py2, PADDLE_WIDTH, paddleHeight);
  ctx.strokeStyle = accentHex();
  ctx.lineWidth = 1;
  ctx.strokeRect(paddle1.x + 0.5, py1 + 0.5, PADDLE_WIDTH - 1, paddleHeight - 1);
  ctx.strokeRect(paddle2.x + 0.5, py2 + 0.5, PADDLE_WIDTH - 1, paddleHeight - 1);

  // Estela de la pelota: un degradado suave que se estrecha y desvanece
  // (color fijo, sin cambiar de tono con la velocidad).
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < trail.length - 1; i++) {
    const progress = i / (trail.length - 1); // 0 = reciente, 1 = antiguo
    const alpha = (1 - progress) * 0.45;
    const lineWidth = BALL_SIZE * (1 - progress * 0.7);
    ctx.strokeStyle = `rgba(${accentRgb()}, ${alpha})`;
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
  const bx = Math.round(ball.x);
  const by = Math.round(ball.y);
  ctx.fillStyle = hardShadowColor();
  ctx.fillRect(bx + SHADOW_OFFSET, by + SHADOW_OFFSET, BALL_SIZE, BALL_SIZE);
  ctx.fillStyle = inkColor();
  ctx.fillRect(bx, by, BALL_SIZE, BALL_SIZE);
  // Contorno de 1px del color del tema (sprite arcade clásico)
  ctx.strokeStyle = accentHex();
  ctx.lineWidth = 1;
  ctx.strokeRect(bx + 0.5, by + 0.5, BALL_SIZE - 1, BALL_SIZE - 1);

  // Cuenta atrás antes del saque
  if (countdown > 0 && state === 'playing' && !paused) {
    ctx.fillStyle = inkColor();
    ctx.font = '48px ' + DISPLAY_FONT;
    ctx.textAlign = 'center';
    ctx.fillText(countdown, WIDTH / 2, HEIGHT / 2);

    // En móvil, un pequeño aviso bajo el número: se muestra solo en la primera
    // cuenta atrás de la partida y desaparece al lanzar la pelota.
    if (IS_TOUCH_DEVICE && !touchHintShown) {
      ctx.fillStyle = accentHex();
      ctx.font = '12px ' + DISPLAY_FONT;
      ctx.fillText(t('touch.hint'), WIDTH / 2, HEIGHT / 2 + 42);
      if (countdown === 1) touchHintShown = true;
    }

    // Indicador de quién saca: flecha hacia el centro junto a su pala
    const serving = serverSide === 'left' ? paddle1 : paddle2;
    const dir = serverSide === 'left' ? 1 : -1;
    const edgeX = serverSide === 'left' ? serving.x + PADDLE_WIDTH : serving.x;
    const cy = serving.y + paddleHeight / 2;

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

  // Pantalla de pausa
  if (paused && state === 'playing') {
    ctx.fillStyle = resolvedTheme() === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(5, 5, 10, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = inkColor();
    ctx.font = '36px ' + DISPLAY_FONT;
    ctx.textAlign = 'center';
    ctx.fillText(t('pause.title'), WIDTH / 2, HEIGHT / 2 - 10);
    ctx.font = '18px ' + DISPLAY_FONT;
    if (IS_TOUCH_DEVICE) {
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

// 9. Bucle principal: se repite unas 60 veces por segundo
let lastFrameTime = 0; // timestamp del fotograma anterior (para medir el tiempo de juego)
let lastAutoSaveTime = 0; // último guardado automático del tiempo (para no perder minutos)

function loop(now) {
  if (lastFrameTime > 0) {
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
  }
  lastFrameTime = now;

  update();
  draw();
  requestAnimationFrame(loop);
}

// 10. Arranque
restartBtn.addEventListener('click', handleSpace);
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
rotateHintClose.addEventListener('click', () => rotateHint.classList.add('dismissed'));

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
    if (state !== 'playing' || paused) return;
    if (event.target.closest(DRAG_IGNORE)) return; // no secuestrar botones táctiles
    const side = getSideForPointer(event.clientX);
    activePointers[event.pointerId] = side;
    pointerPositions[event.pointerId] = event.clientY;
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
  });

  window.addEventListener('pointercancel', (event) => {
    if (activePointers[event.pointerId] === undefined) return;
    delete activePointers[event.pointerId];
    delete pointerPositions[event.pointerId];
  });
} else {
  stage.addEventListener('pointerdown', (event) => {
    if (state !== 'playing' || paused) return;
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
// Antes se movía la pala en cada evento pointermove; ahora medimos el lienzo una
// sola vez y movemos todas las palas a la vez, reduciendo el trabajo del arrastre.
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
    paddle.vel = 0; // el arrastre táctil es control absoluto, sin inercia residual
    paddle.y = clamp((clientY - rect.top) * scaleY - paddleHeight / 2, 0, HEIGHT - paddleHeight);
  }
}
statsResetBtn.addEventListener('click', resetStats);
statsCloseBtn.addEventListener('click', closeStats);
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
  const btn = event.target.closest('.button, .mode-button, .link-button, .touch-btn');
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

const SPLASH_MIN_MS = 1500; // tiempo mínimo visible del splash
let splashHidden = false;
let splashStarted = false;
let splashProgress = 0;    // 0..1, solo avanza
let assetsDone = false;    // todos los assets han terminado de cargar
let minTimeElapsed = false;

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
  if (assetsDone && minTimeElapsed) hideSplash();
}

function finishSplashNow() {
  assetsDone = true;
  minTimeElapsed = true;
  setSplashProgress(1);
  hideSplash();
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
if ('serviceWorker' in navigator) {
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
