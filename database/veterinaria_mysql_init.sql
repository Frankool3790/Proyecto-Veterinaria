-- ============================================================
-- BASE DE DATOS VETERINARIA - MYSQL WORKBENCH
-- ============================================================
-- Script para crear y configurar la base de datos completa
-- Incluye: tablas, índices, constraints y datos iniciales
-- ============================================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- ============================================================
-- TABLA: usuarios
-- Usuarios del sistema para autenticación
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  roles VARCHAR(50) DEFAULT 'ROLE_USER',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: clientes
-- Propietarios de mascotas
-- ============================================================
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(150) UNIQUE,
  direccion VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_clientes_email (email),
  INDEX idx_clientes_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: mascotas
-- Animales registrados en el sistema
-- ============================================================
CREATE TABLE IF NOT EXISTS mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raza VARCHAR(100),
  edad INT,
  cliente_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_mascotas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  INDEX idx_mascotas_cliente_id (cliente_id),
  INDEX idx_mascotas_nombre (nombre),
  INDEX idx_mascotas_especie (especie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: veterinarios
-- Profesionales veterinarios
-- ============================================================
CREATE TABLE IF NOT EXISTS veterinarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  especialidad VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  telefono VARCHAR(20),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_veterinarios_email (email),
  INDEX idx_veterinarios_nombre (nombre),
  INDEX idx_veterinarios_especialidad (especialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: citas
-- Citas médicas de las mascotas
-- ============================================================
CREATE TABLE IF NOT EXISTS citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  motivo VARCHAR(255),
  estado VARCHAR(50) DEFAULT 'Pendiente',
  mascota_id INT NOT NULL,
  veterinario_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_citas_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  CONSTRAINT fk_citas_veterinario FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE CASCADE,
  INDEX idx_citas_mascota_id (mascota_id),
  INDEX idx_citas_veterinario_id (veterinario_id),
  INDEX idx_citas_fecha (fecha),
  INDEX idx_citas_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: historial_clinico
-- Historial clínico de las mascotas
-- ============================================================
CREATE TABLE IF NOT EXISTS historial_clinico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(500) NOT NULL,
  fecha DATE NOT NULL,
  notas TEXT,
  mascota_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_historial_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  INDEX idx_historial_mascota_id (mascota_id),
  INDEX idx_historial_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Insertar usuario admin
-- Contraseña: admin123 (hasheada con bcryptjs)
INSERT IGNORE INTO usuarios (username, password, roles) VALUES
('admin', '$2a$10$Dow1tQn9B1uJ7OYImuXzIu8QFOByXz2Z8fE62/0fQnkh0G9TE3g8a', 'ROLE_ADMIN');

-- Insertar veterinarios de ejemplo
INSERT IGNORE INTO veterinarios (nombre, especialidad, email, telefono) VALUES
('Dr. Carlos López', 'Cirugía General', 'carlos@veterinaria.com', '555-0101'),
('Dra. María González', 'Oftalmología', 'maria@veterinaria.com', '555-0102'),
('Dr. Juan Rodríguez', 'Cardiología', 'juan@veterinaria.com', '555-0103');

-- ============================================================
-- CONFIRMACIÓN
-- ============================================================
SELECT '✅ Base de datos veterinaria creada exitosamente' AS estado;
SELECT COUNT(*) AS total_usuarios FROM usuarios;
SELECT COUNT(*) AS total_veterinarios FROM veterinarios;
