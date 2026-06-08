import { authService } from '../services/authService.js';
import { LoginRequest } from '../models/AuthDTO.js';

export const authController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const loginRequest = new LoginRequest(username, password);
      const response = await authService.authenticate(loginRequest.username, loginRequest.password);
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
