import express from 'express';
import { pagoController } from '../controllers/pagoController.js';

const router = express.Router();

router.get('/', pagoController.getAll);
router.get('/cliente/:clienteId', pagoController.getByClienteId);
router.post('/', pagoController.create);

export default router;
