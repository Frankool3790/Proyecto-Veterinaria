import { db } from '../config/database.js';
import { VeterinarioDTO } from '../models/VeterinarioDTO.js';
import { createError } from '../utils/helpers.js';

export const veterinarioService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM veterinarios', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM veterinarios WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!row) return reject(createError(404, 'Veterinario no encontrado'));
          resolve(row);
        }
      );
    });
  },

  create: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO veterinarios (nombre, especialidad, email) VALUES (?, ?, ?)',
        [dto.nombre, dto.especialidad, dto.email],
        function (err) {
          if (err) return reject(createError(500, 'Error creando veterinario'));
          resolve(new VeterinarioDTO(this.lastID, dto.nombre, dto.especialidad, dto.email));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE veterinarios SET nombre = ?, especialidad = ?, email = ? WHERE id = ?',
        [dto.nombre, dto.especialidad, dto.email, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando veterinario'));
          if (this.changes === 0) return reject(createError(404, 'Veterinario no encontrado'));
          resolve(new VeterinarioDTO(dto.id, dto.nombre, dto.especialidad, dto.email));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM veterinarios WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando veterinario'));
          if (this.changes === 0) return reject(createError(404, 'Veterinario no encontrado'));
          resolve();
        }
      );
    });
  }
};
