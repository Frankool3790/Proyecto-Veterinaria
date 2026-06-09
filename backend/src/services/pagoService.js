import { db } from '../config/database.js';
import { createError } from '../utils/helpers.js';

export const pagoService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.*, c.nombre as cliente_nombre 
        FROM pagos p 
        LEFT JOIN clientes c ON p.cliente_id = c.id 
        WHERE p.is_deleted = 0
        ORDER BY p.fecha DESC
      `;
      db.all(query, [], (err, rows) => {
        if (err) return reject(createError(500, 'Error al obtener pagos'));
        resolve(rows || []);
      });
    });
  },

  findTrash: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.*, c.nombre as cliente_nombre 
        FROM pagos p 
        LEFT JOIN clientes c ON p.cliente_id = c.id 
        WHERE p.is_deleted = 1
        ORDER BY p.fecha DESC
      `;
      db.all(query, [], (err, rows) => {
        if (err) return reject(createError(500, 'Error al obtener pagos eliminados'));
        resolve(rows || []);
      });
    });
  },

  softDelete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE pagos SET is_deleted = 1 WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error al eliminar pago'));
          resolve();
        }
      );
    });
  },

  restore: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE pagos SET is_deleted = 0 WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error al restaurar pago'));
          resolve();
        }
      );
    });
  },

  hardDelete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM pagos WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error al eliminar permanentemente el pago'));
          resolve();
        }
      );
    });
  },

  findByClienteId: (clienteId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM pagos WHERE cliente_id = ? AND is_deleted = 0 ORDER BY fecha DESC',
        [clienteId],
        (err, rows) => {
          if (err) return reject(createError(500, 'Error al obtener pagos del cliente'));
          resolve(rows || []);
        }
      );
    });
  },

  create: (pagoData) => {
    const { cliente_id, monto, metodo_pago, descripcion, estado } = pagoData;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO pagos (cliente_id, monto, metodo_pago, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
        [cliente_id, monto, metodo_pago, descripcion, estado || 'Completado'],
        function (err) {
          if (err) return reject(createError(500, 'Error al procesar el pago'));
          resolve({ id: this.lastID, ...pagoData });
        }
      );
    });
  }
};
