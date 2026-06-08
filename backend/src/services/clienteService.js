import { db } from '../config/database.js';
import { ClienteDTO } from '../models/ClienteDTO.js';
import { createError } from '../utils/helpers.js';

export const clienteService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM clientes', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM clientes WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!row) return reject(createError(404, 'Cliente no encontrado'));
          resolve(row);
        }
      );
    });
  },

  create: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO clientes (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)',
        [dto.nombre, dto.telefono, dto.email, dto.direccion],
        function (err) {
          if (err) return reject(createError(500, 'Error creando cliente'));
          resolve(new ClienteDTO(this.lastID, dto.nombre, dto.telefono, dto.email, dto.direccion));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE clientes SET nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
        [dto.nombre, dto.telefono, dto.email, dto.direccion, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando cliente'));
          if (this.changes === 0) return reject(createError(404, 'Cliente no encontrado'));
          resolve(new ClienteDTO(dto.id, dto.nombre, dto.telefono, dto.email, dto.direccion));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM clientes WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando cliente'));
          if (this.changes === 0) return reject(createError(404, 'Cliente no encontrado'));
          resolve();
        }
      );
    });
  }
};
