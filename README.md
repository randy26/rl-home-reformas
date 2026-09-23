# RL Home & Reformas — versión monetización 24/7

Esta versión añade:
- Asesor de reforma y calculadora orientativa que funciona en el navegador 24/7.
- Lista de compra persistente con `localStorage`.
- Favoritos persistentes.
- Botones de salida hacia enlaces de afiliación.
- Captación de leads para conectar con email/CRM.
- Botones de compartir por WhatsApp/Facebook y Web Share.
- SEO básico y datos estructurados.
- Bloques de transparencia de afiliación.

## IMPORTANTE antes de publicar
1. En `src/products.js`, reemplaza todos los `TU_ENLACE_AWIN` por URLs reales creadas en Awin.
2. Cambia `CONTACT_EMAIL` en `src/main.jsx`.
3. Cambia `WHATSAPP` por tu número real.
4. Completa aviso legal, privacidad y cookies según las herramientas que realmente uses.
5. No publiques precios/stock inventados: usa datos actuales de la tienda.
6. GitHub Pages es hosting estático. La función de “asesor” incluida es una calculadora/recomendador local; **no expone una API key de IA**. Para IA generativa real (OpenAI/Gemini) hace falta un backend/serverless que mantenga la clave privada.
7. Una compra afiliada se paga en la tienda colaboradora; la “lista” de esta web no es un carrito de checkout propio.

## Publicación
```bash
npm install
npm run build
npm run deploy
```

## Siguiente nivel de monetización
Conecta el formulario a un CRM/email y añade Analytics/Google Search Console cuando tengas listas las políticas correspondientes. Después puedes crear contenido SEO y distribuirlo en redes para alimentar el embudo:
tráfico → asesor → productos → clic afiliado → compra / lead.
