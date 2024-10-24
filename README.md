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
5. Arrancar la app
```bash
yarn start:dev
```
6. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest