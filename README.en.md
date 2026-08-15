# 🏓 PONG

A classic Pong built with **pure HTML, CSS and JavaScript** (no frameworks, no dependencies). Playable in the browser, installable as a PWA and as a Windows desktop app.

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

## 🖥️ Desktop app (Windows)

[Electron](https://www.electronjs.org/) builds a `.exe` installer that runs without a browser or connection:

```bash
npm install        # first time (downloads Electron)
npm run dist       # installer: dist/Pong Setup 1.0.0.exe
npm run dist:portable  # portable: dist/Pong 1.0.0.exe (single .exe, no install)
```

To try it without installing: `npm run desktop`.

### Automatic updates

The **installed** app (not the portable one) updates itself from [GitHub Releases](https://github.com/mcifu/pong/releases), configured in `package.json` → `build.publish`.

A **GitHub Action** (`.github/workflows/build.yml`) builds the `.exe` and publishes it to Releases automatically when you push a tag:

```bash
npm version patch   # 1.0.0 → 1.0.1 (creates commit + tag v1.0.1)
git push
git push --tags     # triggers the action: builds and publishes the Release
```

The **release notes** (changelog) are generated automatically from the commits since the previous tag. You can also run it manually from the **Actions** tab → *Compilar y publicar .exe*. Players get the update when they open the game (it downloads in the background and installs on quit). If your repo is not `mcifu/pong`, change `owner` and `repo` in `package.json`.

### Code signing (avoids the SmartScreen warning)

To stop Windows showing *"Windows protected your PC"* when downloading the `.exe`, sign it with a code signing certificate (paid: DigiCert, Sectigo, SSL.com…). Add two secrets to the repo (*Settings → Secrets and variables → Actions*):

- `WINDOWS_CERTIFICATE_BASE64` — the `.pfx` certificate in base64:
  ```bash
  base64 -w0 cert.pfx
  ```
- `WINDOWS_CERTIFICATE_PASSWORD` — its password.

The action signs the `.exe` automatically when it finds these secrets; without them, it builds unsigned.

> **Note**: a standard (OV) certificate still needs to build SmartScreen reputation. To avoid the warning **from the first download**, use an **EV** certificate or [Azure Trusted Signing](https://learn.microsoft.com/azure/trusted-signing/).

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
├── electron/               Desktop app (Electron)
├── build/                  .ico icons (square and Win11-rounded)
└── tools/                  Local server and icon generators
```

## 🧑‍💻 Development

- `npm start` — local server at `http://localhost:8000`.
- `npm run desktop` — opens the game as a desktop app (Electron).
- `npm run dist` — builds the Windows `.exe` installer in `dist/`.
- `npm run dist:portable` — builds the portable version (a single install-free `.exe`).
- `npm run icons` — regenerates the PNG icons and the Windows `.ico`.

## 📄 License

- **Code**: no license assigned by default.
- **Font *Press Start 2P***: [SIL Open Font License 1.1](https://scripts.sil.org/OFL).
