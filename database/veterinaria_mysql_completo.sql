-- ============================================================
-- SCRIPT COMPLETO - BASE DE DATOS VETERINARIA MYSQL
-- ============================================================
-- Este script incluye TODO en un solo archivo:
-- 1. Crear base de datos
-- 2. Crear todas las tablas
-- 3. Insertar datos iniciales (admin + veterinarios)
-- 4. Insertar datos de prueba (clientes, mascotas, citas, historial)
-- ============================================================
-- Nota: Comentar las líneas de DATOS DE PRUEBA si solo quieres
-- las tablas vacías con usuario admin
-- ============================================================

-- ============================================================
-- PARTE 1: CREAR BASE DE DATOS Y TABLAS
-- ============================================================

CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- TABLA: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  roles VARCHAR(50) DEFAULT 'ROLE_USER',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA: clientes
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

-- TABLA: mascotas
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

-- TABLA: veterinarios
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

-- TABLA: citas
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

-- TABLA: historial_clinico
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

SELECT '✅ TABLAS CREADAS EXITOSAMENTE' AS estado;

-- ============================================================
-- PARTE 2: DATOS INICIALES (Usuario admin + Veterinarios)
-- ============================================================

INSERT IGNORE INTO usuarios (username, password, roles) VALUES
('admin', '$2a$10$Dow1tQn9B1uJ7OYImuXzIu8QFOByXz2Z8fE62/0fQnkh0G9TE3g8a', 'ROLE_ADMIN');

INSERT IGNORE INTO veterinarios (nombre, especialidad, email, telefono) VALUES
('Dr. Carlos López', 'Cirugía General', 'carlos@veterinaria.com', '555-0101'),
('Dra. María González', 'Oftalmología', 'maria@veterinaria.com', '555-0102'),
('Dr. Juan Rodríguez', 'Cardiología', 'juan@veterinaria.com', '555-0103');

SELECT '✅ DATOS INICIALES INSERTADOS' AS estado;
SELECT 'Usuario: admin | Contraseña: admin123' AS credenciales;

-- ============================================================
-- PARTE 3: DATOS DE PRUEBA (OPCIONAL)
-- Descomenta si quieres que se inserten automáticamente
-- ============================================================

-- CLIENTES
INSERT IGNORE INTO clientes (nombre, email, telefono, direccion) VALUES
('Juan Pérez', 'juan.perez@email.com', '555-1001', 'Calle Principal 123'),
('María García', 'maria.garcia@email.com', '555-1002', 'Av. Secundaria 456'),
('Carlos López', 'carlos.lopez@email.com', '555-1003', 'Calle Tercera 789'),
('Ana Martínez', 'ana.martinez@email.com', '555-1004', 'Calle Cuarta 101'),
('Roberto Sánchez', 'roberto.sanchez@email.com', '555-1005', 'Calle Quinta 202');

-- MASCOTAS
INSERT IGNORE INTO mascotas (nombre, especie, raza, edad, cliente_id) VALUES
('Fluffy', 'Gato', 'Persa', 3, 1),
('Rex', 'Perro', 'Labrador', 5, 1),
('Whiskers', 'Gato', 'Siamés', 2, 2),
('Luna', 'Perro', 'Golden Retriever', 4, 2),
('Max', 'Perro', 'Bulldog', 6, 3),
('Mimi', 'Gato', 'Blanco', 1, 3),
('Buddy', 'Perro', 'Pastor Alemán', 7, 4),
('Tiger', 'Gato', 'Atigrado', 4, 4),
('Simba', 'Gato', 'Naranja', 5, 5),
('Daisy', 'Perro', 'Cocker Spaniel', 3, 5);

-- CITAS
INSERT IGNORE INTO citas (fecha, hora, motivo, estado, mascota_id, veterinario_id) VALUES
('2024-06-10', '10:00:00', 'Revisión general', 'Pendiente', 1, 1),
('2024-06-11', '14:30:00', 'Vacunación', 'Pendiente', 2, 2),
('2024-06-12', '09:00:00', 'Limpieza dental', 'Confirmada', 3, 3),
('2024-06-13', '15:00:00', 'Control post-cirugía', 'Completada', 4, 1),
('2024-06-14', '11:30:00', 'Desparasitación', 'Pendiente', 5, 2),
('2024-06-15', '16:00:00', 'Revisión oftalmológica', 'Pendiente', 6, 3),
('2024-06-16', '10:30:00', 'Vacunación antirrábica', 'Confirmada', 7, 1),
('2024-06-17', '13:00:00', 'Chequeo general', 'Pendiente', 8, 2),
('2024-06-18', '14:30:00', 'Tratamiento de alergias', 'Pendiente', 9, 3),
('2024-06-19', '11:00:00', 'Control de peso', 'Completada', 10, 1);

-- HISTORIAL CLÍNICO
INSERT IGNORE INTO historial_clinico (descripcion, fecha, notas, mascota_id) VALUES
('Vacunación antirrábica', '2024-05-15', 'Sin complicaciones', 1),
('Revisión oftalmológica', '2024-05-10', 'Visión normal', 2),
('Limpieza dental profesional', '2024-04-20', 'Se removieron dos cálculos', 3),
('Cirugía de esterilización', '2024-03-05', 'Recuperación exitosa', 4),
('Tratamiento de infección de oído', '2024-02-28', 'Mejora evidente', 5),
('Análisis de sangre', '2024-05-01', 'Resultados normales', 6),
('Sutura de herida', '2024-04-15', 'Herida cicatrizada correctamente', 7),
('Consulta por comportamiento', '2024-05-20', 'Estrés por cambio de ambiente', 8),
('Tratamiento dermatológico', '2024-05-05', 'Alergias de primavera', 9),
('Revisión cardiaca', '2024-04-10', 'Corazón sano', 10),
('Vacunación polivalente', '2024-06-01', 'Aplicada sin incidentes', 1),
('Control post-vacunación', '2024-06-05', 'Sin reacciones adversas', 2),
('Revisión preventiva', '2024-05-25', 'Peso adecuado, sin hallazgos', 3),
('Desparasitación interna y externa', '2024-05-30', 'Completada exitosamente', 4),
('Radiografía de cadera', '2024-04-05', 'Displasia leve detectada', 5);

SELECT '✅ DATOS DE PRUEBA INSERTADOS EXITOSAMENTE' AS estado;

-- ============================================================
-- PARTE 4: VERIFICACIÓN FINAL
-- ============================================================

SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' AS separador;
SELECT '📊 RESUMEN FINAL DE LA BASE DE DATOS' AS titulo;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' AS separador;

SELECT 'USUARIOS:' AS tabla, COUNT(*) AS cantidad FROM usuarios
UNION ALL
SELECT 'CLIENTES:', COUNT(*) FROM clientes
UNION ALL
SELECT 'MASCOTAS:', COUNT(*) FROM mascotas
UNION ALL
SELECT 'VETERINARIOS:', COUNT(*) FROM veterinarios
UNION ALL
SELECT 'CITAS:', COUNT(*) FROM citas
UNION ALL
SELECT 'HISTORIAL:', COUNT(*) FROM historial_clinico;

SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' AS separador;
SELECT '✨ ¡BASE DE DATOS COMPLETAMENTE CREADA Y POBLADA!' AS estado;
SELECT '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' AS separador;
