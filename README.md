# RL Home & Reformas

Primera versión de un sitio de afiliados para productos de reformas, hogar, bricolaje y jardín.

## Requisitos

- Node.js 20+
- Git
- Una cuenta de GitHub

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir la URL que muestre Vite, normalmente:

http://localhost:5173

## Cambiar los enlaces de Awin

Abre:

`src/main.jsx`

Busca:

`affiliateUrl`

y reemplaza cada URL de ejemplo por el enlace de tracking que te entregue Awin.

Importante: conserva `rel="nofollow sponsored noopener noreferrer"` en los enlaces de afiliado.

## Cambiar productos

Los productos de demostración están al comienzo de `src/main.jsx`, dentro del array `products`.

Puedes modificar:

- name
- category
- store
- price
- oldPrice
- discount
- image
- affiliateUrl

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo:

`rl-home-reformas`

2. Sube todo el contenido de esta carpeta.

3. Instala dependencias:

```bash
npm install
```

4. Comprueba que `vite.config.js` tenga:

```js
base: "/rl-home-reformas/"
```

Si el repositorio tiene otro nombre, cambia esa ruta.

5. Genera la versión de producción:

```bash
npm run build
```

6. Para publicar usando el paquete `gh-pages`:

```bash
npm run deploy
```

7. En GitHub entra en:

Settings → Pages

y comprueba que GitHub Pages esté configurado.

## Dominio personalizado

Si posteriormente utilizas un dominio como:

`reformaoferta.es`

cambia en `vite.config.js`:

```js
base: "/"
```

Después configura el dominio personalizado en GitHub Pages y sus registros DNS.

## Nota legal de afiliación

Añade una página de aviso de afiliados, privacidad, cookies y condiciones de uso antes de hacer campañas comerciales. Las condiciones exactas dependen de los países y programas de afiliación que utilices.

## Imágenes

Las imágenes de demostración utilizan URLs externas de Unsplash. Para producción conviene utilizar imágenes para las que tengas derechos de uso o las proporcionadas por los programas de afiliación cuando sus condiciones lo permitan.
