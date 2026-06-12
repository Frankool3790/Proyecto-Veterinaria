import { db } from '../config/database.js';
import { comparePassword, hashPassword, createError } from '../utils/helpers.js';
import { LoginResponse } from '../models/AuthDTO.js';

export const authService = {
  authenticate: (email, password) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM usuarios WHERE username = ? OR email = ?',
        [email, email],
        async (err, user) => {
          if (err) return reject(createError(500, 'Error en BD'));
          if (!user) return reject(createError(401, 'Usuario no encontrado'));

          const isValid = await comparePassword(password, user.password);
          if (!isValid) return reject(createError(401, 'Contraseña inválida'));

          resolve({
            token: 'fake-jwt-token',
            role: user.roles,
            cliente_id: user.cliente_id,
            veterinario_id: user.veterinario_id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email
          });
        }
      );
    });
  },

  register: async (userData) => {
    const { nombre, apellido, email, password } = userData;
    const hashedPassword = await hashPassword(password);
    const username = email;

    return new Promise((resolve, reject) => {
      db.get('SELECT id FROM usuarios WHERE email = ? OR username = ?', [email, username], (err, existingUser) => {
        if (err) return reject(createError(500, 'Error al verificar usuario'));
        if (existingUser) {
          return reject(createError(400, 'El correo electrónico ya está en uso'));
        }

        db.run(
          'INSERT INTO clientes (nombre, email) VALUES (?, ?)',
          [`${nombre} ${apellido}`, email],
          function (err) {
            if (err) {
              if (err.message.includes('UNIQUE')) {
                return reject(createError(400, 'El correo electrónico ya está en uso'));
              }
              return reject(createError(500, 'Error al crear perfil de cliente'));
            }

            const clienteId = this.lastID;

            db.run(
              'INSERT INTO usuarios (username, password, nombre, apellido, email, roles, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [username, hashedPassword, nombre, apellido, email, 'CLIENTE', clienteId],
              function (errUser) {
                if (errUser) {
                  return reject(createError(500, 'Error al registrar usuario'));
                }
                resolve({ success: true, message: 'Usuario y perfil de cliente registrados exitosamente' });
              }
            );
          }
        );
      });
    });
  }
};
