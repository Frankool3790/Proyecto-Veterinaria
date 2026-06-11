import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import mascotaRoutes from './src/routes/mascotaRoutes.js';
import veterinarioRoutes from './src/routes/veterinarioRoutes.js';
import citaRoutes from './src/routes/citaRoutes.js';
import historialRoutes from './src/routes/historialRoutes.js';
import pagoRoutes from './src/routes/pagoRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import vacunaRoutes from './src/routes/vacunaRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/pagos', pagoRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/vacunas', vacunaRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
