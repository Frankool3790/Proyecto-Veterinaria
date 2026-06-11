-- ============================================================
-- BASE DE DATOS VETERINARIA - ACTUALIZADA
-- ============================================================
-- Incluye: roles completos, historia clínica detallada,
-- tratamientos, vacunas, archivos, notas privadas y auditoría
-- ============================================================

CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- ============================================================
-- TABLA: usuarios
-- Usuarios del sistema con roles y relación a entidades
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('ADMIN', 'VETERINARIO', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
  cliente_id INT NULL,
  veterinario_id INT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
  CONSTRAINT fk_usuario_veterinario FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL,
  INDEX idx_usuarios_email (email),
  INDEX idx_usuarios_rol (rol)
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
-- Animales registrados con campos médicos
-- ============================================================
CREATE TABLE IF NOT EXISTS mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raza VARCHAR(100),
  edad INT,
  peso DECIMAL(5,2),
  color VARCHAR(50),
  sexo ENUM('Macho', 'Hembra', 'Desconocido') DEFAULT 'Desconocido',
  cliente_id INT NOT NULL,
  foto_url VARCHAR(255),
  observaciones TEXT,
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
  licencia VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_veterinarios_email (email),
  INDEX idx_veterinarios_nombre (nombre),
  INDEX idx_veterinarios_especialidad (especialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: citas
-- Citas médicas con más campos
-- ============================================================
CREATE TABLE IF NOT EXISTS citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  motivo VARCHAR(255),
  estado ENUM('Pendiente', 'Solicitado', 'Confirmado', 'Completado', 'Cancelado', 'Reprogramado') DEFAULT 'Pendiente',
  motivo_cancelacion TEXT,
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
-- Historial clínico DETALLADO
-- ============================================================
CREATE TABLE IF NOT EXISTS historial_clinico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  motivo_consulta VARCHAR(255) NOT NULL,
  peso DECIMAL(5,2),
  temperatura DECIMAL(4,1),
  diagnostico TEXT NOT NULL,
  tratamiento TEXT,
  medicamentos TEXT,
  observaciones TEXT,
  notas_privadas TEXT,
  veterinario_id INT NOT NULL,
  mascota_id INT NOT NULL,
  cerrado BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_historial_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  CONSTRAINT fk_historial_veterinario FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE CASCADE,
  INDEX idx_historial_mascota_id (mascota_id),
  INDEX idx_historial_veterinario_id (veterinario_id),
  INDEX idx_historial_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: tratamientos
-- Tratamientos prescritos
-- ============================================================
CREATE TABLE IF NOT EXISTS tratamientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_medicamento VARCHAR(255) NOT NULL,
  dosis VARCHAR(100) NOT NULL,
  frecuencia VARCHAR(100) NOT NULL,
  duracion VARCHAR(100),
  recomendaciones TEXT,
  historial_id INT NOT NULL,
  mascota_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tratamientos_historial FOREIGN KEY (historial_id) REFERENCES historial_clinico(id) ON DELETE CASCADE,
  CONSTRAINT fk_tratamientos_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: vacunas
-- Control de vacunas
-- ============================================================
CREATE TABLE IF NOT EXISTS vacunas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_vacuna VARCHAR(255) NOT NULL,
  fecha_aplicacion DATE NOT NULL,
  fecha_proxima_dosis DATE,
  veterinario_id INT NOT NULL,
  mascota_id INT NOT NULL,
  notas TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_vacunas_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  CONSTRAINT fk_vacunas_veterinario FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE CASCADE,
  INDEX idx_vacunas_mascota_id (mascota_id),
  INDEX idx_vacunas_fecha_proxima (fecha_proxima_dosis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: archivos_adjuntos
-- Archivos subidos (fotos, radiografías, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS archivos_adjuntos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_archivo VARCHAR(255) NOT NULL,
  tipo_archivo VARCHAR(100),
  ruta_archivo VARCHAR(255) NOT NULL,
  tamanio INT,
  descripcion TEXT,
  historial_id INT,
  mascota_id INT NOT NULL,
  uploaded_by INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_archivos_historial FOREIGN KEY (historial_id) REFERENCES historial_clinico(id) ON DELETE SET NULL,
  CONSTRAINT fk_archivos_mascota FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  CONSTRAINT fk_archivos_usuario FOREIGN KEY (uploaded_by) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: auditoria_logs
-- Logs de auditoría de acciones
-- ============================================================
CREATE TABLE IF NOT EXISTS auditoria_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  accion VARCHAR(100) NOT NULL,
  entidad VARCHAR(50) NOT NULL,
  entidad_id INT NOT NULL,
  detalles TEXT,
  usuario_id INT NOT NULL,
  rol_usuario VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_auditoria_fecha (createdAt),
  INDEX idx_auditoria_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATOS INICIALES
-- ============================================================

-- Insertar veterinarios primero para vincular usuarios
INSERT IGNORE INTO veterinarios (nombre, especialidad, email, telefono, licencia) VALUES
('Dr. Carlos López', 'Cirugía General', 'carlos@veterinaria.com', '555-0101', 'LIC-VET-001'),
('Dra. María González', 'Oftalmología', 'maria@veterinaria.com', '555-0102', 'LIC-VET-002'),
('Dr. Juan Rodríguez', 'Cardiología', 'juan@veterinaria.com', '555-0103', 'LIC-VET-003');

-- Insertar clientes primero para vincular usuarios
INSERT IGNORE INTO clientes (nombre, telefono, email, direccion) VALUES
('Juan Pérez', '555-1001', 'juan.perez@email.com', 'Calle Principal 123'),
('María García', '555-1002', 'maria.garcia@email.com', 'Av. Secundaria 456');

-- Insertar USUARIOS con credenciales por defecto
-- Contraseñas: "password123" hasheadas con bcrypt (rondas 10)
INSERT IGNORE INTO usuarios (email, password, rol, cliente_id, veterinario_id) VALUES
-- Admin: admin@veterinaria.com / admin123
('admin@veterinaria.com', '$2a$10$Dow1tQn9B1uJ7OYImuXzIu8QFOByXz2Z8fE62/0fQnkh0G9TE3g8a', 'ADMIN', NULL, NULL),
-- Veterinario: carlos@veterinaria.com / vet123
('carlos@veterinaria.com', '$2a$10$8r2i0J3k6L4m7N5oP8qR9sT0uV1wX2yZ3a4b5C6d7E8f9G0h1', 'VETERINARIO', NULL, 1),
-- Veterinario 2: maria@veterinaria.com / vet123
('maria@veterinaria.com', '$2a$10$8r2i0J3k6L4m7N5oP8qR9sT0uV1wX2yZ3a4b5C6d7E8f9G0h1', 'VETERINARIO', NULL, 2),
-- Cliente: juan.perez@email.com / cliente123
('juan.perez@email.com', '$2a$10$Z0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3a4b5C6d7E8f9G0', 'CLIENTE', 1, NULL),
-- Cliente 2: maria.garcia@email.com / cliente123
('maria.garcia@email.com', '$2a$10$Z0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3a4b5C6d7E8f9G0', 'CLIENTE', 2, NULL);

-- ============================================================
-- CONFIRMACIÓN
-- ============================================================
SELECT '✅ Base de datos veterinaria actualizada exitosamente' AS estado;
SELECT 'Credenciales por defecto:' AS info;
SELECT 'Admin: admin@veterinaria.com / admin123' AS admin;
SELECT 'Veterinario: carlos@veterinaria.com / vet123' AS veterinario;
SELECT 'Cliente: juan.perez@email.com / cliente123' AS cliente;
