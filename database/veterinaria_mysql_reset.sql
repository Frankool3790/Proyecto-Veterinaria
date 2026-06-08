-- ============================================================
-- SCRIPT RESET - LIMPIAR BASE DE DATOS
-- ============================================================
-- Este script elimina toda la base de datos y la recreada desde cero
-- ¡CUIDADO! Esta acción es irreversible
-- ============================================================

-- Eliminar la base de datos existente
DROP DATABASE IF EXISTS veterinaria;

-- Crear base de datos nueva
CREATE DATABASE veterinaria;
USE veterinaria;

-- Crear todas las tablas vacías
-- (Ejecutar veterinaria_mysql_init.sql después de esto)

SELECT '✅ Base de datos eliminada y recreada' AS estado;
SELECT 'Próximos pasos:' AS info;
SELECT '1. Ejecuta: veterinaria_mysql_init.sql' AS paso;
SELECT '2. Ejecuta: veterinaria_mysql_seed.sql (opcional)' AS paso;
