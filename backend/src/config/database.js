import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool as mysqlPool } from './database-mysql.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../veterinaria.db');
const useMySQL = process.env.DB_TYPE === 'mysql';

const createSQLiteDatabase = () => {
  const sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error conectando a BD SQLite:', err);
    else console.log('Conectado a SQLite');
  });

  sqliteDb.serialize(() => {
    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        roles TEXT DEFAULT 'ROLE_USER',
        cliente_id INTEGER,
        veterinario_id INTEGER,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        telefono TEXT,
        email TEXT UNIQUE,
        direccion TEXT,
        avatar_url TEXT
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        especie TEXT NOT NULL,
        raza TEXT,
        edad INTEGER,
        cliente_id INTEGER,
        foto_url TEXT,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        especialidad TEXT,
        email TEXT,
        telefono TEXT
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL,
        motivo TEXT,
        estado TEXT DEFAULT 'Pendiente',
        mascota_id INTEGER,
        veterinario_id INTEGER,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS historial_clinico (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mascota_id INTEGER,
        fecha TEXT,
        motivo_consulta TEXT,
        peso REAL,
        temperatura REAL,
        diagnostico TEXT,
        tratamiento TEXT,
        medicamentos TEXT,
        observaciones TEXT,
        notas_privadas TEXT,
        veterinario_id INTEGER,
        cerrado INTEGER DEFAULT 0,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS vacunas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_vacuna TEXT NOT NULL,
        fecha_aplicacion TEXT,
        fecha_proxima_dosis TEXT,
        veterinario_id INTEGER,
        mascota_id INTEGER,
        notas TEXT,
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id),
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS pagos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        monto REAL NOT NULL,
        metodo_pago TEXT,
        estado TEXT DEFAULT 'Completado',
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        descripcion TEXT,
        is_deleted INTEGER DEFAULT 0,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )
    `);

    // Intentar agregar columnas si ya existen las tablas
    sqliteDb.run("ALTER TABLE clientes ADD COLUMN avatar_url TEXT", (err) => {});
    sqliteDb.run("ALTER TABLE mascotas ADD COLUMN foto_url TEXT", (err) => {});
    sqliteDb.run("ALTER TABLE usuarios ADD COLUMN veterinario_id INTEGER", (err) => {});

    // Insert test data
    sqliteDb.run(`
      INSERT OR IGNORE INTO veterinarios (id, nombre, especialidad, email, telefono)
      VALUES 
        (1, 'Dr. Carlos López', 'Cirugía', 'carlos@veterinaria.com', '555-1234'),
        (2, 'Dra. María González', 'Medicina General', 'maria@veterinaria.com', '555-5678')
    `);

    sqliteDb.run(`
      INSERT OR IGNORE INTO clientes (id, nombre, telefono, email, direccion)
      VALUES 
        (1, 'Juan Pérez', '555-9876', 'juan.perez@email.com', 'Calle Principal 123'),
        (2, 'María García', '555-4321', 'maria.garcia@email.com', 'Calle Secundaria 456')
    `);

    sqliteDb.run(`
      INSERT OR IGNORE INTO mascotas (id, nombre, especie, raza, edad, cliente_id)
      VALUES 
        (1, 'Fido', 'Perro', 'Labrador', 3, 1),
        (2, 'Michi', 'Gato', 'Persa', 2, 2)
    `);

    sqliteDb.run(`
      INSERT OR IGNORE INTO usuarios (id, username, password, nombre, apellido, email, roles, cliente_id, veterinario_id)
      VALUES 
        (1, 'admin@veterinaria.com', '$2a$10$kalJSOHg.cSCPZpA6zv1W.lY3hNuhC0RXZMw6wo7NkN/Qeb9jLZBy', 'Administrador', '', 'admin@veterinaria.com', 'ADMIN', NULL, NULL),
        (2, 'carlos@veterinaria.com', '$2a$10$4cgAdkwF/r/5E1bEtg5lhu79R7pc9SpNnKpdQgkNJFkc5FL1oeKcy', 'Carlos', 'López', 'carlos@veterinaria.com', 'VETERINARIO', NULL, 1),
        (3, 'maria@veterinaria.com', '$2a$10$4cgAdkwF/r/5E1bEtg5lhu79R7pc9SpNnKpdQgkNJFkc5FL1oeKcy', 'María', 'González', 'maria@veterinaria.com', 'VETERINARIO', NULL, 2),
        (4, 'juan.perez@email.com', '$2a$10$qVYuUH34WQv7qRE8tMc9LeQaxoOQeIZz8/d5nrgl7yg6w993bXKKq', 'Juan', 'Pérez', 'juan.perez@email.com', 'CLIENTE', 1, NULL),
        (5, 'maria.garcia@email.com', '$2a$10$qVYuUH34WQv7qRE8tMc9LeQaxoOQeIZz8/d5nrgl7yg6w993bXKKq', 'María', 'García', 'maria.garcia@email.com', 'CLIENTE', 2, NULL)
    `);
  });

  return sqliteDb;
};

const createMySQLAdapter = (pool) => ({
  all: async (query, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(query, params);
      connection.release();
      callback(null, rows);
    } catch (error) {
      callback(error);
    }
  },

  get: async (query, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(query, params);
      connection.release();
      callback(null, rows[0]);
    } catch (error) {
      callback(error);
    }
  },

  run: async (query, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(query, params);
      connection.release();
      if (callback) {
        callback.call({ lastID: result.insertId, changes: result.affectedRows }, null);
      }
    } catch (error) {
      if (callback) callback(error);
    }
  }
});

export const db = useMySQL ? createMySQLAdapter(mysqlPool) : createSQLiteDatabase();

export const initializeDatabase = async () => {
  if (!useMySQL) {
    return;
  }

  const connection = await mysqlPool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        telefono VARCHAR(50),
        email VARCHAR(255) UNIQUE,
        direccion VARCHAR(255),
        avatar_url TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    try {
      await connection.query("ALTER TABLE clientes ADD COLUMN avatar_url TEXT");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS veterinarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        especialidad VARCHAR(255),
        email VARCHAR(255),
        telefono VARCHAR(50)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
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
    `);

    try {
      await connection.query("ALTER TABLE usuarios ADD COLUMN veterinario_id INT");
    } catch (e) {}

    await connection.query(`
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
    `);

    try {
      await connection.query("ALTER TABLE mascotas ADD COLUMN foto_url TEXT");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS citas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fecha DATE NOT NULL,
        hora TIME NOT NULL,
        motivo VARCHAR(255),
        estado VARCHAR(50) DEFAULT 'Pendiente',
        mascota_id INT,
        veterinario_id INT,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL,
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
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
    `);

    await connection.query(`
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
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS pagos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT,
        monto DECIMAL(10, 2) NOT NULL,
        metodo_pago VARCHAR(50),
        estado VARCHAR(50) DEFAULT 'Completado',
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        descripcion TEXT,
        is_deleted TINYINT(1) DEFAULT 0,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    try {
      await connection.query("ALTER TABLE pagos ADD COLUMN is_deleted TINYINT(1) DEFAULT 0");
    } catch (e) {}

    // Insert test data
    await connection.query(`
      INSERT IGNORE INTO veterinarios (id, nombre, especialidad, email, telefono)
      VALUES 
        (1, 'Dr. Carlos López', 'Cirugía', 'carlos@veterinaria.com', '555-1234'),
        (2, 'Dra. María González', 'Medicina General', 'maria@veterinaria.com', '555-5678')
    `);

    await connection.query(`
      INSERT IGNORE INTO clientes (id, nombre, telefono, email, direccion)
      VALUES 
        (1, 'Juan Pérez', '555-9876', 'juan.perez@email.com', 'Calle Principal 123'),
        (2, 'María García', '555-4321', 'maria.garcia@email.com', 'Calle Secundaria 456')
    `);

    await connection.query(`
      INSERT IGNORE INTO mascotas (id, nombre, especie, raza, edad, cliente_id)
      VALUES 
        (1, 'Fido', 'Perro', 'Labrador', 3, 1),
        (2, 'Michi', 'Gato', 'Persa', 2, 2)
    `);

    await connection.query(`
      REPLACE INTO usuarios (id, username, password, nombre, apellido, email, roles, cliente_id, veterinario_id)
      VALUES 
        (1, 'admin@veterinaria.com', '$2a$10$kalJSOHg.cSCPZpA6zv1W.lY3hNuhC0RXZMw6wo7NkN/Qeb9jLZBy', 'Administrador', '', 'admin@veterinaria.com', 'ADMIN', NULL, NULL),
        (2, 'carlos@veterinaria.com', '$2a$10$4cgAdkwF/r/5E1bEtg5lhu79R7pc9SpNnKpdQgkNJFkc5FL1oeKcy', 'Carlos', 'López', 'carlos@veterinaria.com', 'VETERINARIO', NULL, 1),
        (3, 'maria@veterinaria.com', '$2a$10$4cgAdkwF/r/5E1bEtg5lhu79R7pc9SpNnKpdQgkNJFkc5FL1oeKcy', 'María', 'González', 'maria@veterinaria.com', 'VETERINARIO', NULL, 2),
        (4, 'juan.perez@email.com', '$2a$10$qVYuUH34WQv7qRE8tMc9LeQaxoOQeIZz8/d5nrgl7yg6w993bXKKq', 'Juan', 'Pérez', 'juan.perez@email.com', 'CLIENTE', 1, NULL),
        (5, 'maria.garcia@email.com', '$2a$10$qVYuUH34WQv7qRE8tMc9LeQaxoOQeIZz8/d5nrgl7yg6w993bXKKq', 'María', 'García', 'maria.garcia@email.com', 'CLIENTE', 2, NULL)
    `);

    console.log('Conectado a MySQL y tablas inicializadas');
  } finally {
    connection.release();
  }
};
