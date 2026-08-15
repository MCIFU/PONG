# 🏓 PONG

A classic Pong built with **pure HTML, CSS and JavaScript** (no frameworks, no dependencies). Installable as a PWA and playable offline.

> 🎮 1 player vs AI or 2 players, with code-generated sound and music, persistent stats and touch controls.

## ✨ Features

- **Modes**: 1 player vs AI (choose your side) or 2 players on the same keyboard.
- **AI difficulty**: Easy, Normal and Hard (changes paddle size, speed, reaction and error).
- **Matches**: first to 1, 3 or 5 points, 3-2-1 countdown and ball speed-up on every hit.
- **Sound**: effects and music (3 themes) generated with the Web Audio API, with independent volumes.
- **Customization**: paddle color, color palette, light/dark/system theme and player names.
- **Stats** saved on the device: games, wins, losses, play time and streaks.
- **Platform**: installable PWA, offline mode, loading splash and built-in CRT effect.

## 🎮 Controls

| Action | Keyboard | Touch |
|---|---|---|
| Left paddle | `W` / `S` | Drag anywhere on screen |
| Right paddle | `↑` / `↓` | Drag anywhere on screen |
| Start / restart | `SPACE` | *Start* button |
| Pause / resume | `P` | Pause button |
| Back to menu | `ESC` | Back-to-menu button |
| Mute / unmute | `M` | Sound button |

## 🚀 How to run

You can open `index.html` directly in a browser. To test the PWA, use a local server:

```bash
npm start
```

Open `http://localhost:8000`. (Another port: `PORT=8080 npm start`.)

## 🌐 Play online

[https://mcifu-pong.netlify.app](https://mcifu-pong.netlify.app)

## 🛠️ Technologies

HTML5 + CSS3 + Canvas 2D + vanilla JavaScript, with Web Audio API (sound), Service Worker (offline) and localStorage (settings and stats).

## 📁 Structure

```
.
├── index.html              Main page
├── manifest.webmanifest    PWA configuration
├── sw.js                   Service worker (offline cache)
├── css/style.css           Styles
├── js/script.js            Game logic
├── assets/                 Icons and arcade font
└── tools/                  Local server and icon generator
```

## 🧑‍💻 Development

- `npm start` — local server at `http://localhost:8000`.
- `npm run icons` — regenerates the PNG icons in `assets/icons/`.

## 📄 License

- **Code**: no license assigned by default.
- **Font *Press Start 2P***: [SIL Open Font License 1.1](https://scripts.sil.org/OFL).
