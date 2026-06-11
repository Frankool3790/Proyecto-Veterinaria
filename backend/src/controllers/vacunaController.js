import { vacunaService } from '../services/vacunaService.js';
import { VacunaDTO } from '../models/VacunaDTO.js';

export const vacunaController = {
  findAll: async (req, res, next) => {
    try {
      const vacunas = await vacunaService.findAll();
      res.json(vacunas);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const vacuna = await vacunaService.findById(req.params.id);
      res.json(vacuna);
    } catch (err) {
      next(err);
    }
  },

  findByMascotaId: async (req, res, next) => {
    try {
      const vacunas = await vacunaService.findByMascotaId(req.params.mascotaId);
      res.json(vacunas);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const {
        nombreVacuna,
        fechaAplicacion,
        fechaProximaDosis,
        veterinarioId,
        mascotaId,
        notas
      } = req.body;

      if (!nombreVacuna || !fechaAplicacion || !mascotaId || !veterinarioId) {
        return res.status(400).json({ error: 'nombreVacuna, fechaAplicacion, mascotaId y veterinarioId son requeridos' });
      }

      const dto = new VacunaDTO(
        null,
        nombreVacuna,
        fechaAplicacion,
        fechaProximaDosis,
        veterinarioId,
        mascotaId,
        notas
      );

      const record = await vacunaService.create(dto);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const {
        nombreVacuna,
        fechaAplicacion,
        fechaProximaDosis,
        veterinarioId,
        mascotaId,
        notas
      } = req.body;

      const dto = new VacunaDTO(
        req.params.id,
        nombreVacuna,
        fechaAplicacion,
        fechaProximaDosis,
        veterinarioId,
        mascotaId,
        notas
      );

      const record = await vacunaService.update(dto);
      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await vacunaService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
