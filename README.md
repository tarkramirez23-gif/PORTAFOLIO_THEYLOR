# Portafolio · Theylor Ramírez (Angular)

> v3: rediseño según el mockup (tema oscuro + violeta). Contenido en `src/app/data/portfolio.data.ts`. Pon tu CV en `public/Theylor_Ramirez_CV.pdf` y tu foto del laboratorio en `public/` (cambia `lab.svg` por tu archivo en `about.ts`).
> El diseño no incluye formulario, por eso `backend/` y `database/` ya no se usan (puedes borrarlos o conservarlos para más adelante).

Portafolio de Ciberseguridad y Redes, migrado a Angular (componentes standalone, signals, control flow `@for/@if`, zoneless).

## Ejecutar en local
```bash
npm install
npm start          # http://localhost:4200  (el formulario se simula, no necesita PHP)
```
Requiere Node `^22.22.3` o `^24.15.0`.

## Compilar y publicar
```bash
npm run build      # genera dist/theylor-portafolio/browser
```
1. Sube **el contenido** de `dist/theylor-portafolio/browser/` a la raíz del hosting (`htdocs`).
2. Sube `deploy/.htaccess` y `deploy/.well-known/` a esa misma raíz (cabeceras de seguridad + security.txt).
3. Sube la carpeta `backend/` a `htdocs/backend/`.
4. En el servidor: copia `backend/config.local.example.php` → `backend/config.local.php` y completa los datos.
5. Base de datos: tabla nueva → `database/schema.sql`; si ya tienes la tabla `mensajes` → `database/migracion_v2.sql`.
6. Requiere PHP 8.1 o superior.

## ⚠️ Acción urgente
El `config.php` original tenía la **contraseña de MySQL en texto plano** y estaba dentro del zip del proyecto.
Cámbiala en el panel del hosting y úsala solo en `config.local.php`. Si el repo es público en GitHub, considera esa clave comprometida.

## Dónde editar contenido
Todo el texto (perfil, habilidades, proyectos, hoja de ruta, controles de seguridad) está en `src/app/data/portfolio.data.ts`.
La **hoja de ruta** (CCNA, Security+, etc.) es un ejemplo: reemplázala por tus metas reales.

## Seguridad incluida
- CSP estricta, HSTS, nosniff, frame-ancestors, Referrer/Permissions-Policy (`deploy/.htaccess`).
- Sin `innerHTML`; la terminal solo ejecuta una lista blanca de comandos.
- Formulario: validación cliente + servidor, honeypot, trampa de tiempo, rate limit por IP (HMAC), PDO con prepared statements reales, errores genéricos.
- CORS por lista blanca (antes `*`).
- Secretos fuera del repo (`config.local.php` en `.gitignore`, acceso web denegado).
- `security.txt` (RFC 9116).

Para probar el endpoint con curl, envía `"t": 5000` (si no, la trampa de tiempo lo descarta en silencio) y un `Origin` permitido.
Tras desplegar, verifica las cabeceras con el comando de la sección "Seguridad de este sitio". Si el hosting las ignora, quita esa afirmación del sitio.
Mantén Angular al día (`ng update`) y ejecuta `npm run audit:prod` periódicamente.
