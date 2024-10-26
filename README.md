<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```bash
yarn install
```
3. Tener Nest CLI instalado
```bash
npm i -g @nest/cli
```
4. Levantar la base de datos
```bash
docker compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
6. Llenar las variables de entorno definidas en ```.env```
7. Arrancar la app
```bash
yarn start:dev
```
8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

# Production Build
1. Crear el archivo __.env.prod__
2. Llenar las variables de entorno para producción
3. Crear la nueva imagen
```bash
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack usado
* MongoDB
* Nest