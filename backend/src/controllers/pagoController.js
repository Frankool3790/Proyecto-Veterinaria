import { pagoService } from '../services/pagoService.js';

export const pagoController = {
  getAll: async (req, res, next) => {
    try {
      const pagos = await pagoService.findAll();
      res.json(pagos);
    } catch (err) {
      next(err);
    }
  },

  getTrash: async (req, res, next) => {
    try {
      const pagos = await pagoService.findTrash();
      res.json(pagos);
    } catch (err) {
      next(err);
    }
  },

  softDelete: async (req, res, next) => {
    try {
      await pagoService.softDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  restore: async (req, res, next) => {
    try {
      await pagoService.restore(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  hardDelete: async (req, res, next) => {
    try {
      await pagoService.hardDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  getByClienteId: async (req, res, next) => {
    try {
      const pagos = await pagoService.findByClienteId(req.params.clienteId);
      res.json(pagos);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const pago = await pagoService.create(req.body);
      res.status(201).json(pago);
    } catch (err) {
      next(err);
    }
  }
};
