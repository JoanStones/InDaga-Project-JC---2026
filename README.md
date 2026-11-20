# InDaga

Plataforma gratuita que reúne **becas, cursos y programas** para jóvenes en Panamá. Proyecto final "Mi emprendimiento digital" — Jóvenes creaTIvos, Ruta Avanzada.

**Equipo:** Joan Stonestreet y Albelis Zaragoza

## Enlaces

- Aplicación publicada: _(pegar aquí el enlace de GitHub Pages)_
- API (backend): _(pegar aquí el enlace de Render)_

## Qué incluye

- Landing pública con registro e inicio de sesión
- Catálogo de oportunidades con filtros, búsqueda y detalle desplegable (requisitos y enlace oficial)
- Formulario de contacto real (guarda los mensajes en la base de datos)
- **Daga**, asistente con IA (Gemini) que recomienda oportunidades del catálogo y saluda por nombre
- Panel de administración protegido por rol
- Diseño responsive

## Tecnologías

- Frontend: React 19 + Vite
- Backend: Node.js + Express
- Base de datos: MongoDB Atlas (Mongoose)
- Autenticación: JWT + bcryptjs
- IA: API de Google Gemini, llamada solo desde el servidor

## Estructura

```
backend/    API (rutas, modelos, middleware, seed)
frontend/   Aplicación React y landing.html
```

## Cómo correrlo en local

1. Backend: crea `backend/.env` con `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `GEMINI_API_KEY` y `PORT=3000`.
2. En `backend`: `npm install`, luego `node seed.js` (carga las oportunidades) y `node server.js`.
3. En `frontend`: `npm install` y `npm run dev`.

> El archivo `.env` nunca se sube al repositorio.

## Endpoints principales

| Método | Ruta | Acceso |
|---|---|---|
| POST | /api/auth/registro, /api/auth/login | Público |
| GET | /api/oportunidades | Público |
| POST | /api/contacto | Público |
| GET | /api/contacto | Administrador |
| POST | /api/chat | Usuario con sesión |
