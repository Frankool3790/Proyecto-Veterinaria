import { db } from '../config/database.js';
import { HistorialDTO } from '../models/HistorialDTO.js';
import { createError } from '../utils/helpers.js';

export const historialService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM historial_clinico', (err, rows) => {
        if (err) return reject(createError(500, 'Error en BD'));
        resolve(rows || []);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM historial_clinico WHERE id = ?',
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
        'SELECT * FROM historial_clinico WHERE mascota_id = ? ORDER BY fecha DESC',
        [mascotaId],
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
        `SELECT h.*, m.nombre as mascota_nombre 
         FROM historial_clinico h 
         JOIN mascotas m ON h.mascota_id = m.id 
         WHERE m.cliente_id = ? 
         ORDER BY h.fecha DESC`,
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
        `INSERT INTO historial_clinico 
         (fecha, motivo_consulta, peso, temperatura, diagnostico, tratamiento, medicamentos, observaciones, notas_privadas, veterinario_id, mascota_id, cerrado) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [dto.fecha, dto.motivoConsulta, dto.peso, dto.temperatura, dto.diagnostico, dto.tratamiento, dto.medicamentos, dto.observaciones, dto.notasPrivadas, dto.veterinarioId, dto.mascotaId, dto.cerrado ? 1 : 0],
        function (err) {
          if (err) return reject(createError(500, 'Error creando historial: ' + err.message));
          resolve(new HistorialDTO(
            this.lastID, 
            dto.mascotaId, 
            dto.fecha, 
            dto.motivoConsulta, 
            dto.peso, 
            dto.temperatura, 
            dto.diagnostico, 
            dto.tratamiento, 
            dto.medicamentos, 
            dto.observaciones, 
            dto.notasPrivadas, 
            dto.veterinarioId,
            dto.cerrado
          ));
        }
      );
    });
  },

  update: (dto) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE historial_clinico SET 
          fecha = ?, 
          motivo_consulta = ?, 
          peso = ?, 
          temperatura = ?, 
          diagnostico = ?, 
          tratamiento = ?, 
          medicamentos = ?, 
          observaciones = ?, 
          notas_privadas = ?, 
          veterinario_id = ?, 
          mascota_id = ?, 
          cerrado = ?
        WHERE id = ?`,
        [dto.fecha, dto.motivoConsulta, dto.peso, dto.temperatura, dto.diagnostico, dto.tratamiento, dto.medicamentos, dto.observaciones, dto.notasPrivadas, dto.veterinarioId, dto.mascotaId, dto.cerrado ? 1 : 0, dto.id],
        function (err) {
          if (err) return reject(createError(500, 'Error actualizando historial'));
          if (this.changes === 0) return reject(createError(404, 'Registro no encontrado'));
          resolve(new HistorialDTO(
            dto.id, 
            dto.mascotaId, 
            dto.fecha, 
            dto.motivoConsulta, 
            dto.peso, 
            dto.temperatura, 
            dto.diagnostico, 
            dto.tratamiento, 
            dto.medicamentos, 
            dto.observaciones, 
            dto.notasPrivadas, 
            dto.veterinarioId,
            dto.cerrado
          ));
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM historial_clinico WHERE id = ?',
        [id],
        function (err) {
          if (err) return reject(createError(500, 'Error eliminando historial'));
          if (this.changes === 0) return reject(createError(404, 'Registro no encontrado'));
          resolve();
        }
      );
    });
  }
};
