import { veterinarioService } from '../services/veterinarioService.js';
import { VeterinarioDTO } from '../models/VeterinarioDTO.js';

export const veterinarioController = {
  findAll: async (req, res, next) => {
    try {
      const veterinarios = await veterinarioService.findAll();
      res.json(veterinarios);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const veterinario = await veterinarioService.findById(req.params.id);
      res.json(veterinario);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nombre, especialidad, email } = req.body;
      if (!nombre || !especialidad || !email) {
        return res.status(400).json({ error: 'Nombre, especialidad y email son requeridos' });
      }
      const dto = new VeterinarioDTO(null, nombre, especialidad, email);
      const veterinario = await veterinarioService.create(dto);
      res.status(201).json(veterinario);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { nombre, especialidad, email } = req.body;
      const dto = new VeterinarioDTO(req.params.id, nombre, especialidad, email);
      const veterinario = await veterinarioService.update(dto);
      res.json(veterinario);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await veterinarioService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
