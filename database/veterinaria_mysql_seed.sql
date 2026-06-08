-- ============================================================
-- SCRIPT SEED - DATOS DE PRUEBA
-- Base de datos: veterinaria
-- ============================================================
-- Ejecutar DESPUÉS de veterinaria_mysql_init.sql
-- Este script puebla la base de datos con datos de ejemplo
-- ============================================================

USE veterinaria;

-- ============================================================
-- INSERTAR CLIENTES DE PRUEBA
-- ============================================================
INSERT IGNORE INTO clientes (nombre, email, telefono, direccion) VALUES
('Juan Pérez', 'juan.perez@email.com', '555-1001', 'Calle Principal 123'),
('María García', 'maria.garcia@email.com', '555-1002', 'Av. Secundaria 456'),
('Carlos López', 'carlos.lopez@email.com', '555-1003', 'Calle Tercera 789'),
('Ana Martínez', 'ana.martinez@email.com', '555-1004', 'Calle Cuarta 101'),
('Roberto Sánchez', 'roberto.sanchez@email.com', '555-1005', 'Calle Quinta 202');

-- ============================================================
-- INSERTAR MASCOTAS DE PRUEBA
-- ============================================================
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

-- ============================================================
-- INSERTAR CITAS DE PRUEBA
-- ============================================================
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

-- ============================================================
-- INSERTAR HISTORIAL CLÍNICO
-- ============================================================
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

-- ============================================================
-- RESUMEN DE DATOS INSERTADOS
-- ============================================================
SELECT 'USUARIOS REGISTRADOS:' AS categoria;
SELECT username, roles, createdAt FROM usuarios;

SELECT '' AS espacio;
SELECT 'CLIENTES:' AS categoria;
SELECT COUNT(*) AS total FROM clientes;

SELECT '' AS espacio;
SELECT 'MASCOTAS:' AS categoria;
SELECT COUNT(*) AS total FROM mascotas;

SELECT '' AS espacio;
SELECT 'VETERINARIOS:' AS categoria;
SELECT COUNT(*) AS total FROM veterinarios;

SELECT '' AS espacio;
SELECT 'CITAS:' AS categoria;
SELECT COUNT(*) AS total FROM citas;

SELECT '' AS espacio;
SELECT 'HISTORIAL CLÍNICO:' AS categoria;
SELECT COUNT(*) AS total FROM historial_clinico;

SELECT '' AS espacio;
SELECT '✅ DATOS DE PRUEBA INSERTADOS EXITOSAMENTE' AS estado;
