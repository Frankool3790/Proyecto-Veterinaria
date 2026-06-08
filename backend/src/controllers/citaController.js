import { citaService } from '../services/citaService.js';
import { CitaDTO } from '../models/CitaDTO.js';

export const citaController = {
  findAll: async (req, res, next) => {
    try {
      const citas = await citaService.findAll();
      res.json(citas);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const cita = await citaService.findById(req.params.id);
      res.json(cita);
    } catch (err) {
      next(err);
    }
  },

  findByMascotaId: async (req, res, next) => {
    try {
      const citas = await citaService.findByMascotaId(req.params.mascotaId);
      res.json(citas);
    } catch (err) {
      next(err);
    }
  },

  findByVeterinarioId: async (req, res, next) => {
    try {
      const citas = await citaService.findByVeterinarioId(req.params.veterinarioId);
      res.json(citas);
    } catch (err) {
      next(err);
    }
  },

  findByClienteId: async (req, res, next) => {
    try {
      const citas = await citaService.findByClienteId(req.params.clienteId);
      res.json(citas);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { fecha, hora, motivo, estado, mascotaId, veterinarioId } = req.body;
      if (!fecha || !hora || !mascotaId || !veterinarioId) {
        return res.status(400).json({ error: 'Fecha, hora, mascotaId y veterinarioId son requeridos' });
      }
      const dto = new CitaDTO(null, fecha, hora, mascotaId, veterinarioId, motivo, estado || 'Pendiente');
      const cita = await citaService.create(dto);
      res.status(201).json(cita);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { fecha, hora, motivo, estado, mascotaId, veterinarioId } = req.body;
      const dto = new CitaDTO(req.params.id, fecha, hora, mascotaId, veterinarioId, motivo, estado);
      const cita = await citaService.update(dto);
      res.json(cita);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await citaService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
