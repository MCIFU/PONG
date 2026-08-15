# Pong

Juego de Pong clásico en HTML, CSS y JavaScript puro. Sin frameworks ni
dependencias externas. Instalable como PWA y jugable sin conexión.

## Estructura del proyecto

```
pong/
├── index.html              Página principal (y punto de entrada de la PWA)
├── manifest.webmanifest    Configuración de la PWA (nombre, iconos, display)
├── sw.js                   Service worker (caché offline)
├── package.json            Scripts npm (start, icons)
├── README.md               Este documento
├── css/
│   └── style.css           Todos los estilos
├── js/
│   └── script.js           Toda la lógica del juego
├── assets/
│   ├── icons/              Iconos PNG (favicon, PWA, iOS, tiendas)
│   └── fonts/              Fuente arcade local (Press Start 2P)
└── tools/
    ├── generate-icons.js   Genera los iconos PNG sin dependencias
    └── server.js           Servidor local estático (npm start)
```

## Ejecutar el juego

Al ser HTML/CSS/JS puro, puedes abrir `index.html` directamente en el navegador.
Para probar la PWA y el service worker (que no funcionan con `file://`), sirve
la carpeta con un servidor local.

**Con Node.js (recomendado, sin dependencias):**

```bash
cd pong
npm start
```

Y abre `http://localhost:8000` en el navegador. (Para otro puerto:
`PORT=8080 npm start`.)

**Alternativa con Python:**

```bash
cd pong
python -m http.server 8000
```

El servidor de Node (`tools/server.js`) no necesita `npm install`: usa solo
los módulos incluidos en Node.

## Iconos

Todos los iconos se generan con un único script sin dependencias
(`tools/generate-icons.js`). Dibuja un "mini Pong" (palas, pelota verde con
estela y línea central) y lo exporta a `assets/icons/` en los distintos
tamaños y variantes que necesita cada plataforma.

### Regenerarlos

```bash
cd pong
node tools/generate-icons.js
```

Esto sobrescribe los PNG existentes en `assets/icons/`. Solo hace falta
Node.js (cualquier versión moderna); no se instala nada.

### Qué archivo usa cada plataforma

| Archivo | Tamaño | Dónde se usa |
|---|---|---|
| `icon-32.png` | 32×32 | Favicon de la pestaña (ligero, primera petición) |
| `icon-96.png` | 96×96 | Icono del splash de carga |
| `icon-180.png` | 180×180 | Respaldo/`apple-touch-icon` clásico |
| `icon-192.png` | 192×192 | Favicon grande y PWA (`manifest.webmanifest`) |
| `icon-512.png` | 512×512 | PWA / Android (`manifest.webmanifest`) |
| `icon-1024.png` | 1024×1024 | App Store de Apple (cuadrado, **sin** transparencia) |
| `icon-152-ios.png` | 152×152 | iOS: iPad e iPad mini |
| `icon-167-ios.png` | 167×167 | iOS: iPad Pro |
| `icon-180-ios.png` | 180×180 | iOS: iPhone |
| `icon-512-ios.png` | 512×512 | Tiendas de apps / respaldo iOS grande |

### Reglas de cada grupo

- **Cuadrados** (`icon-32` … `icon-1024`): fondo opaco, sin esquinas
  redondeadas. Son los que usan el navegador, Android y la App Store.
  La App Store **rechaza** iconos con transparencia o bordes redondeados, por
  eso el de 1024 es cuadrado y opaco.

- **Redondeados iOS** (`icon-*-ios`): mismas imágenes pero con las esquinas
  recortadas en transparencia, para los `apple-touch-icon`. iOS aplica su
  propio redondeo, así que esta variante es opcional; se mantiene por
  coherencia visual si alguien descarga el PNG directamente.

### Si añades un icono nuevo

1. Añade su tamaño a la lista `icons` (cuadrados) o al bucle
   `for (const size of [...])` (redondeados) de `tools/generate-icons.js`.
2. Regenera con `node tools/generate-icons.js`.
3. Si la **web** lo va a cargar, añádelo también a:
   - `sw.js` → lista `ASSETS` (para la caché offline).
   - `js/script.js` → `PRELOAD_ASSETS` (para que la barra del splash lo
     cuente).

Los iconos que solo usa una tienda externa (como `icon-1024.png`) **no** deben
añadirse a la precaché: la web no los carga y solo gastarían ancho de banda y
espacio de caché.
