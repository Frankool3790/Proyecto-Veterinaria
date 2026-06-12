import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await authService.authenticate(email, password);
      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      const { nombre, apellido, email, password } = req.body;
      const response = await authService.register({ nombre, apellido, email, password });
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
};
