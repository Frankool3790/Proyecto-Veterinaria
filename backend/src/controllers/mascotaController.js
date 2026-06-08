import { mascotaService } from '../services/mascotaService.js';
import { MascotaDTO } from '../models/MascotaDTO.js';

export const mascotaController = {
  findAll: async (req, res, next) => {
    try {
      const mascotas = await mascotaService.findAll();
      res.json(mascotas);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const mascota = await mascotaService.findById(req.params.id);
      res.json(mascota);
    } catch (err) {
      next(err);
    }
  },

  findByClienteId: async (req, res, next) => {
    try {
      const mascotas = await mascotaService.findByClienteId(req.params.clienteId);
      res.json(mascotas);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nombre, especie, raza, edad, clienteId } = req.body;
      if (!nombre || !especie || !clienteId) {
        return res.status(400).json({ error: 'Nombre, especie y clienteId son requeridos' });
      }
      const dto = new MascotaDTO(null, nombre, especie, raza, edad, clienteId);
      const mascota = await mascotaService.create(dto);
      res.status(201).json(mascota);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { nombre, especie, raza, edad, clienteId } = req.body;
      const dto = new MascotaDTO(req.params.id, nombre, especie, raza, edad, clienteId);
      const mascota = await mascotaService.update(dto);
      res.json(mascota);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await mascotaService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
