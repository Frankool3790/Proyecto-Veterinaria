import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import mascotaRoutes from './src/routes/mascotaRoutes.js';
import veterinarioRoutes from './src/routes/veterinarioRoutes.js';
import citaRoutes from './src/routes/citaRoutes.js';
import historialRoutes from './src/routes/historialRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

initializeDatabase().catch((error) => {
  console.error('Error inicializando la base de datos:', error.message);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial', historialRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
