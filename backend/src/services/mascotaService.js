import { db } from '../config/database.js';
import { MascotaDTO } from '../models/MascotaDTO.js';
import { createError } from '../utils/helpers.js';

export const mascotaService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mascotas', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM mascotas WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!row) return reject(createError(404, 'Mascota no encontrada'));
          resolve(row);
        }
      );
    });
  },

  findByClienteId: (clienteId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM mascotas WHERE cliente_id = ?',
        [clienteId],
        (err, rows) => {
          if (err) return reject(createError(500, 'Error en BD'));
          resolve(rows || []);
        }
      );
    });
  },

  create: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO mascotas (nombre, especie, raza, edad, cliente_id) VALUES (?, ?, ?, ?, ?)',
        [dto.nombre, dto.especie, dto.raza, dto.edad, dto.clienteId],
        function (err) {
          if (err) return reject(createError(500, 'Error creando mascota'));
          resolve(new MascotaDTO(this.lastID, dto.nombre, dto.especie, dto.raza, dto.edad, dto.clienteId));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, edad = ?, cliente_id = ? WHERE id = ?',
        [dto.nombre, dto.especie, dto.raza, dto.edad, dto.clienteId, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando mascota'));
          if (this.changes === 0) return reject(createError(404, 'Mascota no encontrada'));
          resolve(new MascotaDTO(dto.id, dto.nombre, dto.especie, dto.raza, dto.edad, dto.clienteId));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM mascotas WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando mascota'));
          if (this.changes === 0) return reject(createError(404, 'Mascota no encontrada'));
          resolve();
        }
      );
    });
  }
};
