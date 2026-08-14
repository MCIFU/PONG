// ==========================================================
//  PONG — un juego sencillo en HTML, CSS y JavaScript puro
// ==========================================================

// 1. Referencias a los elementos de la página
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const splashEl = document.getElementById('splash');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const matchScoreEl = document.getElementById('match-score');
const label1El = document.getElementById('label1');
const label2El = document.getElementById('label2');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlaySubtitle = document.getElementById('overlay-subtitle');
const restartBtn = document.getElementById('restart');
const volumeBtn = document.getElementById('volume-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumePanel = document.getElementById('volume-panel');
const musicVolumeSlider = document.getElementById('music-volume');
const effectsVolumeSlider = document.getElementById('effects-volume');
const musicToggleBtn = document.getElementById('music-toggle');
const themeClasicoBtn = document.getElementById('theme-clasico');
const themeEnergeticoBtn = document.getElementById('theme-energetico');
const themeTranquiloBtn = document.getElementById('theme-tranquilo');
const gamepadIndicatorEl = document.getElementById('gamepad-indicator');
const fullscreenBtn = document.getElementById('fullscreen');
const menuBtn = document.getElementById('menu');
const fillExitBtn = document.getElementById('fill-exit');
const rotateHint = document.getElementById('rotate-hint');
const rotateHintClose = document.getElementById('rotate-hint-close');
const toastEl = document.getElementById('toast');
const modePvpBtn = document.getElementById('mode-pvp');
const modeAiBtn = document.getElementById('mode-ai');
const diffFacilBtn = document.getElementById('diff-facil');
const diffNormalBtn = document.getElementById('diff-normal');
const diffDificilBtn = document.getElementById('diff-dificil');
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
const menuMainEl = document.getElementById('menu-main');
const menuSetupEl = document.getElementById('menu-setup');
const menuJugarBtn = document.getElementById('menu-jugar');
const menuControlesBtn = document.getElementById('menu-controles');
const menuEstadisticasBtn = document.getElementById('menu-estadisticas');
const menuPersonalizarBtn = document.getElementById('menu-personalizar');
const menuVolverBtn = document.getElementById('menu-volver');
const installBtn = document.getElementById('install-btn');
const personalizeModal = document.getElementById('personalize-modal');
const personalizeCloseBtn = document.getElementById('personalize-close');
const qualityBajaBtn = document.getElementById('quality-baja');
const qualityMediaBtn = document.getElementById('quality-media');
const qualityAltaBtn = document.getElementById('quality-alta');
const vibrationOnBtn = document.getElementById('vibration-on');
const vibrationOffBtn = document.getElementById('vibration-off');
const renderingPixeladoBtn = document.getElementById('rendering-pixelado');
const renderingSuaveBtn = document.getElementById('rendering-suave');
const crtOnBtn = document.getElementById('crt-on');
const crtOffBtn = document.getElementById('crt-off');
const assignLeftBtn = document.getElementById('assign-left');
const assignRightBtn = document.getElementById('assign-right');
const touchPauseBtn = document.getElementById('touch-pause');
const touchMenuBtn = document.getElementById('touch-menu');
const statsP1El = document.getElementById('stats-p1');
const statsP2El = document.getElementById('stats-p2');
const statsStreakEl = document.getElementById('stats-streak');
const resetStatsBtn = document.getElementById('reset-stats');
const statsOpenBtn = document.getElementById('stats-open');
const statsCloseBtn = document.getElementById('stats-close');
const statsModal = document.getElementById('stats-modal');
const statsTotalEl = document.getElementById('stats-total');
const statsWinLossEl = document.getElementById('stats-winloss');
const statsTimeEl = document.getElementById('stats-time');
const statsIaLineEl = document.getElementById('stats-ia-line');
const statsIaPercentEl = document.getElementById('stats-ia-percent');
const statsBestStreaksEl = document.getElementById('stats-best-streaks');
const statsPvpLineEl = document.getElementById('stats-pvp-line');
const statsPvpPercentEl = document.getElementById('stats-pvp-percent');
const statsBestEl = document.getElementById('stats-best');
const statsBestLineEl = document.getElementById('stats-best-line');
const stage = document.querySelector('.stage');

// 2. Ajustes del juego (puedes cambiar estos números para experimentar)
const WIDTH = 800;   // ancho lógico del juego
const HEIGHT = 500;  // alto lógico del juego

// Escala de dibujado: se ajusta al tamaño real del lienzo en pantalla
// (y a la densidad de píxeles) para que se vea siempre nítido.
let renderScaleX = 1;
let renderScaleY = 1;

// Calidad gráfica: limita la resolución máxima del lienzo (baja/media/alta)
const QUALITY_MAX_SCALE = { baja: 1, media: 2, alta: 4 };
let graphicsQuality = 'alta'; // 'baja' | 'media' | 'alta'
let renderingMode = 'pixelado'; // 'pixelado' (nítido) | 'suave' (bilineal)
let crtEffect = true; // efecto CRT (scanlines, viñeta y curvatura) activado/desactivado

// Ajusta la resolución del lienzo al tamaño que ocupa en pantalla
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  if (rect.width === 0 || rect.height === 0) return; // aún sin tamaño visible

  // Escala entera (1x, 2x, 3x...) para que los bordes de las palas y la pelota
  // queden perfectamente nítidos, sin píxeles a medias.
  const maxScale = QUALITY_MAX_SCALE[graphicsQuality]; // tope según la calidad elegida
  const scale = Math.min(
    Math.max(1, Math.floor((rect.width * dpr) / WIDTH)),
    maxScale
  );

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
const WINNING_SCORE = 5;       // puntos para ganar
const TRAIL_LENGTH = 12;       // longitud de la estela de la pelota
const GAMEPAD_DEADZONE = 0.3; // zona muerta del joystick (umbral que ignora el temblor del stick)

// Ajustes según la dificultad elegida
const DIFFICULTY = {
  facil:   { paddleHeight: 120, ballSpeed: 3.5, aiSpeed: 3,   reactionDelay: 25, aimError: 40, reactionJitter: 1.0 },
  normal:  { paddleHeight: 100, ballSpeed: 4,   aiSpeed: 4,   reactionDelay: 12, aimError: 15, reactionJitter: 0.5 },
  dificil: { paddleHeight: 70,  ballSpeed: 5.5, aiSpeed: 5.5, reactionDelay: 3,  aimError: 5,  reactionJitter: 0.2 },
};

// Nombres bonitos de cada dificultad (para mostrarlos en pantalla)
const DIFFICULTY_LABELS = { facil: 'Fácil', normal: 'Normal', dificil: 'Difícil' };

// Estos valores cambian al elegir la dificultad
let paddleHeight = DIFFICULTY.normal.paddleHeight;
let ballSpeed = DIFFICULTY.normal.ballSpeed;
let aiSpeed = DIFFICULTY.normal.aiSpeed;
let aiReactionDelay = DIFFICULTY.normal.reactionDelay; // fotogramas de "tiempo de reacción"
let aiAimError = DIFFICULTY.normal.aimError; // error máximo de puntería de la IA (en píxeles)
let aiReactionJitter = DIFFICULTY.normal.reactionJitter; // cuánto varía la reacción (0 = constante, 1 = muy irregular)
let paddleColor = '#ffffff'; // color de las palas (personalizable)
let gamepadVibration = true; // ¿vibran los mandos al marcar un punto?
let gamepadLeft = 0;   // índice del mando que controla la pala izquierda
let gamepadRight = 1;  // índice del mando que controla la pala derecha
let assigningPaddle = null; // 'left' | 'right' | null (mientras asignamos un mando)
let assignTimer = null;     // cancela la asignación si no se pulsa nada

// 3. Estado del juego
const paddle1 = { x: 30, y: HEIGHT / 2 - paddleHeight / 2 };
const paddle2 = { x: WIDTH - 30 - PADDLE_WIDTH, y: HEIGHT / 2 - paddleHeight / 2 };
const ball = { x: WIDTH / 2 - BALL_SIZE / 2, y: HEIGHT / 2 - BALL_SIZE / 2, vx: 0, vy: 0 };
const trail = []; // posiciones anteriores de la pelota para dibujar la estela

let score1 = 0;
let score2 = 0;
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
let mode = 'pvp';      // 'pvp' = 2 jugadores | 'ai' = 1 jugador contra la IA
let difficulty = 'normal'; // dificultad del juego: 'facil' | 'normal' | 'dificil'
let playerSide = 'left';   // lado del jugador contra la IA: 'left' | 'right'
let bestOf = 1;            // partidas al mejor de: 1, 3 o 5
let gamesWon1 = 0;         // partidas ganadas por el lado izquierdo en este enfrentamiento
let gamesWon2 = 0;         // partidas ganadas por el lado derecho en este enfrentamiento
let player1Name = 'Jugador 1'; // nombre del jugador de la izquierda
let player2Name = 'Jugador 2'; // nombre del jugador de la derecha
let state = 'start';   // 'start' = menú principal | 'setup' = configuración | 'playing' = jugando | 'setover' = entre partidas | 'gameover' = fin del enfrentamiento
let paused = false;    // true mientras el juego está en pausa
let launchTimer = 0;   // fotogramas restantes hasta el siguiente número de la cuenta atrás
let countdown = 0;     // número que se muestra antes del saque (3, 2, 1...)
let aiTargetY = HEIGHT / 2; // a dónde apunta la IA (se actualiza con retraso)
let aiReactionTimer = 0;    // fotogramas restantes hasta que la IA reaccione

// 4. Teclado: guardamos qué teclas están pulsadas
const keys = {};
const prevGamepadButtons = {}; // para detectar cuándo se pulsa un botón del mando
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

  if (key === 'f') {
    toggleFullscreen();
  }

  if (key === 'm') {
    toggleMute();
  }

  if (key === 'escape') {
    // Si estamos en pantalla completa, ESC la cierra primero (lo hace el navegador);
    // si no, cerramos las estadísticas o volvemos al menú.
    const inFullscreen = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    if (!inFullscreen) {
      if (!statsModal.classList.contains('hidden')) {
        closeStats();
      } else if (!controlsModal.classList.contains('hidden')) {
        closeControls();
      } else if (!personalizeModal.classList.contains('hidden')) {
        closePersonalize();
      } else if (!volumePanel.classList.contains('hidden')) {
        closeVolumePanel();
      } else {
        quitToMenu();
      }
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

// Cada tema define su ritmo (step, en segundos), su melodía y su bajo. 0 = silencio.
const MUSIC_THEMES = {
  clasico: {
    label: 'Clásico',
    step: 0.22,
    melody: [
      440.00, 0, 523.25, 0, 659.25, 0, 523.25, 0,   // La - Do - Mi - Do
      349.23, 0, 440.00, 0, 523.25, 0, 659.25, 0    // Fa - La - Do - Mi
    ],
    bass: [
      110.00, 0, 0, 0, 110.00, 0, 0, 0,
      87.31,  0, 0, 0, 87.31,  0, 0, 0
    ]
  },
  energetico: {
    label: 'Energético',
    step: 0.15,
    melody: [
      329.63, 0, 392.00, 440.00, 392.00, 0, 329.63, 0,
      293.66, 0, 329.63, 392.00, 440.00, 493.88, 440.00, 0
    ],
    bass: [
      82.41, 0, 82.41, 0, 98.00, 0, 98.00, 0,
      110.00, 0, 110.00, 0, 82.41, 0, 82.41, 0
    ]
  },
  tranquilo: {
    label: 'Tranquilo',
    step: 0.3,
    melody: [
      261.63, 0, 0, 329.63, 0, 0, 293.66, 0,
      0, 261.63, 0, 0, 220.00, 0, 0, 0
    ],
    bass: [
      130.81, 0, 0, 0, 0, 0, 146.83, 0,
      0, 0, 0, 0, 110.00, 0, 0, 0
    ]
  }
};

let currentTheme = 'clasico'; // tema musical seleccionado

// Cómo cambia la música según la dificultad de la IA (en 2 jugadores usa 'normal')
const DIFFICULTY_MUSIC = {
  facil:   { tempo: 1.15, intensity: 0.75 }, // más lento y suave
  normal:  { tempo: 1.0,  intensity: 1.0 },
  dificil: { tempo: 0.8,  intensity: 1.25 }  // más rápido e intenso
};

let musicOn = false;   // true mientras la música de fondo está sonando
let musicGain = null;  // nodo de volumen de la música (para ajustarla por separado)
let musicStep = 0;     // paso actual de la secuencia
let musicNextTime = 0; // instante (reloj de audio) de la próxima nota
let musicTimer = null; // temporizador que programa las notas por adelantado

// Empieza la música de fondo (solo si el audio está disponible y está activada)
function startBackgroundMusic() {
  if (!musicEnabled || musicOn || !audioCtx) return;
  musicOn = true;
  musicGain = audioCtx.createGain();
  musicGain.gain.value = musicVolume * MUSIC_GAIN;
  musicGain.connect(audioCtx.destination);
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
}

// Programa las notas de música hasta ~0,2 s por delante del reloj de audio.
// El tempo y la intensidad cambian según la dificultad de la IA.
function scheduleMusic() {
  if (!musicOn || !audioCtx) return;
  const theme = MUSIC_THEMES[currentTheme];
  const music = DIFFICULTY_MUSIC[mode === 'ai' ? difficulty : 'normal'];
  const stepDuration = theme.step * music.tempo;
  while (musicNextTime < audioCtx.currentTime + 0.2) {
    scheduleMusicStep(theme, musicStep, musicNextTime, stepDuration, music.intensity);
    musicNextTime += stepDuration;
    musicStep = (musicStep + 1) % theme.melody.length;
  }
}

// Programa la melodía y el bajo de un paso en un instante concreto
function scheduleMusicStep(theme, step, when, stepDuration, intensity) {
  playMusicNote(theme.melody[step], when, 'triangle', 0.5 * intensity, stepDuration);
  playMusicNote(theme.bass[step], when, 'sine', 0.4 * intensity, stepDuration);
}

function playMusicNote(frequency, when, type, level, step) {
  if (!frequency) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;

  // Ataque suave y caída para que las notas se fundan sin "clics"
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(level, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + step * 0.95);

  osc.connect(gain);
  gain.connect(musicGain);
  osc.start(when);
  osc.stop(when + step);
}

// Control de volumen (música y efectos por separado)
function updateVolumeIcon() {
  if (musicVolume === 0 && effectsVolume === 0) {
    volumeIcon.textContent = '🔇';
  } else if (musicVolume <= 0.5 && effectsVolume <= 0.5) {
    volumeIcon.textContent = '🔉';
  } else {
    volumeIcon.textContent = '🔊';
  }
}

function handleVolumeChange() {
  musicVolume = Number(musicVolumeSlider.value);
  effectsVolume = Number(effectsVolumeSlider.value);
  muted = false; // al mover un deslizador salimos del modo silencio
  try {
    localStorage.setItem('pong-music-volume', String(musicVolume));
    localStorage.setItem('pong-effects-volume', String(effectsVolume));
  } catch (error) {
    // si el navegador bloquea localStorage, seguimos sin guardar
  }
  updateVolumeIcon();
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

// Cambia el tema musical y lo guarda
function setMusicTheme(theme) {
  if (!MUSIC_THEMES[theme]) return;
  currentTheme = theme;
  try {
    localStorage.setItem('pong-music-theme', theme);
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

function toggleVolumePanel() {
  volumePanel.classList.toggle('hidden');
}

function closeVolumePanel() {
  volumePanel.classList.add('hidden');
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

  // Sincronizamos deslizadores, icono y la música de fondo si está sonando
  musicVolumeSlider.value = String(musicVolume);
  effectsVolumeSlider.value = String(effectsVolume);
  updateVolumeIcon();
  if (musicGain) musicGain.gain.value = musicVolume * MUSIC_GAIN;
  showToast(muted ? '🔇 Sonido silenciado (M para restaurar)' : '🔊 Sonido restaurado');
}

// 6. Funciones auxiliares
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScoreboard() {
  score1El.textContent = score1;
  score2El.textContent = score2;
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

function handleSpace() {
  if (state === 'start') {
    showSetup();
  } else if (state === 'setup' || state === 'gameover') {
    startGame();
  } else if (state === 'setover') {
    startNextGame();
  }
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
}

// Muestra el menú principal (Jugar / Controles / Estadísticas)
function showMainMenu() {
  state = 'start';
  menuMainEl.classList.remove('hidden');
  menuSetupEl.classList.add('hidden');
  restartBtn.classList.add('hidden');
  overlayTitle.textContent = 'PONG';
  overlaySubtitle.textContent = 'Elige una opción';
  overlay.classList.remove('hidden');
}

// Muestra la pantalla de configuración de la partida
function showSetup() {
  state = 'setup';
  menuMainEl.classList.add('hidden');
  menuSetupEl.classList.remove('hidden');
  restartBtn.classList.remove('hidden');
  restartBtn.textContent = 'Empezar';
  overlayTitle.textContent = 'PONG';
  overlaySubtitle.textContent = 'Configura la partida';
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
  paused = false;
  score1 = 0;
  score2 = 0;
  gamesWon1 = 0;
  gamesWon2 = 0;
  updateScoreboard();
  updateMatchScore();
  resetBall(); // deja la pelota centrada y limpia la estela
  showMainMenu();
}

// true si usamos el "relleno" por CSS (móvil sin Fullscreen API)
let cssFullscreen = false;

// Alterna entre pantalla completa y normal (Fullscreen API, con soporte de Safari/iPad).
// En navegadores sin Fullscreen API (p. ej. iPhone) usa un relleno por CSS.
function toggleFullscreen() {
  const el = document.documentElement;
  const isFullscreen = Boolean(document.fullscreenElement || document.webkitFullscreenElement);

  if (supportsFullscreen) {
    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {}); // por si el navegador lo rechaza
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  } else {
    // Sin Fullscreen API: alternamos el relleno por CSS
    cssFullscreen = !cssFullscreen;
    updateFullscreenButton();
  }
}

// Actualiza el icono del botón y el escalado según el estado
function updateFullscreenButton() {
  const apiFullscreen = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  const active = apiFullscreen || cssFullscreen;
  fullscreenBtn.textContent = active ? '⤢' : '⛶';
  fullscreenBtn.setAttribute('aria-label', active ? 'Salir de pantalla completa' : 'Pantalla completa');
  fullscreenBtn.setAttribute('title', active ? 'Salir de pantalla completa' : 'Pantalla completa');

  // En pantalla completa, el lienzo crece para llenar la pantalla
  document.body.classList.toggle('is-fullscreen', active);
  fillExitBtn.classList.toggle('hidden', !active);
  resizeCanvas(); // el lienzo cambia de tamaño al entrar/salir
}

function setMode(newMode) {
  mode = newMode;
  modePvpBtn.classList.toggle('selected', mode === 'pvp');
  modeAiBtn.classList.toggle('selected', mode === 'ai');

  // El selector de lado solo tiene sentido contra la IA
  sideSelector.classList.toggle('hidden', mode !== 'ai');

  updateScoreLabels();
  updateStatsDisplay();
}

function updateScoreLabels() {
  if (mode === 'ai') {
    label1El.textContent = playerSide === 'left' ? humanName() : 'IA';
    label2El.textContent = playerSide === 'left' ? 'IA' : humanName();
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
  updateStatsDisplay();
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
  updateStatsDisplay();
}

// Número de partidas que hay que ganar para llevarse el enfrentamiento
function gamesToWin() {
  return Math.ceil(bestOf / 2); // 1 → 1, 3 → 2, 5 → 3
}

// Nombre del jugador humano (depende del lado elegido contra la IA)
function humanName() {
  return playerSide === 'left' ? player1Name : player2Name;
}

// Etiqueta visible de un lado (izquierda o derecha) según el modo de juego
function sideLabel(side) {
  if (mode === 'ai') {
    return playerSide === side ? humanName() : 'IA';
  }
  return side === 'left' ? player1Name : player2Name;
}

function setBestOf(newBestOf) {
  bestOf = newBestOf;
  bestOf1Btn.classList.toggle('selected', bestOf === 1);
  bestOf3Btn.classList.toggle('selected', bestOf === 3);
  bestOf5Btn.classList.toggle('selected', bestOf === 5);
  updateMatchScore();
}

function updateMatchScore() {
  if (bestOf === 1) {
    // Al mejor de 1 una sola partida decide: no hace falta mostrarlo
    matchScoreEl.classList.add('hidden');
    return;
  }
  matchScoreEl.classList.remove('hidden');
  matchScoreEl.textContent = `Partidas: ${gamesWon1} - ${gamesWon2} (al mejor de ${bestOf})`;
}

function setDifficulty(newDifficulty) {
  difficulty = newDifficulty;
  paddleHeight = DIFFICULTY[difficulty].paddleHeight;
  ballSpeed = DIFFICULTY[difficulty].ballSpeed;
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

  // La racha que se muestra depende de la dificultad elegida
  updateStatsDisplay();
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

function updateStatsDisplay() {
  statsP1El.textContent = mode === 'ai' ? `${humanName()}: ${stats.humanWins}` : `${player1Name}: ${stats.p1Wins}`;
  statsP2El.textContent = mode === 'ai' ? `IA: ${stats.iaWins}` : `${player2Name}: ${stats.p2Wins}`;
  statsBestEl.textContent = `🥇 Mejor: ${stats.bestResult}`;

  if (mode === 'ai') {
    statsStreakEl.textContent = `🔥 Racha (${DIFFICULTY_LABELS[difficulty]}): ${stats.streaks[difficulty]} · Mejor: ${stats.bestStreaks[difficulty]}`;
    statsStreakEl.classList.remove('hidden');
  } else {
    statsStreakEl.classList.add('hidden');
  }
}

function resetStats() {
  if (!confirm('¿Borrar el historial de victorias?')) return;
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
  updateStatsDisplay();
}

// Pantalla de estadísticas
function openStats() {
  // Si abrimos las estadísticas en mitad de una partida, la pausamos
  if (state === 'playing' && !paused) paused = true;
  renderStats();
  statsModal.classList.remove('hidden');
}

function closeStats() {
  statsModal.classList.add('hidden');
}

function openControls() {
  if (state === 'playing' && !paused) paused = true;
  controlsModal.classList.remove('hidden');
}

function closeControls() {
  controlsModal.classList.add('hidden');
}

function openPersonalize() {
  if (state === 'playing' && !paused) paused = true;
  personalizeModal.classList.remove('hidden');
}

function closePersonalize() {
  personalizeModal.classList.add('hidden');
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

// Cambia la calidad gráfica (tope de resolución del lienzo) y la guarda
function setGraphicsQuality(quality) {
  graphicsQuality = quality;
  try {
    localStorage.setItem('pong-quality', quality);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  qualityBajaBtn.classList.toggle('selected', quality === 'baja');
  qualityMediaBtn.classList.toggle('selected', quality === 'media');
  qualityAltaBtn.classList.toggle('selected', quality === 'alta');
  resizeCanvas(); // aplicamos la nueva resolución máxima al momento
}

// Cambia el modo de visualización (pixelado nítido o suave/bilineal) y lo guarda
function setRenderingMode(mode) {
  renderingMode = mode;
  try {
    localStorage.setItem('pong-rendering', mode);
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  canvas.classList.toggle('smooth', mode === 'suave');
  renderingPixeladoBtn.classList.toggle('selected', mode === 'pixelado');
  renderingSuaveBtn.classList.toggle('selected', mode === 'suave');
}

// Activa o desactiva el efecto CRT (scanlines, viñeta y curvatura) y lo guarda
function setCrtEffect(enabled) {
  crtEffect = enabled;
  try {
    localStorage.setItem('pong-crt', String(enabled));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  stage.classList.toggle('no-crt', !enabled);
  crtOnBtn.classList.toggle('selected', enabled);
  crtOffBtn.classList.toggle('selected', !enabled);
}

// Activa o desactiva la vibración del mando y lo guarda
function setGamepadVibration(enabled) {
  gamepadVibration = enabled;
  try {
    localStorage.setItem('pong-vibration', String(enabled));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
  vibrationOnBtn.classList.toggle('selected', enabled);
  vibrationOffBtn.classList.toggle('selected', !enabled);
}

// Asignación manual de mandos a palas
function startAssigning(paddle) {
  if (assigningPaddle === paddle) {
    cancelAssigning(); // volver a pulsar el botón cancela
    return;
  }
  assigningPaddle = paddle;
  clearTimeout(assignTimer);
  assignTimer = setTimeout(cancelAssigning, 6000); // se cancela sola a los 6 s
  updateGamepadAssignmentButtons();
}

function cancelAssigning() {
  assigningPaddle = null;
  clearTimeout(assignTimer);
  updateGamepadAssignmentButtons();
}

function assignGamepadToPaddle(paddle, index) {
  if (paddle === 'left') gamepadLeft = index;
  else gamepadRight = index;
  assigningPaddle = null;
  clearTimeout(assignTimer);
  saveGamepadAssignments();
  updateGamepadAssignmentButtons();
  showToast(`🕹️ Mando ${index + 1} asignado a la pala ${paddle === 'left' ? 'izquierda' : 'derecha'}`);
}

function updateGamepadAssignmentButtons() {
  assignLeftBtn.textContent = assigningPaddle === 'left'
    ? 'Izquierda: pulsa un botón…'
    : `Izquierda: Mando ${gamepadLeft + 1}`;
  assignRightBtn.textContent = assigningPaddle === 'right'
    ? 'Derecha: pulsa un botón…'
    : `Derecha: Mando ${gamepadRight + 1}`;
  assignLeftBtn.classList.toggle('listening', assigningPaddle === 'left');
  assignRightBtn.classList.toggle('listening', assigningPaddle === 'right');
}

function saveGamepadAssignments() {
  try {
    localStorage.setItem('pong-gamepads', JSON.stringify({ left: gamepadLeft, right: gamepadRight }));
  } catch (error) {
    // si el navegador bloquea localStorage, no guardamos
  }
}

// Enciende o apaga el icono 🎮 según haya un mando conectado
function updateGamepadIndicator() {
  let connected = false;
  if (navigator.getGamepads) {
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) { connected = true; break; }
    }
  }
  gamepadIndicatorEl.classList.toggle('on', connected);
  gamepadIndicatorEl.setAttribute('title', connected ? 'Mando conectado' : 'Sin mando conectado');
}

function renderStats() {
  const total = stats.humanWins + stats.iaWins + stats.p1Wins + stats.p2Wins;
  statsTotalEl.textContent = `🕹️ ${total} partidas jugadas`;
  statsWinLossEl.textContent = `✅ Victorias: ${stats.humanWins} · ❌ Derrotas: ${stats.iaWins}`;
  statsTimeEl.textContent = `⏱️ Tiempo de juego: ${formatPlayTime(stats.playTimeMs)}`;
  statsBestLineEl.textContent = `🥇 Mejor resultado: ${stats.bestResult}`;

  const iaGames = stats.humanWins + stats.iaWins;
  statsIaLineEl.textContent = `${humanName()} ${stats.humanWins} · IA ${stats.iaWins}`;
  statsIaPercentEl.textContent = `Victorias: ${percent(stats.humanWins, iaGames)}`;

  statsBestStreaksEl.textContent =
    `🔥 Mejor racha: Fácil ${stats.bestStreaks.facil} · Normal ${stats.bestStreaks.normal} · Difícil ${stats.bestStreaks.dificil}`;

  const pvpGames = stats.p1Wins + stats.p2Wins;
  statsPvpLineEl.textContent = `${player1Name} ${stats.p1Wins} · ${player2Name} ${stats.p2Wins}`;
  statsPvpPercentEl.textContent = `Victorias J1: ${percent(stats.p1Wins, pvpGames)}`;
}

// Porcentaje redondeado, o "—" si aún no hay partidas
function percent(wins, total) {
  if (total === 0) return '—';
  return `${Math.round((wins / total) * 100)}%`;
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
  gamesWon1 = 0;
  gamesWon2 = 0;
  paused = false;
  updateScoreboard();
  updateMatchScore();
  overlay.classList.add('hidden');
  state = 'playing';
  resetBall();
}

// Empieza la siguiente partida dentro de un enfrentamiento al mejor de N
// (conserva las partidas ya ganadas y reinicia solo los puntos)
function startNextGame() {
  ensureAudio();
  startBackgroundMusic();
  score1 = 0;
  score2 = 0;
  paused = false;
  updateScoreboard();
  updateMatchScore();
  overlay.classList.add('hidden');
  state = 'playing';
  resetBall();
}

function endGame() {
  state = 'gameover';
  stopBackgroundMusic();

  // ¿Quién ha ganado el enfrentamiento? (en modo IA el jugador humano puede estar en cualquier lado)
  const leftWonMatch = gamesWon1 >= gamesToWin();
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
  updateStatsDisplay();

  if (newRecord) {
    // Celebración especial: sonido y mensaje de récord
    playRecord();
    overlayTitle.textContent = '¡Nuevo récord! 🔥';
    overlaySubtitle.textContent = `Mejor racha en ${DIFFICULTY_LABELS[difficulty]}: ${stats.bestStreaks[difficulty]}`;
  } else {
    // Sonido de victoria o derrota (solo hay "derrota" jugando contra la IA)
    if (mode === 'ai' && !humanWon) {
      playLose();
    } else {
      playWin();
    }
    overlayTitle.textContent =
      mode === 'ai'
        ? (humanWon ? `¡Has ganado, ${humanName()}! 🎉` : '¡La IA gana! 🎉')
        : `¡${humanWon ? player1Name : player2Name} gana! 🎉`;
    overlaySubtitle.textContent =
      bestOf === 1
        ? `Resultado: ${score1} - ${score2}`
        : `Partidas: ${gamesWon1} - ${gamesWon2} (al mejor de ${bestOf})`;
  }
  restartBtn.textContent = 'Jugar de nuevo';
  showResultScreen();
  overlay.classList.remove('hidden');
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
}

// Lanza la pelota en una dirección aleatoria
function launchBall() {
  const directionX = Math.random() < 0.5 ? -1 : 1; // izquierda o derecha
  const directionY = Math.random() < 0.5 ? -1 : 1; // arriba o abajo
  ball.vx = directionX * ballSpeed;
  ball.vy = directionY * ballSpeed * (0.3 + Math.random() * 0.7);
}

// Soporte de mando (Gamepad API)

// Mueve las palas con los mandos conectados (solo durante la partida)
function updateGamepadPaddles() {
  if (!navigator.getGamepads) return;
  const gamepads = navigator.getGamepads();
  if (mode === 'ai') {
    // En modo IA, el mando asignado a TU lado controla tu pala
    const humanIndex = playerSide === 'right' ? gamepadRight : gamepadLeft;
    applyGamepad(gamepads[humanIndex], playerSide === 'right' ? paddle2 : paddle1);
  } else {
    applyGamepad(gamepads[gamepadLeft], paddle1);
    applyGamepad(gamepads[gamepadRight], paddle2);
  }
}

// Botones de menú del mando (se comprueban en cada fotograma)
function pollGamepadButtons() {
  if (!navigator.getGamepads) return;
  const gamepads = navigator.getGamepads();

  // Si estamos asignando un mando, cualquier botón de un mando lo asigna
  if (assigningPaddle) {
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (!gamepad) continue;
      for (let b = 0; b < gamepad.buttons.length; b++) {
        if (wasJustPressed(i, b)) {
          assignGamepadToPaddle(assigningPaddle, i);
          return;
        }
      }
    }
    return; // mientras asignamos, no procesamos Start/Select
  }

  // Start (9) = empezar/reiniciar, Select (8) = pausar (cualquier mando)
  for (let i = 0; i < gamepads.length; i++) {
    if (wasJustPressed(i, 9)) handleSpace();
    if (wasJustPressed(i, 8)) togglePause();
  }
}

function applyGamepad(gamepad, paddle) {
  if (!gamepad) return;

  // Joystick izquierdo, eje vertical (arriba = -1, abajo = +1)
  const stickY = gamepad.axes[1];
  if (stickY < -GAMEPAD_DEADZONE) {
    paddle.y -= PADDLE_SPEED;
  } else if (stickY > GAMEPAD_DEADZONE) {
    paddle.y += PADDLE_SPEED;
  }

  // Cruzeta: botones 12 (arriba) y 13 (abajo) en el mapeado estándar
  if (gamepad.buttons[12] && gamepad.buttons[12].pressed) {
    paddle.y -= PADDLE_SPEED;
  }
  if (gamepad.buttons[13] && gamepad.buttons[13].pressed) {
    paddle.y += PADDLE_SPEED;
  }
}

// Devuelve true solo en el fotograma en que se pulsa el botón (no mientras se mantiene)
function wasJustPressed(gamepadIndex, buttonIndex) {
  if (!navigator.getGamepads) return false;
  const gamepad = navigator.getGamepads()[gamepadIndex];
  if (!gamepad || !gamepad.buttons[buttonIndex]) return false;
  const pressed = gamepad.buttons[buttonIndex].pressed;
  const key = gamepadIndex + '-' + buttonIndex;
  const wasPressed = prevGamepadButtons[key] || false;
  prevGamepadButtons[key] = pressed;
  return pressed && !wasPressed;
}

// Hace vibrar un mando concreto (por índice) usando haptics
function vibrateGamepad(gamepadIndex, duration, strongMagnitude, weakMagnitude) {
  if (!gamepadVibration) return; // vibración desactivada por el usuario
  if (!navigator.getGamepads) return;
  const gamepad = navigator.getGamepads()[gamepadIndex];
  if (gamepad && gamepad.vibrationActuator && gamepad.vibrationActuator.playEffect) {
    gamepad.vibrationActuator
      .playEffect('dual-rumble', {
        duration: duration,
        strongMagnitude: strongMagnitude,
        weakMagnitude: weakMagnitude
      })
      .catch(() => {}); // algunos mandos no soportan este efecto
  }
}

// Patrón de vibración distinto por jugador para distinguirlos al marcar:
// izquierda = un pulso · derecha = dos pulsos rápidos.
function vibrateForPlayer(gamepadIndex, side, gameOver) {
  if (side === 'right') {
    const d = gameOver ? 240 : 70;  // duración de cada pulso
    const s = gameOver ? 1 : 0.5;   // intensidad fuerte
    const w = gameOver ? 0.5 : 0.3; // intensidad suave
    vibrateGamepad(gamepadIndex, d, s, w);
    setTimeout(() => vibrateGamepad(gamepadIndex, d, s, w), gameOver ? 260 : 90);
  } else {
    vibrateGamepad(gamepadIndex, gameOver ? 500 : 160, gameOver ? 1 : 0.6, gameOver ? 0.6 : 0.2);
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

  // Movimiento desde el mando (si hay alguno conectado)
  updateGamepadPaddles();

  // Movimiento de las palas según las teclas pulsadas
  if (mode === 'ai') {
    // Un jugador: controla una pala y la IA la otra
    const humanPaddle = playerSide === 'right' ? paddle2 : paddle1;
    const aiPaddle = playerSide === 'right' ? paddle1 : paddle2;

    if (keys['w']) humanPaddle.y -= PADDLE_SPEED;
    if (keys['s']) humanPaddle.y += PADDLE_SPEED;

    // La IA reacciona a la pelota con un retraso según la dificultad.
    // En difícil, además, predice la trayectoria en lugar de solo seguirla.
    aiReactionTimer--;
    if (aiReactionTimer <= 0) {
      const baseTarget =
        difficulty === 'dificil'
          ? predictBallY()
          : ball.y + BALL_SIZE / 2;
      // Pequeño error aleatorio para que no acierte siempre en el centro de la pala
      aiTargetY = clamp(baseTarget + (Math.random() * 2 - 1) * aiAimError, 0, HEIGHT);
      aiReactionTimer = randomReactionDelay();
    }

    const paddleCenter = aiPaddle.y + paddleHeight / 2;
    if (aiTargetY > paddleCenter + 4) {
      aiPaddle.y += aiSpeed;
    } else if (aiTargetY < paddleCenter - 4) {
      aiPaddle.y -= aiSpeed;
    }
  } else {
    if (keys['w']) paddle1.y -= PADDLE_SPEED;
    if (keys['s']) paddle1.y += PADDLE_SPEED;
    if (keys['arrowup']) paddle2.y -= PADDLE_SPEED;
    if (keys['arrowdown']) paddle2.y += PADDLE_SPEED;
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
  const speed = Math.hypot(ball.vx, ball.vy) * 1.05; // cada golpe, un 5% más rápida
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
  shakeHit(clamp(incomingSpeed / ballSpeed, 1, 3));
}

function pointScored(scoringSide) {
  updateScoreboard();
  const gameOver = score1 >= WINNING_SCORE || score2 >= WINNING_SCORE;
  shakeScreen(gameOver); // vibración más fuerte en el punto de la victoria

  // Solo vibra el mando del jugador que ha marcado el punto,
  // con un patrón distinto por lado (izquierda = 1 pulso, derecha = 2 pulsos).
  if (mode === 'ai') {
    // En modo IA, el mando asignado a TU lado controla a la persona
    if (scoringSide === playerSide) {
      const humanIndex = playerSide === 'right' ? gamepadRight : gamepadLeft;
      vibrateForPlayer(humanIndex, 'left', gameOver);
    }
  } else {
    // 2 jugadores: cada lado tiene su patrón
    if (scoringSide === 'left') vibrateForPlayer(gamepadLeft, 'left', gameOver);
    else vibrateForPlayer(gamepadRight, 'right', gameOver);
  }

  if (gameOver) {
    winGame();
  } else {
    playScore();
    resetBall();
  }
}

// Alguien ha llegado a WINNING_SCORE: suma una partida ganada y decide
// si el enfrentamiento terminó o si toca jugar la siguiente partida.
function winGame() {
  const leftWon = score1 >= WINNING_SCORE;
  if (leftWon) gamesWon1++; else gamesWon2++;
  updateMatchScore();

  // Mejor resultado: mayor diferencia de puntos en una sola partida
  const margin = Math.abs(score1 - score2);
  if (margin > stats.bestMargin) {
    stats.bestMargin = margin;
    stats.bestResult = `${Math.max(score1, score2)}-${Math.min(score1, score2)}`;
    saveStats();
    updateStatsDisplay();
  }

  if (gamesWon1 >= gamesToWin() || gamesWon2 >= gamesToWin()) {
    endGame(); // enfrentamiento terminado
  } else {
    // Partida ganada, pero el enfrentamiento continúa
    state = 'setover';
    stopBackgroundMusic();
    playWin();
    overlayTitle.textContent = `${sideLabel(leftWon ? 'left' : 'right')} gana esta partida`;
    overlaySubtitle.textContent = `Partidas: ${gamesWon1} - ${gamesWon2} (al mejor de ${bestOf})`;
    restartBtn.textContent = 'Siguiente partida';
    showResultScreen();
    overlay.classList.remove('hidden');
  }
}

// 8. Dibujado en pantalla
function draw() {
  // Escalamos el contexto al tamaño real del lienzo para que se vea nítido
  ctx.setTransform(renderScaleX, 0, 0, renderScaleY, 0, 0);

  // Fondo
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Línea central discontinua
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 16]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  // Palas
  ctx.fillStyle = paddleColor;
  ctx.fillRect(paddle1.x, paddle1.y, PADDLE_WIDTH, paddleHeight);
  ctx.fillRect(paddle2.x, paddle2.y, PADDLE_WIDTH, paddleHeight);

  // Estela de la pelota: un degradado suave que se estrecha y desvanece
  // (verde = lenta, rojo = rápida).
  const ballSpeedNow = Math.hypot(ball.vx, ball.vy);
  const speedT = clamp((ballSpeedNow - ballSpeed) / ballSpeed, 0, 1);
  const hue = Math.round(120 * (1 - speedT)); // 120 (verde) → 0 (rojo)

  // Dibujamos la estela como segmentos de línea con grosor y opacidad
  // decrecientes y extremos redondeados, para un fundido continuo y suave.
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < trail.length - 1; i++) {
    const progress = i / (trail.length - 1); // 0 = reciente, 1 = antiguo
    const alpha = (1 - progress) * 0.45;
    const lineWidth = BALL_SIZE * (1 - progress * 0.7);
    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(trail[i].x + BALL_SIZE / 2, trail[i].y + BALL_SIZE / 2);
    ctx.lineTo(trail[i + 1].x + BALL_SIZE / 2, trail[i + 1].y + BALL_SIZE / 2);
    ctx.stroke();
  }
  ctx.lineCap = 'butt'; // restauramos el valor por defecto

  // Pelota (posición redondeada para que se vea nítida a escala entera)
  const bx = Math.round(ball.x);
  const by = Math.round(ball.y);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx, by, BALL_SIZE, BALL_SIZE);

  // Cuenta atrás antes del saque
  if (countdown > 0 && state === 'playing' && !paused) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(countdown, WIDTH / 2, HEIGHT / 2);
  }

  // Pantalla de pausa
  if (paused && state === 'playing') {
    ctx.fillStyle = 'rgba(5, 5, 10, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSA', WIDTH / 2, HEIGHT / 2 - 10);
    ctx.font = '18px monospace';
    ctx.fillText('Pulsa P para continuar', WIDTH / 2, HEIGHT / 2 + 30);
    ctx.fillText('ESC para salir al menú', WIDTH / 2, HEIGHT / 2 + 56);
  }
}

// 9. Bucle principal: se repite unas 60 veces por segundo
let lastFrameTime = 0; // timestamp del fotograma anterior (para medir el tiempo de juego)

function loop(now) {
  // Sumamos el tiempo real que llevamos jugando (solo en plena partida, sin pausa)
  if (lastFrameTime > 0 && state === 'playing' && !paused) {
    stats.playTimeMs += now - lastFrameTime;
  }
  lastFrameTime = now;

  pollGamepadButtons();
  updateGamepadIndicator();
  update();
  draw();
  requestAnimationFrame(loop);
}

// 10. Arranque
restartBtn.addEventListener('click', handleSpace);
volumeBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVolumePanel();
});
musicVolumeSlider.addEventListener('input', handleVolumeChange);
effectsVolumeSlider.addEventListener('input', handleVolumeChange);
musicToggleBtn.addEventListener('click', () => setMusicEnabled(!musicEnabled));
// Cerrar el panel de volumen al hacer clic fuera de él
document.addEventListener('click', (event) => {
  if (volumePanel.classList.contains('hidden')) return;
  if (volumePanel.contains(event.target)) return;
  if (event.target === volumeBtn || volumeBtn.contains(event.target)) return;
  closeVolumePanel();
});
name1Input.addEventListener('input', updatePlayerNames);
name2Input.addEventListener('input', updatePlayerNames);
name1Input.addEventListener('change', () => { name1Input.value = player1Name; });
name2Input.addEventListener('change', () => { name2Input.value = player2Name; });
fullscreenBtn.addEventListener('click', toggleFullscreen);
fillExitBtn.addEventListener('click', toggleFullscreen);
menuBtn.addEventListener('click', quitToMenu);
rotateHintClose.addEventListener('click', () => rotateHint.classList.add('dismissed'));

// El botón ⛶ usa la Fullscreen API si está disponible; si no (p. ej. iPhone),
// rellena la pantalla por CSS.
const supportsFullscreen = Boolean(
  document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen
);

// Mantenemos el icono sincronizado si se entra/sale de pantalla completa
// (por ejemplo con ESC o la tecla F)
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
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
// En los eventos solo guardamos la última posición; el movimiento real se aplica
// una vez por fotograma en applyPointerPaddles(), para no hacer trabajo de más
// cuando llegan ráfagas de eventos pointermove.
canvas.addEventListener('pointerdown', (event) => {
  if (state !== 'playing' || paused) return;
  const side = getSideForPointer(event.clientX);
  activePointers[event.pointerId] = side;
  pointerPositions[event.pointerId] = event.clientY;
  if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
  event.preventDefault();
});

canvas.addEventListener('pointermove', (event) => {
  if (activePointers[event.pointerId] === undefined) return;
  pointerPositions[event.pointerId] = event.clientY;
});

canvas.addEventListener('pointerup', (event) => {
  delete activePointers[event.pointerId];
  delete pointerPositions[event.pointerId];
});

canvas.addEventListener('pointercancel', (event) => {
  delete activePointers[event.pointerId];
  delete pointerPositions[event.pointerId];
});

touchPauseBtn.addEventListener('click', () => togglePause());
touchMenuBtn.addEventListener('click', quitToMenu);

// Devuelve qué lado controla un toque según su posición y el modo de juego
function getSideForPointer(clientX) {
  if (mode === 'ai') {
    return playerSide; // un solo jugador: cualquier toque mueve tu pala
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
  const scaleY = HEIGHT / rect.height;

  for (const id of ids) {
    const clientY = pointerPositions[id];
    if (clientY === undefined) continue;
    const side = activePointers[id];
    const paddle = side === 'left' ? paddle1 : paddle2;
    paddle.y = clamp((clientY - rect.top) * scaleY - paddleHeight / 2, 0, HEIGHT - paddleHeight);
  }
}
resetStatsBtn.addEventListener('click', resetStats);
statsOpenBtn.addEventListener('click', openStats);
statsCloseBtn.addEventListener('click', closeStats);
statsModal.addEventListener('click', (event) => {
  if (event.target === statsModal) closeStats();
});
menuControlesBtn.addEventListener('click', openControls);
controlsCloseBtn.addEventListener('click', closeControls);
controlsModal.addEventListener('click', (event) => {
  if (event.target === controlsModal) closeControls();
});
menuEstadisticasBtn.addEventListener('click', openStats);
menuJugarBtn.addEventListener('click', showSetup);
menuPersonalizarBtn.addEventListener('click', openPersonalize);
menuVolverBtn.addEventListener('click', showMainMenu);
personalizeCloseBtn.addEventListener('click', closePersonalize);
personalizeModal.addEventListener('click', (event) => {
  if (event.target === personalizeModal) closePersonalize();
});
document.querySelectorAll('.color-swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => setPaddleColor(swatch.dataset.color));
});
qualityBajaBtn.addEventListener('click', () => setGraphicsQuality('baja'));
qualityMediaBtn.addEventListener('click', () => setGraphicsQuality('media'));
qualityAltaBtn.addEventListener('click', () => setGraphicsQuality('alta'));
vibrationOnBtn.addEventListener('click', () => setGamepadVibration(true));
vibrationOffBtn.addEventListener('click', () => setGamepadVibration(false));
renderingPixeladoBtn.addEventListener('click', () => setRenderingMode('pixelado'));
renderingSuaveBtn.addEventListener('click', () => setRenderingMode('suave'));
crtOnBtn.addEventListener('click', () => setCrtEffect(true));
crtOffBtn.addEventListener('click', () => setCrtEffect(false));
assignLeftBtn.addEventListener('click', () => startAssigning('left'));
assignRightBtn.addEventListener('click', () => startAssigning('right'));
themeClasicoBtn.addEventListener('click', () => setMusicTheme('clasico'));
themeEnergeticoBtn.addEventListener('click', () => setMusicTheme('energetico'));
themeTranquiloBtn.addEventListener('click', () => setMusicTheme('tranquilo'));

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
updateVolumeIcon();

// Recuperar la preferencia de música de fondo (encendida/apagada)
try {
  const savedMusicEnabled = localStorage.getItem('pong-music-enabled');
  if (savedMusicEnabled !== null) musicEnabled = savedMusicEnabled === 'true';
} catch (error) {
  // usamos la música encendida por defecto
}
updateMusicToggleBtn();

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
updateStatsDisplay();
updateScoreLabels();
updateGamepadIndicator();

// Recuperar el color de las palas guardado
try {
  const savedColor = localStorage.getItem('pong-color');
  if (savedColor) paddleColor = savedColor;
} catch (error) {
  // usamos el color por defecto
}
setPaddleColor(paddleColor); // sincroniza el botón seleccionado

// Recuperar la calidad gráfica guardada
try {
  const savedQuality = localStorage.getItem('pong-quality');
  if (savedQuality && QUALITY_MAX_SCALE[savedQuality]) graphicsQuality = savedQuality;
} catch (error) {
  // usamos la calidad por defecto
}
setGraphicsQuality(graphicsQuality); // sincroniza botones y aplica el tope

// Recuperar el modo de visualización guardado
try {
  const savedRendering = localStorage.getItem('pong-rendering');
  if (savedRendering === 'suave' || savedRendering === 'pixelado') renderingMode = savedRendering;
} catch (error) {
  // usamos el modo pixelado por defecto
}
setRenderingMode(renderingMode); // sincroniza botones y aplica la clase al lienzo

// Recuperar la preferencia del efecto CRT
try {
  const savedCrt = localStorage.getItem('pong-crt');
  if (savedCrt !== null) crtEffect = savedCrt === 'true';
} catch (error) {
  // usamos el efecto CRT por defecto (activado)
}
setCrtEffect(crtEffect); // sincroniza botones y aplica la clase

// Recuperar la preferencia de vibración del mando
try {
  const savedVibration = localStorage.getItem('pong-vibration');
  if (savedVibration !== null) gamepadVibration = savedVibration === 'true';
} catch (error) {
  // usamos la vibración por defecto (activada)
}
setGamepadVibration(gamepadVibration); // sincroniza botones

// Recuperar la asignación de mandos guardada
try {
  const savedGamepads = JSON.parse(localStorage.getItem('pong-gamepads'));
  if (savedGamepads && typeof savedGamepads.left === 'number') gamepadLeft = savedGamepads.left;
  if (savedGamepads && typeof savedGamepads.right === 'number') gamepadRight = savedGamepads.right;
} catch (error) {
  // usamos la asignación por defecto (mando 1 izquierda, mando 2 derecha)
}
updateGamepadAssignmentButtons();

showMainMenu();
updateScoreboard();
resizeCanvas();
requestAnimationFrame(loop);

// La pantalla de bienvenida se oculta al primer toque o clic.
// El temporizador queda como red de seguridad por si no se interactúa.
splashEl.addEventListener('pointerdown', hideSplash, { once: true });
setTimeout(hideSplash, 3000);

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

// Aviso temporal (toast) al conectar o desconectar un mando
let toastTimer = null;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 2500);
}

// Oculta la pantalla de bienvenida con un fundido suave
let splashHidden = false;
function hideSplash() {
  if (splashHidden) return; // evita ejecutar el fundido dos veces
  splashHidden = true;
  splashEl.classList.add('fade-out');
  setTimeout(() => splashEl.classList.add('hidden'), 500);
}

window.addEventListener('gamepadconnected', (event) => {
  showToast(`🎮 Mando ${event.gamepad.index + 1} conectado`);
  updateGamepadIndicator();
});

window.addEventListener('gamepaddisconnected', (event) => {
  showToast(`🎮 Mando ${event.gamepad.index + 1} desconectado`);
  updateGamepadIndicator();
});

// Registrar el service worker (solo funciona servido por HTTP/HTTPS, no con file://)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
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
    showToast('📲 ¡Instalando la app…!');
  }
});

// Si ya se ha instalado, ocultamos el botón
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installBtn.classList.add('hidden');
  showToast('📲 ¡App instalada!');
});
