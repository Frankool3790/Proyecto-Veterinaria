/**
 * Utilidades para gestión de la base de datos
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Obtiene la ruta de la base de datos
 * @returns {string} Ruta absoluta de veterinaria.db
 */
export const getDbPath = () => {
  return path.join(__dirname, '../../veterinaria.db');
};

/**
 * Abre una conexión a la base de datos
 * @returns {Promise<sqlite3.Database>} Promesa que resuelve con la conexión
 */
export const openDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(getDbPath(), (err) => {
      if (err) reject(err);
      else {
        db.run('PRAGMA foreign_keys = ON');
        resolve(db);
      }
    });
  });
};

/**
 * Ejecuta una consulta SELECT y devuelve todos los resultados
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @param {string} query - Consulta SQL
 * @param {Array} params - Parámetros de la consulta
 * @returns {Promise<Array>} Promesa que resuelve con los resultados
 */
export const dbAll = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

/**
 * Ejecuta una consulta SELECT y devuelve una sola fila
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @param {string} query - Consulta SQL
 * @param {Array} params - Parámetros de la consulta
 * @returns {Promise<Object|null>} Promesa que resuelve con el resultado o null
 */
export const dbGet = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

/**
 * Ejecuta una consulta INSERT, UPDATE o DELETE
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @param {string} query - Consulta SQL
 * @param {Array} params - Parámetros de la consulta
 * @returns {Promise<Object>} Promesa que resuelve con {lastID, changes}
 */
export const dbRun = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

/**
 * Ejecuta múltiples consultas en una transacción
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @param {Function} callback - Función que ejecuta las consultas
 * @returns {Promise<void>}
 */
export const dbTransaction = (db, callback) => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', async (err) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        await callback(db);
        db.run('COMMIT', (err) => {
          if (err) reject(err);
          else resolve();
        });
      } catch (error) {
        db.run('ROLLBACK', (rollbackErr) => {
          reject(error);
        });
      }
    });
  });
};

/**
 * Cierra la conexión a la base de datos
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @returns {Promise<void>}
 */
export const closeDb = (db) => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * Obtiene estadísticas de la base de datos
 * @param {sqlite3.Database} db - Conexión a la base de datos
 * @returns {Promise<Object>} Estadísticas de la base de datos
 */
export const getDbStats = async (db) => {
  const tables = [
    'usuarios',
    'clientes',
    'mascotas',
    'veterinarios',
    'citas',
    'historial_clinico'
  ];

  const stats = {};

  for (const tabla of tables) {
    const result = await dbGet(db, `SELECT COUNT(*) as count FROM ${tabla}`);
    stats[tabla] = result.count;
  }

  return stats;
};
