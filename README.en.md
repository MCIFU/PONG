# PONG

A classic Pong built with plain HTML, CSS and JavaScript — no frameworks, no dependencies. It runs in the browser, and can also be installed as an app on your phone or as a Windows program.

Play it here: **[https://mcifu-pong.netlify.app](https://mcifu-pong.netlify.app)**

![Game screenshot](assets/screenshot.png)

## What's included

- **Two game modes**: 1 player vs the AI (choose your side) or 2 players on the same screen.
- **Three AI difficulties**: Easy, Normal and Hard.
- **Matches** to 1, 3 or 5 points, with a 3-2-1 countdown.
- **Sound and music** generated with code (no audio files), with 3 music themes.
- **Customization**: paddle colors, light/dark theme and player names.
- **Stats** saved on your device: games played, wins, losses and play time.
- **Installable PWA**: works offline, with a loading screen and arcade look.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Left paddle | `W` / `S` | Drag your finger |
| Right paddle | `↑` / `↓` | Drag your finger |
| Start / restart | `SPACE` | Button |
| Pause / resume | `P` | Button |
| Back to menu | `ESC` | Button |
| Mute / unmute | `M` | Button |

## How to run

Open `index.html` directly in your browser. To test it as a PWA (install, offline), use the local server:

```bash
npm start
```

Then open `http://localhost:8000`.

## Publishing

### Google Play (Android)

Published by wrapping the PWA with [PWABuilder](https://www.pwabuilder.com):

1. Generate the package in PWABuilder and download the zip.
2. **Save the keystore** (signing key) from the zip: you'll need it to update the app later.
3. Upload the `.aab` file in [Play Console](https://play.google.com/console) and fill in the listing (texts in `PLAY-STORE.en.md`).
4. New accounts need a closed test with 12 testers for 14 days before going public.

- **Privacy policy**: https://mcifu-pong.netlify.app/privacy.en.html

### iOS (iPhone)

- **No Mac needed**: open `https://mcifu-pong.netlify.app` in Safari → *Share* → *Add to Home Screen*. It installs full-screen and works offline.
- **App Store**: generate the iOS package in PWABuilder and build it with **Xcode** on a Mac (requires an Apple Developer account, $99/year).

### Windows (desktop)

[Electron](https://www.electronjs.org/) builds a `.exe` installer:

```bash
npm install
npm run dist            # installer in dist/
npm run dist:portable   # portable version (single .exe, no install)
```

The installed app updates itself from GitHub Releases when a new version is published.

## Technologies

HTML5, CSS3, Canvas 2D and vanilla JavaScript. Web Audio API for sound, a Service Worker for offline mode and localStorage to save settings and stats.

## Structure

```
├── index.html              Main page
├── manifest.webmanifest    PWA configuration
├── sw.js                   Service worker (offline cache)
├── css/style.css           Styles
├── js/script.js            Game logic
├── assets/                 Icons and arcade font
├── electron/               Desktop app
├── build/                  Windows .ico icons
└── tools/                  Local server and icon generators
```

## License

- **Code**: no license assigned.
- **Font *Press Start 2P***: [SIL Open Font License 1.1](https://scripts.sil.org/OFL).
