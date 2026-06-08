import { historialService } from '../services/historialService.js';
import { HistorialDTO } from '../models/HistorialDTO.js';

export const historialController = {
  findAll: async (req, res, next) => {
    try {
      const historial = await historialService.findAll();
      res.json(historial);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const record = await historialService.findById(req.params.id);
      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  findByMascotaId: async (req, res, next) => {
    try {
      const historial = await historialService.findByMascotaId(req.params.mascotaId);
      res.json(historial);
    } catch (err) {
      next(err);
    }
  },

  findByClienteId: async (req, res, next) => {
    try {
      const historial = await historialService.findByClienteId(req.params.clienteId);
      res.json(historial);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { descripcion, fecha, notas, mascotaId } = req.body;
      if (!descripcion || !fecha || !mascotaId) {
        return res.status(400).json({ error: 'Descripción, fecha y mascotaId son requeridos' });
      }
      const dto = new HistorialDTO(null, mascotaId, descripcion, fecha, notas);
      const record = await historialService.create(dto);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { descripcion, fecha, notas, mascotaId } = req.body;
      const dto = new HistorialDTO(req.params.id, mascotaId, descripcion, fecha, notas);
      const record = await historialService.update(dto);
      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await historialService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
