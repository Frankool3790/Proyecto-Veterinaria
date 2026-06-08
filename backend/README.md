# Veterinaria Backend - Node.js/Express

Backend REST API para sistema de gestión de clínica veterinaria con soporte para Mascotas, Dueños y Turnos.

## Tecnologías

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Base de datos
- **bcryptjs** - Hashing de contraseñas
- **CORS** - Cross-Origin Resource Sharing

## Instalación

```bash
npm install
```

## Ejecución

### Desarrollo (con watch)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3002`

## Estructura

```
backend/
├── src/
│   ├── config/        # Configuración de BD
│   ├── controllers/   # Manejadores de rutas
│   ├── models/        # DTOs y modelos
│   ├── routes/        # Definición de rutas
│   ├── services/      # Lógica de negocio
│   ├── middleware/    # Middleware Express
│   └── utils/         # Utilidades y helpers
├── server.js          # Punto de entrada
├── package.json       # Dependencias
└── .env               # Variables de entorno
```

## Endpoints API

### Auth
- `POST /api/auth/login` - Autenticación

### Clientes (Dueños)
- `GET /api/clientes` - Listar todos
- `GET /api/clientes/:id` - Obtener por ID
- `POST /api/clientes` - Crear nuevo

### Mascotas
- `GET /api/mascotas` - Listar todas
- `POST /api/mascotas` - Crear nueva

### Veterinarios
- `GET /api/veterinarios` - Listar todos
- `POST /api/veterinarios` - Crear nuevo

### Turnos (Citas)
- `GET /api/citas` - Listar todas
- `POST /api/citas` - Crear nueva

### Historial
- `GET /api/historial` - Listar todo
- `POST /api/historial` - Crear nuevo registro

## Credenciales de Prueba

- Usuario: `admin`
- Contraseña: `admin123`

## Base de Datos

SQLite se crea automáticamente en `veterinaria.db` al iniciar la aplicación. Se establecen todas las tablas y relaciones automáticamente.
