import { db } from '../config/database.js';
import { createError } from '../utils/helpers.js';

export const pagoService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.*, c.nombre as cliente_nombre 
        FROM pagos p 
        LEFT JOIN clientes c ON p.cliente_id = c.id 
        ORDER BY p.fecha DESC
      `;
      db.all(query, [], (err, rows) => {
        if (err) return reject(createError(500, 'Error al obtener pagos'));
        resolve(rows || []);
      });
    });
  },

  findByClienteId: (clienteId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM pagos WHERE cliente_id = ? ORDER BY fecha DESC',
        [clienteId],
        (err, rows) => {
          if (err) return reject(createError(500, 'Error al obtener pagos del cliente'));
          resolve(rows || []);
        }
      );
    });
  },

  create: (pagoData) => {
    const { cliente_id, monto, metodo_pago, descripcion } = pagoData;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO pagos (cliente_id, monto, metodo_pago, descripcion) VALUES (?, ?, ?, ?)',
        [cliente_id, monto, metodo_pago, descripcion],
        function (err) {
          if (err) return reject(createError(500, 'Error al procesar el pago'));
          resolve({ id: this.lastID, ...pagoData });
        }
      );
    });
  }
};
