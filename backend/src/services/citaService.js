import { db } from '../config/database.js';
import { CitaDTO } from '../models/CitaDTO.js';
import { createError } from '../utils/helpers.js';

export const citaService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM citas', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM citas WHERE id = ?',
        [id],
        (err, row) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!row) return reject(createError(404, 'Cita no encontrada'));
          resolve(row);
        }
      );
    });
  },

  findByMascotaId: (mascotaId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM citas WHERE mascota_id = ? ORDER BY fecha DESC',
        [mascotaId],
        (err, rows) => {
          if (err) return reject(createError(500, 'Error en BD'));
          resolve(rows || []);
        }
      );
    });
  },

  findByVeterinarioId: (veterinarioId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM citas WHERE veterinario_id = ? ORDER BY fecha DESC',
        [veterinarioId],
        (err, rows) => {
          if (err) return reject(createError(500, 'Error en BD'));
          resolve(rows || []);
        }
      );
    });
  },

  findByClienteId: (clienteId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT c.*, m.nombre as mascota_nombre, v.nombre as veterinario_nombre 
         FROM citas c 
         JOIN mascotas m ON c.mascota_id = m.id 
         JOIN veterinarios v ON c.veterinario_id = v.id
         WHERE m.cliente_id = ? 
         ORDER BY c.fecha DESC, c.hora DESC`,
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
        'INSERT INTO citas (fecha, hora, motivo, estado, mascota_id, veterinario_id) VALUES (?, ?, ?, ?, ?, ?)',
        [dto.fecha, dto.hora, dto.motivo, dto.estado || 'Pendiente', dto.mascotaId, dto.veterinarioId],
        function (err) {
          if (err) return reject(createError(500, 'Error creando cita'));
          resolve(new CitaDTO(this.lastID, dto.fecha, dto.hora, dto.mascotaId, dto.veterinarioId, dto.motivo, dto.estado || 'Pendiente'));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE citas SET fecha = ?, hora = ?, motivo = ?, estado = ?, mascota_id = ?, veterinario_id = ? WHERE id = ?',
        [dto.fecha, dto.hora, dto.motivo, dto.estado, dto.mascotaId, dto.veterinarioId, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando cita'));
          if (this.changes === 0) return reject(createError(404, 'Cita no encontrada'));
          resolve(new CitaDTO(dto.id, dto.fecha, dto.hora, dto.mascotaId, dto.veterinarioId, dto.motivo, dto.estado));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM citas WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando cita'));
          if (this.changes === 0) return reject(createError(404, 'Cita no encontrada'));
          resolve();
        }
      );
    });
  }
};
