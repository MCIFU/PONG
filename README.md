# 🏓 PONG

Pong clásico hecho con **HTML, CSS y JavaScript puro** (sin frameworks ni dependencias). Instalable como PWA y jugable sin conexión.

> 🎮 1 jugador contra la IA o 2 jugadores, con sonido y música generados por código, estadísticas persistentes y controles táctiles.

## ✨ Características

- **Modos**: 1 jugador contra la IA (elige lado) o 2 jugadores en el mismo teclado.
- **Dificultad de la IA**: Fácil, Normal y Difícil (cambia tamaño de pala, velocidad, reacción y error).
- **Partidas**: al mejor de 1, 3 o 5 puntos, cuenta atrás 3-2-1 y aceleración de la pelota en cada golpe.
- **Sonido**: efectos y música (3 temas) generados con la Web Audio API, con volúmenes independientes.
- **Personalización**: color de palas, paleta de color, tema claro/oscuro/sistema y nombres de jugadores.
- **Estadísticas** guardadas en el dispositivo: partidas, victorias, derrotas, tiempo de juego y rachas.
- **Plataforma**: PWA instalable, modo sin conexión, splash de carga y efecto CRT integrado.

## 🎮 Controles

| Acción | Teclado | Táctil |
|---|---|---|
| Pala izquierda | `W` / `S` | Arrastrar por la pantalla |
| Pala derecha | `↑` / `↓` | Arrastrar por la pantalla |
| Empezar / reiniciar | `ESPACIO` | Botón *Empezar* |
| Pausar / reanudar | `P` | Botón de pausa |
| Volver al menú | `ESC` | Botón de volver al menú |
| Silenciar / restaurar | `M` | Botón de sonido |

## 🚀 Cómo ejecutarlo

Puedes abrir `index.html` directamente en el navegador. Para probar la PWA usa un servidor local:

```bash
npm start
```

Abre `http://localhost:8000`. (Otro puerto: `PORT=8080 npm start`.)

## 🌐 Juego en línea

[https://mcifu-pong.netlify.app](https://mcifu-pong.netlify.app)

## 🛠️ Tecnologías

HTML5 + CSS3 + Canvas 2D + JavaScript vanilla, con Web Audio API (sonido), Service Worker (offline) y localStorage (ajustes y estadísticas).

## 📁 Estructura

```
.
├── index.html              Página principal
├── manifest.webmanifest    Configuración de la PWA
├── sw.js                   Service worker (caché offline)
├── css/style.css           Estilos
├── js/script.js            Lógica del juego
├── assets/                 Iconos y fuente arcade
└── tools/                  Servidor local y generador de iconos
```

## 🧑‍💻 Desarrollo

- `npm start` — servidor local en `http://localhost:8000`.
- `npm run icons` — regenera los iconos PNG en `assets/icons/`.

## 📄 Licencia

- **Código**: sin licencia asignada por defecto.
- **Fuente *Press Start 2P***: [SIL Open Font License 1.1](https://scripts.sil.org/OFL).
