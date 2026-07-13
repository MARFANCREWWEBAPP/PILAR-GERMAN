# NO SLEEP WEDDING CLUB

Web app privada/pública para la fiesta de Pilar & Germán: landing, registro de invitados, passports con QR, admin interno, scanner de puerta, exportaciones y editor de textos públicos.

## Stack

- Next.js 14
- React 18
- Prisma
- PostgreSQL
- Tailwind CSS
- Railway-ready

## Funcionalidades

- Landing pública festivalera.
- Registro RSVP con máximo 1 acompañante.
- Generación de passport individual por invitado y acompañante.
- Bus único: Cártama estación → Finca San Isidro.
- Admin privado con dashboard, invitados, scanner, ajustes y editor de textos.
- Editor interno de textos para cambiar portada y registro sin tocar código.
- Descarga PDF/PNG del passport.
- Preparado para Apple Wallet y Android/Google Wallet cuando se añadan credenciales oficiales.

## Variables de entorno

Copia `.env.example` a `.env` en local. En Railway añade estas variables desde el panel del proyecto.

```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
AUTH_SECRET="cambia-esto-por-un-secreto-largo-y-aleatorio"
BASE_URL="http://localhost:3000"

ADMIN_SEED_EMAIL="info@marquee.es"
ADMIN_SEED_PASSWORD="pon-aqui-una-contrasena-segura-en-railway"
```

No subas nunca el `.env` real a GitHub.

## Desarrollo local

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

Abre `http://localhost:3000`.

## Admin

El seed crea el usuario inicial usando:

```bash
ADMIN_SEED_EMAIL
ADMIN_SEED_PASSWORD
```

En producción pon estos valores en Railway. La contraseña real debe vivir solo en Railway, no en GitHub.

Rutas principales:

- `/login`
- `/admin`
- `/admin/launch`
- `/admin/content`
- `/admin/menus`
- `/admin/guests`
- `/admin/scan`
- `/admin/backups`
- `/admin/settings`

## Despliegue en GitHub + Railway

1. Crea un repositorio en GitHub.
2. Sube este proyecto al repositorio.
3. En Railway, crea un proyecto nuevo desde ese repositorio.
4. Añade una base de datos PostgreSQL en Railway.
5. Copia la variable `DATABASE_URL` que da Railway Postgres al servicio web.
6. Añade también `AUTH_SECRET`, `BASE_URL`, `ADMIN_SEED_EMAIL` y `ADMIN_SEED_PASSWORD`.
7. Railway usará `railway.json` automáticamente.
8. En el primer arranque ejecutará migraciones y creará el admin inicial.

## Comandos de Railway

Railway usa estos scripts:

```bash
npm run railway:build
npm run railway:start
```

El start hace:

```bash
prisma migrate deploy && npm run seed && next start
```

Así la base queda preparada antes de servir la app.

## BASE_URL en producción

Cuando Railway te dé la URL pública, configura:

```bash
BASE_URL="https://tu-app.up.railway.app"
```

Si luego conectas un dominio propio, cambia `BASE_URL` al dominio final. Esto afecta a enlaces de ticket, QR y wallet.

## Wallet

Las pantallas y botones ya están preparados, pero Apple Wallet y Google Wallet necesitan credenciales reales.

Apple Wallet:

- `APPLE_PASS_TYPE_ID`
- `APPLE_TEAM_ID`
- `APPLE_CERT_PATH`
- `APPLE_KEY_PATH`
- `APPLE_WWDR_CERT_PATH`
- `APPLE_KEY_PASSWORD`

Google Wallet:

- `GOOGLE_WALLET_ISSUER_ID`
- `GOOGLE_WALLET_CLASS_ID`
- `GOOGLE_APPLICATION_CREDENTIALS`

## Notas de producción

- El editor de textos públicos se guarda en PostgreSQL cuando existe `DATABASE_URL`.
- Los ajustes del evento se autoguardan en PostgreSQL desde el admin.
- Los registros, invitados, passports y validaciones de puerta viven en PostgreSQL.
- Los cambios de versión o redespliegues en Railway no borran la base de datos.
- No guardes datos importantes solo en archivos del repo: el código cambia, la base de datos permanece.
- Desde `/admin/backups` puedes descargar una copia JSON completa antes de cambios grandes.
- En local sin base de datos, la app usa datos demo y fallback de archivo.
- El seed no crea invitados falsos en producción.
- Las migraciones están incluidas para que Railway pueda crear todas las tablas.
