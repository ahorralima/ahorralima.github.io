# Ahorra Lima — Frontend instalable (PWA)

Este es el mismo prototipo que ya viste como artefacto, pero preparado para
vivir en su propio sitio web real, con lo necesario para que alguien lo
instale en su iPhone o Android **hoy mismo**, sin pasar por App Store ni
Google Play.

## Por qué no basta con el link de Claude

El link `claude.ai/code/artifact/...` es genial para previsualizar y
compartir, pero técnicamente vive **dentro de un iframe** de otro dominio
(`*.claudeusercontent.com`) — lo comprobé revisando las cabeceras reales que
devuelve. Un manifest de PWA y "Agregar a pantalla de inicio" necesitan ser
la página de nivel superior, no un iframe, así que ese link nunca se va a
poder "instalar" como app de verdad. Por eso este proyecto es un sitio
aparte.

## Qué le agregué al HTML original

- `manifest.json` — nombre, ícono, color de marca, `display: standalone`
  (para que abra sin la barra de direcciones de Safari/Chrome, como una app).
- `sw.js` — service worker simple: cachea la app para que abra al instante y
  seguir funcionando sin internet una vez instalada.
- Íconos reales (`icons/`) generados en la misma paleta de la app (verde
  azulado `#0B5D63`, marca "AL"), en los tamaños que pide iOS y Android.
- Meta tags de `apple-mobile-web-app-*` para que en iPhone abra a pantalla
  completa en vez de mostrar Safari.

Nota honesta: no pude probar el service worker dentro del navegador de este
entorno (el panel de pruebas bloquea el registro de service workers para
cualquier script, hasta uno de una sola línea — lo confirmé). El archivo en
sí es válido y se sirve correctamente; lo que falta es que tú lo pruebes en
tu teléfono real una vez publicado, que es el chequeo que de verdad importa.

## 1. Publicarlo en internet (gratis, ~5 minutos)

La forma más simple, usando la misma cuenta de GitHub que ya vas a usar para
el backend:

```bash
cd ahorra-lima-frontend
git init
git add .
git commit -m "Ahorra Lima — primera versión instalable"
```

Luego en GitHub:
1. Crea un repositorio nuevo (puede ser público — necesitas que sea público
   para GitHub Pages gratis, o privado si tienes plan pago).
2. Conéctalo y súbelo:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/ahorra-lima-app.git
   git branch -M main
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root)**.
4. Espera 1-2 minutos. Tu app queda en:
   `https://TU-USUARIO.github.io/ahorra-lima-app/`

## 2. Instalarla en un iPhone

1. Abre esa URL en **Safari** (tiene que ser Safari, no Chrome — en iOS solo
   Safari puede instalar a la pantalla de inicio).
2. Toca el botón de compartir (el cuadrado con la flecha hacia arriba).
3. **Añadir a pantalla de inicio**.
4. Listo — queda un ícono como cualquier otra app, abre a pantalla completa.

## 3. Instalarla en Android

1. Abre la URL en **Chrome**.
2. Chrome debería mostrar solo un banner "Instalar app" abajo — si no
   aparece, toca el menú (⋮) → **Instalar aplicación** / **Añadir a pantalla
   de inicio**.
3. Mismo resultado: ícono real, abre sin la barra del navegador.

Esto **ya es "descargar la app"** para casi cualquier efecto práctico:
ícono en el teléfono, pantalla completa, funciona offline. Sin revisión de
Apple/Google, sin costo, sin esperar.

## 4. Si más adelante quieres estar en App Store / Google Play de verdad

Revisé tu Mac y hoy no tienes instalado nada de lo que se necesita para ese
camino:

| Herramienta | Estado en tu Mac | Para qué |
|---|---|---|
| Xcode completo | ❌ Solo Command Line Tools | Compilar y subir la app de iOS |
| Android Studio | ❌ No instalado | Compilar la app de Android |
| Node.js | ❌ No instalado | Correr Capacitor (el empaquetador) |
| Homebrew | ❌ No instalado | Instalar Node fácilmente |

Ninguno de estos te lo puedo instalar yo solo — Xcode se instala desde la
Mac App Store con tu Apple ID (son ~10 GB), y activar el command-line
tools de Xcode necesita tu contraseña:
```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Cuando quieras dar ese paso, dime y te armo el proyecto Capacitor completo
sobre este mismo `index.html` y te guío por cada instalación — pero es
buena idea validar primero con la versión instalable de hoy que la gente
realmente la usa, antes de invertir en la revisión de las tiendas
(recuerda: Apple cobra US$99/año, Google US$25 una vez, y Apple revisa
cada versión).

## 5. Conectar con precios reales

Este `index.html` sigue usando los datos de ejemplo generados en el
navegador (los 82 productos de la demo). El paso siguiente, cuando quieras,
es que la app lea de la base de datos Supabase que llena
`ahorra-lima-backend` en vez de generar precios falsos localmente.
