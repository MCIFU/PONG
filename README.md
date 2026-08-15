# 🏓 PONG

Pong clásico hecho con **HTML, CSS y JavaScript puro** (sin frameworks ni dependencias). Jugable en el navegador, instalable como PWA y como app de escritorio para Windows.

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

## 🖥️ App de escritorio (Windows)

Con [Electron](https://www.electronjs.org/) se genera un instalador `.exe` que funciona sin navegador ni conexión:

```bash
npm install        # primera vez (descarga Electron)
npm run dist       # instalador: dist/Pong Setup 1.0.0.exe
npm run dist:portable  # portable: dist/Pong 1.0.0.exe (un .exe sin instalar)
```

Para probarlo sin instalar: `npm run desktop`.

### Actualizaciones automáticas

La app **instalada** (no la portable) se actualiza sola desde [GitHub Releases](https://github.com/mcifu/pong/releases), configurado en `package.json` → `build.publish`.

Una **GitHub Action** (`.github/workflows/build.yml`) compila el `.exe` y lo publica en Releases automáticamente al subir un tag:

```bash
npm version patch   # 1.0.0 → 1.0.1 (crea commit + tag v1.0.1)
git push
git push --tags     # dispara la acción: compila y publica el Release
```

Las **notas del Release** (changelog) se generan solas con los commits desde el tag anterior. También puedes lanzarla a mano desde la pestaña **Actions** → *Compilar y publicar .exe*. Los jugadores recibirán la actualización al abrir el juego (la descarga en segundo plano y se instala al cerrar). Si tu repositorio no es `mcifu/pong`, cambia `owner` y `repo` en `package.json`.

### Firma de código (evita el aviso de SmartScreen)

Para que Windows no muestre *"Windows protegió tu PC"* al descargar el `.exe`, fírmalo con un certificado de código (de pago: DigiCert, Sectigo, SSL.com…). Añade dos secretos al repositorio (*Settings → Secrets and variables → Actions*):

- `WINDOWS_CERTIFICATE_BASE64` — el certificado `.pfx` en base64:
  ```bash
  base64 -w0 cert.pfx
  ```
- `WINDOWS_CERTIFICATE_PASSWORD` — su contraseña.

La acción firma el `.exe` automáticamente cuando encuentra estos secretos; sin ellos, compila sin firmar.

> **Ojo**: un certificado normal (OV) aún necesita ganar reputación en SmartScreen. Para que deje de avisar **desde la primera descarga**, usa un certificado **EV** o [Azure Trusted Signing](https://learn.microsoft.com/azure/trusted-signing/).

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
├── electron/               App de escritorio (Electron)
├── build/                  Iconos .ico (cuadrado y redondeado Win11)
└── tools/                  Servidor local y generadores de iconos
```

## 🧑‍💻 Desarrollo

- `npm start` — servidor local en `http://localhost:8000`.
- `npm run desktop` — abre el juego como app de escritorio (Electron).
- `npm run dist` — genera el instalador `.exe` de Windows en `dist/`.
- `npm run dist:portable` — genera la versión portable (un `.exe` sin instalar).
- `npm run icons` — regenera los iconos PNG y el `.ico` de Windows.

## 📄 Licencia

- **Código**: sin licencia asignada por defecto.
- **Fuente *Press Start 2P***: [SIL Open Font License 1.1](https://scripts.sil.org/OFL).
