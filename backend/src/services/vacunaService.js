import { db } from '../config/database.js';
import { VacunaDTO } from '../models/VacunaDTO.js';
import { createError } from '../utils/helpers.js';

export const vacunaService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM vacunas ORDER BY fecha_aplicacion DESC', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM vacunas WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!row) return reject(createError(404, 'Registro no encontrado'));
          resolve(row);
        }
      );
    });
  },

  findByMascotaId: (mascotaId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM vacunas WHERE mascota_id = ? ORDER BY fecha_aplicacion DESC',
        [mascotaId],
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
        `INSERT INTO vacunas (nombre_vacuna, fecha_aplicacion, fecha_proxima_dosis, veterinario_id, mascota_id, notas) VALUES (?, ?, ?, ?, ?, ?)`,
        [dto.nombreVacuna, dto.fechaAplicacion, dto.fechaProximaDosis, dto.veterinarioId, dto.mascotaId, dto.notas],
        function (err) {
          if (err) return reject(createError(500, 'Error creando vacuna'));
          resolve(new VacunaDTO(
            this.lastID,
            dto.nombreVacuna,
            dto.fechaAplicacion,
            dto.fechaProximaDosis,
            dto.veterinarioId,
            dto.mascotaId,
            dto.notas
          ));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE vacunas SET 
         nombre_vacuna = ?, 
         fecha_aplicacion = ?, 
         fecha_proxima_dosis = ?, 
         veterinario_id = ?, 
         mascota_id = ?, 
         notas = ? 
        WHERE id = ?`,
        [dto.nombreVacuna, dto.fechaAplicacion, dto.fechaProximaDosis, dto.veterinarioId, dto.mascotaId, dto.notas, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando vacuna'));
          if (this.changes === 0) return reject(createError(404, 'Registro no encontrado'));
          resolve(new VacunaDTO(
            dto.id,
            dto.nombreVacuna,
            dto.fechaAplicacion,
            dto.fechaProximaDosis,
            dto.veterinarioId,
            dto.mascotaId,
            dto.notas
          ));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM vacunas WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando vacuna'));
          if (this.changes === 0) return reject(createError(404, 'Registro no encontrado'));
          resolve();
        }
      );
    });
  }
};
