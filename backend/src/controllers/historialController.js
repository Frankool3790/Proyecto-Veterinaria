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
      const {
        fecha,
        motivoConsulta,
        peso,
        temperatura,
        diagnostico,
        tratamiento,
        medicamentos,
        observaciones,
        notasPrivadas,
        veterinarioId,
        mascotaId,
        cerrado
      } = req.body;

      if (!fecha || !motivoConsulta || !diagnostico || !mascotaId || !veterinarioId) {
        return res.status(400).json({ error: 'Fecha, motivoConsulta, diagnostico, mascotaId y veterinarioId son requeridos' });
      }

      const dto = new HistorialDTO(
        null,
        mascotaId,
        fecha,
        motivoConsulta,
        peso,
        temperatura,
        diagnostico,
        tratamiento,
        medicamentos,
        observaciones,
        notasPrivadas,
        veterinarioId,
        cerrado
      );

      const record = await historialService.create(dto);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const {
        fecha,
        motivoConsulta,
        peso,
        temperatura,
        diagnostico,
        tratamiento,
        medicamentos,
        observaciones,
        notasPrivadas,
        veterinarioId,
        mascotaId,
        cerrado
      } = req.body;

      const dto = new HistorialDTO(
        req.params.id,
        mascotaId,
        fecha,
        motivoConsulta,
        peso,
        temperatura,
        diagnostico,
        tratamiento,
        medicamentos,
        observaciones,
        notasPrivadas,
        veterinarioId,
        cerrado
      );

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
