# SI Project – Products CRUD

Simple NodeJS + PostgreSQL API built for class.

## Features

- Basic CRUD on `products`
- 3 environments: dev / release / prod
- Dynamic environment loading using `NODE_ENV`
- Separate PostgreSQL database per environment

## Run (Windows)

Install dependencies:

```powershell
npm install
```

Start in development:

```powershell
npm run dev
```

Start in release:

```powershell
npm run start:release
```

Start in production:

```powershell
npm start
```

## Endpoints

- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id