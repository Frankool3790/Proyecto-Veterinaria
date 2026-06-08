import { createError } from '../utils/helpers.js';

export const validateClienteCreate = (req, res, next) => {
  const { nombre, email, telefono, direccion } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre es requerido y debe ser texto' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  if (telefono && !/^[\d\s\-\+\(\)]+$/.test(telefono)) {
    return res.status(400).json({ error: 'Teléfono inválido' });
  }

  next();
};

export const validateMascotaCreate = (req, res, next) => {
  const { nombre, especie, clienteId } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  if (!especie || typeof especie !== 'string' || especie.trim().length === 0) {
    return res.status(400).json({ error: 'La especie es requerida' });
  }

  if (!clienteId || isNaN(clienteId)) {
    return res.status(400).json({ error: 'ClienteId es requerido y debe ser un número' });
  }

  next();
};

export const validateVeterinarioCreate = (req, res, next) => {
  const { nombre, especialidad, email } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  if (!especialidad || typeof especialidad !== 'string' || especialidad.trim().length === 0) {
    return res.status(400).json({ error: 'La especialidad es requerida' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  next();
};

export const validateCitaCreate = (req, res, next) => {
  const { fecha, hora, mascotaId, veterinarioId, motivo } = req.body;

  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return res.status(400).json({ error: 'Fecha inválida (formato: YYYY-MM-DD)' });
  }

  if (!hora || !/^\d{2}:\d{2}$/.test(hora)) {
    return res.status(400).json({ error: 'Hora inválida (formato: HH:MM)' });
  }

  if (!mascotaId || isNaN(mascotaId)) {
    return res.status(400).json({ error: 'MascotaId es requerido y debe ser un número' });
  }

  if (!veterinarioId || isNaN(veterinarioId)) {
    return res.status(400).json({ error: 'VeterinarioId es requerido y debe ser un número' });
  }

  next();
};

export const validateHistorialCreate = (req, res, next) => {
  const { descripcion, fecha, mascotaId } = req.body;

  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length === 0) {
    return res.status(400).json({ error: 'La descripción es requerida' });
  }

  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return res.status(400).json({ error: 'Fecha inválida (formato: YYYY-MM-DD)' });
  }

  if (!mascotaId || isNaN(mascotaId)) {
    return res.status(400).json({ error: 'MascotaId es requerido y debe ser un número' });
  }

  next();
};
