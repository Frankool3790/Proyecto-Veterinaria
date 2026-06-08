# Veterinaria Backend API

## Descripción
Backend para el sistema de gestión de clínica veterinaria desarrollado con Node.js, Express y SQLite.

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

3. **Iniciar el servidor:**
```bash
npm start
```

Para desarrollo con auto-reload:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── config/          # Configuración de base de datos
├── controllers/     # Controladores de rutas
├── middleware/      # Middleware (error handler, validación)
├── models/          # DTOs (Data Transfer Objects)
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
└── utils/           # Utilidades (helpers, constantes)
```

## Endpoints API

### Autenticación
- `POST /api/auth/login` - Login de usuario

### Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/:id` - Obtener cliente por ID
- `POST /api/clientes` - Crear cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Mascotas
- `GET /api/mascotas` - Obtener todas las mascotas
- `GET /api/mascotas/:id` - Obtener mascota por ID
- `GET /api/mascotas/cliente/:clienteId` - Obtener mascotas de un cliente
- `POST /api/mascotas` - Crear mascota
- `PUT /api/mascotas/:id` - Actualizar mascota
- `DELETE /api/mascotas/:id` - Eliminar mascota

### Veterinarios
- `GET /api/veterinarios` - Obtener todos los veterinarios
- `GET /api/veterinarios/:id` - Obtener veterinario por ID
- `POST /api/veterinarios` - Crear veterinario
- `PUT /api/veterinarios/:id` - Actualizar veterinario
- `DELETE /api/veterinarios/:id` - Eliminar veterinario

### Citas
- `GET /api/citas` - Obtener todas las citas
- `GET /api/citas/:id` - Obtener cita por ID
- `GET /api/citas/mascota/:mascotaId` - Obtener citas de una mascota
- `GET /api/citas/veterinario/:veterinarioId` - Obtener citas de un veterinario
- `POST /api/citas` - Crear cita
- `PUT /api/citas/:id` - Actualizar cita
- `DELETE /api/citas/:id` - Eliminar cita

### Historial Clínico
- `GET /api/historial` - Obtener todo el historial
- `GET /api/historial/:id` - Obtener registro por ID
- `GET /api/historial/mascota/:mascotaId` - Obtener historial de una mascota
- `POST /api/historial` - Crear registro
- `PUT /api/historial/:id` - Actualizar registro
- `DELETE /api/historial/:id` - Eliminar registro

## Ejemplos de Solicitud

### Crear Cliente
```json
POST /api/clientes
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "123456789",
  "direccion": "Calle Principal 123"
}
```

### Crear Mascota
```json
POST /api/mascotas
{
  "nombre": "Fluffy",
  "especie": "Gato",
  "raza": "Persa",
  "edad": 3,
  "clienteId": 1
}
```

### Crear Veterinario
```json
POST /api/veterinarios
{
  "nombre": "Dr. López",
  "especialidad": "Cirugía",
  "email": "lopez@veterinaria.com"
}
```

### Crear Cita
```json
POST /api/citas
{
  "fecha": "2024-06-15",
  "hora": "14:30",
  "motivo": "Revisión general",
  "estado": "Pendiente",
  "mascotaId": 1,
  "veterinarioId": 1
}
```

### Crear Historial Clínico
```json
POST /api/historial
{
  "descripcion": "Vacunación antirrábica",
  "fecha": "2024-06-08",
  "notas": "Se administró vacuna sin complicaciones",
  "mascotaId": 1
}
```

## Base de Datos

La base de datos se crea automáticamente en `veterinaria.db` con las siguientes tablas:
- `usuarios` - Usuarios del sistema
- `clientes` - Clientes/propietarios
- `mascotas` - Mascotas registradas
- `veterinarios` - Veterinarios
- `citas` - Citas médicas
- `historial_clinico` - Historial clínico de mascotas

## Variables de Entorno

- `PORT` - Puerto del servidor (default: 3002)
- `NODE_ENV` - Ambiente (development/production)
- `DB_PATH` - Ruta de la base de datos SQLite
- `JWT_SECRET` - Secreto para JWT (si se implementa autenticación)

## Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **SQLite3** - Base de datos
- **bcryptjs** - Hashing de contraseñas
- **cors** - CORS middleware
- **dotenv** - Variables de entorno

## Manejo de Errores

El servidor incluye un middleware global de manejo de errores que devuelve respuestas JSON consistentes:

```json
{
  "error": "Mensaje de error descriptivo"
}
```

## Desarrollo

Para añadir nuevas entidades:
1. Crear modelo DTO en `models/`
2. Crear servicio en `services/`
3. Crear controlador en `controllers/`
4. Crear rutas en `routes/`
5. Registrar rutas en `server.js`
6. Opcionalmente: Añadir validación en `middleware/`

## Licencia

MIT
