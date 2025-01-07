<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto Cine

Backend de Proyecto de Cine basado en el framework [Nest](https://github.com/nestjs/nest).

## Descripción

Este proyecto es una aplicación backend para la gestión de un cine, que incluye la administración de películas, salas y reservas de asientos en tiempo real evitando que el mismo asiento por diferentes usuarios.

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo .env en la carpeta principal del proyecto con la variable: `DATABASE_URL="file:./dev.db"`

## Ejecutando la aplicación

```bash
# Ejecutar migracion de prisma
npx prisma migrate dev

# modo watch
npm run start:dev
```

## Uso

### Endpoints

- **Películas**

  - `POST /peliculas`: Crear una nueva película.
  - `GET /peliculas`: Obtener todas las películas.
  - `PATCH /peliculas/:id`: Actualizar una película.
  - `DELETE /peliculas/:id`: Eliminar una película.

- **Reservas**
  - `WS /obtenerAsientosPorPelicula`: Obtener asientos por película.
  - `WS /seleccionarAsiento`: Seleccionar un asiento.
  - `WS /confirmarAsientos`: Confirmar asientos seleccionados.
  - `WS /desbloquearAsiento`: Desbloquear un asiento.

## Tecnologías utilizadas

- TypeScript
- Nest.js
- Prisma
- SqLite
- Socket.io
