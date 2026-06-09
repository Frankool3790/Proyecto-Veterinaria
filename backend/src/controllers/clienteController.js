import { clienteService } from '../services/clienteService.js';
import { ClienteDTO } from '../models/ClienteDTO.js';

export const clienteController = {
  findAll: async (req, res, next) => {
    try {
      const clientes = await clienteService.findAll();
      res.json(clientes);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const cliente = await clienteService.findById(req.params.id);
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nombre, telefono, email, direccion, avatarUrl, avatar_url } = req.body;
      const aUrl = avatarUrl || avatar_url;
      if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }
      const dto = new ClienteDTO(null, nombre, telefono, email, direccion, aUrl);
      const cliente = await clienteService.create(dto);
      res.status(201).json(cliente);
    } catch (err) {
      console.error("Error en clienteController.create:", err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { nombre, telefono, email, direccion, avatarUrl, avatar_url } = req.body;
      const aUrl = avatarUrl || avatar_url;
      const dto = new ClienteDTO(req.params.id, nombre, telefono, email, direccion, aUrl);
      const cliente = await clienteService.update(dto);
      res.json(cliente);
    } catch (err) {
      console.error("Error en clienteController.update:", err);
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await clienteService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
