# 🏓 PONG

**Pong clásico en HTML, CSS y JavaScript puro.** Sin frameworks, sin librerías, sin dependencias. Instalable como PWA y jugable sin conexión desde el móvil.

> 🎮 Juega contra otra persona o contra una IA con tres niveles de dificultad, con sonido y música generados por código, estadísticas persistentes y soporte táctil completo.

---

## ✨ Características

**Modos de juego**
- 🕹️ 1 jugador contra la IA, eligiendo **lado** (izquierda o derecha).
- 👥 2 jugadores en el mismo teclado.

**Dificultad de la IA** (Fácil / Normal / Difícil)
- Cada nivel cambia el **tamaño de la pala** y la torpeza de la IA: tiempo de reacción, error de puntería y regularidad.
- En Difícil, la IA **predice la trayectoria** de la pelota.

**Partidas**
- Puntos para ganar: **1, 3 o 5**.
- Cuenta atrás **3-2-1** antes de cada saque e indicador de quién saca.
- **Aceleración por golpe**: la pelota gana velocidad con cada devolución — los rallies se vuelven cada vez más intensos.
- Pausa (`P`), reinicio (`ESPACIO`) y auto-pausa al cambiar de pestaña.

**Sonido y música**
- Efectos generados con la **Web Audio API** (rebotes, puntos, victorias, clics de interfaz).
- Música de fondo en bucle con **3 temas** (Clásico, Energético, Tranquilo) y vista previa en el menú.
- Volúmenes independientes para música y efectos, y silencio rápido con `M`.

**Personalización**
- Color de las palas (5 colores o el del tema).
- Paleta de color del juego (Verde, Azul, Ámbar, Rosa).
- Tema claro / oscuro / sistema (sigue al sistema operativo en vivo).
- Nombres personalizados de jugadores.

**Estadísticas** (guardadas en el dispositivo)
- Partidas jugadas, victorias y derrotas contra la IA.
- Tiempo total de juego.
- Mejor resultado (mayor diferencia de puntos).
- Mejor racha de victorias por dificultad.

**Plataforma**
- **PWA instalable** con icono propio y **modo sin conexión** (service worker).
- Pantalla de carga (splash) con barra de progreso real de los assets.
- **Optimizado para móvil**: tablero ajustado a la altura en horizontal, controles por arrastre, botones táctiles, aviso de rotación y respeto del notch (iOS).
- Efecto CRT (scanlines) integrado en el estilo visual.

---

## 🎮 Controles

| Acción | Teclado | Táctil |
|---|---|---|
| Mover pala izquierda | `W` / `S` | Arrastrar por el tablero |
| Mover pala derecha | `↑` / `↓` | — |
| Empezar / reiniciar partida | `ESPACIO` | Botón *Empezar* |
| Pausar / reanudar | `P` | Botón de pausa |
| Volver al menú | `ESC` | Botón de volver al menú |
| Silenciar / restaurar sonido | `M` | — |

---

## 🚀 Cómo ejecutarlo

El juego es HTML/CSS/JS puro: puedes abrir `index.html` directamente en el navegador. Para probar la PWA y el service worker (no funcionan con `file://`), usa un servidor local:

**Con Node.js (recomendado, sin `npm install`):**

```bash
npm start
```

Abre `http://localhost:8000`. (Otro puerto: `PORT=8080 npm start`.)

**Alternativa con Python:**

```bash
python -m http.server 8000
```

---

## 🌐 Demo en línea

> Sustituye por la URL de tu sitio publicado (Netlify, GitHub Pages…):

```
https://tu-proyecto.netlify.app
```

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 + CSS3 | Interfaz, estilos, tema claro/oscuro, efecto CRT |
| Canvas 2D | Renderizado del juego (escala entera, pixel art nítido) |
| JavaScript (vanilla) | Lógica, bucle de juego, IA, estados |
| Web Audio API | Sonidos y música generados por código (sin archivos de audio) |
| Service Worker | Caché offline y estrategias de actualización |
| localStorage | Estadísticas, ajustes y preferencias persistentes |

**Cero dependencias** — solo es necesario Node.js (versión ≥ 14) para el servidor de desarrollo y el generador de iconos.

---

## 📁 Estructura del proyecto

```
.
├── index.html              Página principal (entrada de la PWA)
├── manifest.webmanifest    Configuración de la PWA
├── sw.js                   Service worker (caché offline)
├── package.json            Scripts npm
├── README.md
├── css/
│   └── style.css           Todos los estilos
├── js/
│   └── script.js           Toda la lógica del juego
├── assets/
│   ├── icons/              Iconos PNG (favicon, PWA, iOS, tiendas)
│   └── fonts/              Fuente arcade local (Press Start 2P)
└── tools/
    ├── generate-icons.js   Generador de iconos (sin dependencias)
    └── server.js           Servidor local estático (npm start)
```

---

## 🧑‍💻 Desarrollo

| Script | Comando | Descripción |
|---|---|---|
| Servidor local | `npm start` | Sirve el juego en `http://localhost:8000` |
| Regenerar iconos | `npm run icons` | Genera todos los PNG en `assets/icons/` |

Los iconos se crean con `tools/generate-icons.js`, un generador **sin dependencias** que dibuja el "mini Pong" (palas, pelota con estela y línea central) píxel a píxel y lo exporta en los tamaños que usa cada plataforma: favicon, PWA/Android, iOS (con esquinas redondeadas) y tiendas de apps (1024×1024, sin transparencia).

---

## 📦 Publicación

Al ser un sitio estático, se publica en cualquier hosting gratuito:

**Netlify (arrastrar y soltar):**
1. Entra en [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta del proyecto (la que contiene `index.html`).
3. Para actualizaciones, entra en tu sitio → **Deploys** → arrastra la carpeta de nuevo (conserva la URL).

**GitHub Pages:**
1. Sube el proyecto a un repositorio de GitHub.
2. En *Settings → Pages*, elige la rama y la raíz (`/`) como origen.

> El sitio necesita **HTTPS** para que la PWA (service worker e instalación) funcione; Netlify y GitHub Pages lo proporcionan automáticamente.

---

## 📄 Licencia

- **Código fuente**: sin licencia asignada por defecto.
- **Fuente *Press Start 2P***: licencia [SIL Open Font License 1.1](https://scripts.sil.org/OFL) (ver `assets/fonts/press-start-2p-OFL.txt`).
