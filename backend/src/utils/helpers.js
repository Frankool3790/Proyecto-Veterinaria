import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
