-- ============================================================
-- BASE DE DATOS VETERINARIA - ACTUALIZADA
-- ============================================================
-- Incluye: roles completos, historia clínica detallada,
-- tratamientos, vacunas, archivos, notas privadas y auditoría
-- ============================================================

CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- ============================================================
-- TABLA: clientes
-- Propietarios de mascotas
-- ============================================================
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  direccion VARCHAR(255),
  avatar_url TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: veterinarios
-- Profesionales veterinarios
-- ============================================================
CREATE TABLE IF NOT EXISTS veterinarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  especialidad VARCHAR(255),
  email VARCHAR(255),
  telefono VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: usuarios
-- Usuarios del sistema con roles y relación a entidades
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(255),
  apellido VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  roles VARCHAR(255) DEFAULT 'ROLE_USER',
  cliente_id INT,
  veterinario_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: mascotas
-- Animales registrados con campos médicos
-- ============================================================
CREATE TABLE IF NOT EXISTS mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  especie VARCHAR(255) NOT NULL,
  raza VARCHAR(255),
  edad INT,
  cliente_id INT,
  foto_url TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: citas
-- Citas médicas con más campos
-- ============================================================
CREATE TABLE IF NOT EXISTS citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  motivo VARCHAR(255),
  estado VARCHAR(50) DEFAULT 'Pendiente',
  motivo_cancelacion TEXT,
  mascota_id INT,
  veterinario_id INT,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL,
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: historial_clinico
-- Historial clínico DETALLADO
-- ============================================================
CREATE TABLE IF NOT EXISTS historial_clinico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mascota_id INT,
  fecha DATE,
  motivo_consulta TEXT,
  peso DECIMAL(10,2),
  temperatura DECIMAL(5,2),
  diagnostico TEXT,
  tratamiento TEXT,
  medicamentos TEXT,
  observaciones TEXT,
  notas_privadas TEXT,
  veterinario_id INT,
  cerrado TINYINT(1) DEFAULT 0,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL,
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: vacunas
-- Control de vacunas
-- ============================================================
CREATE TABLE IF NOT EXISTS vacunas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_vacuna VARCHAR(255) NOT NULL,
  fecha_aplicacion DATE,
  fecha_proxima_dosis DATE,
  veterinario_id INT,
  mascota_id INT,
  notas TEXT,
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: pagos
-- Control de pagos
-- ============================================================
CREATE TABLE IF NOT EXISTS pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  monto DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50),
  estado VARCHAR(50) DEFAULT 'Completado',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  descripcion TEXT,
  is_deleted TINYINT(1) DEFAULT 0,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Insertar veterinarios primero para vincular usuarios
INSERT IGNORE INTO veterinarios (id, nombre, especialidad, email, telefono) VALUES
(1, 'Dr. Carlos López', 'Cirugía', 'carlos@veterinaria.com', '555-0101'),
(2, 'Dra. María González', 'Medicina General', 'maria@veterinaria.com', '555-0102');

-- Insertar clientes primero para vincular usuarios
INSERT IGNORE INTO clientes (id, nombre, telefono, email, direccion) VALUES
(1, 'Juan Pérez', '555-1001', 'juan.perez@email.com', 'Calle Principal 123'),
(2, 'María García', '555-1002', 'maria.garcia@email.com', 'Av. Secundaria 456');

-- Insertar mascotas
INSERT IGNORE INTO mascotas (id, nombre, especie, raza, edad, cliente_id) VALUES
(1, 'Fido', 'Perro', 'Labrador', 3, 1),
(2, 'Michi', 'Gato', 'Persa', 2, 2);

-- Insertar USUARIOS con credenciales por defecto
INSERT IGNORE INTO usuarios (id, username, password, nombre, apellido, email, roles, cliente_id, veterinario_id) VALUES
-- Admin: admin@veterinaria.com / admin123
(1, 'admin@veterinaria.com', '$2a$10$JMwWJFJKqUgbFdsoiNJoVuDWRphGKuo.UYgaMC9hG03m2PTC32WV6', 'Administrador', '', 'admin@veterinaria.com', 'ADMIN', NULL, NULL),
-- Veterinario: carlos@veterinaria.com / vet123
(2, 'carlos@veterinaria.com', '$2a$10$qBKP/J1k5B9XoNCSvnIxO.dcb9pRF89mvPn/L3LLK9rL7cFkW8Gn2', 'Carlos', 'López', 'carlos@veterinaria.com', 'VETERINARIO', NULL, 1),
-- Veterinario 2: maria@veterinaria.com / vet123
(3, 'maria@veterinaria.com', '$2a$10$qBKP/J1k5B9XoNCSvnIxO.dcb9pRF89mvPn/L3LLK9rL7cFkW8Gn2', 'María', 'González', 'maria@veterinaria.com', 'VETERINARIO', NULL, 2),
-- Cliente: juan.perez@email.com / cliente123
(4, 'juan.perez@email.com', '$2a$10$2xFVmkyqwHeUu65k0WlmVuqWvTgzYig.tAmkebQPVgIxSnlNXnaEy', 'Juan', 'Pérez', 'juan.perez@email.com', 'CLIENTE', 1, NULL),
-- Cliente 2: maria.garcia@email.com / cliente123
(5, 'maria.garcia@email.com', '$2a$10$2xFVmkyqwHeUu65k0WlmVuqWvTgzYig.tAmkebQPVgIxSnlNXnaEy', 'María', 'García', 'maria.garcia@email.com', 'CLIENTE', 2, NULL);

-- ============================================================
-- CONFIRMACIÓN
-- ============================================================
SELECT '✅ Base de datos veterinaria actualizada exitosamente' AS estado;
SELECT 'Credenciales por defecto:' AS info;
SELECT 'Admin: admin@veterinaria.com / admin123' AS admin;
SELECT 'Veterinario: carlos@veterinaria.com / vet123' AS veterinario;
SELECT 'Cliente: juan.perez@email.com / cliente123' AS cliente;
