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
      const { nombre, especie, raza, edad, clienteId, cliente_id, fotoUrl, foto_url } = req.body;
      const cId = clienteId || cliente_id;
      const fUrl = fotoUrl || foto_url;

      if (!nombre || !especie || !cId) {
        return res.status(400).json({ error: 'Nombre, especie y dueño son requeridos' });
      }

      const dto = new MascotaDTO(null, nombre, especie, raza, edad, Number(cId), fUrl);
      const mascota = await mascotaService.create(dto);
      res.status(201).json(mascota);
    } catch (err) {
      console.error("Error en mascotaController.create:", err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { nombre, especie, raza, edad, clienteId, cliente_id, fotoUrl, foto_url } = req.body;
      const cId = clienteId || cliente_id;
      const fUrl = fotoUrl || foto_url;

      const dto = new MascotaDTO(req.params.id, nombre, especie, raza, edad, Number(cId), fUrl);
      const mascota = await mascotaService.update(dto);
      res.json(mascota);
    } catch (err) {
      console.error("Error en mascotaController.update:", err);
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
