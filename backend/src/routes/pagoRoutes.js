import express from 'express';
import { pagoController } from '../controllers/pagoController.js';

const router = express.Router();

router.get('/', pagoController.getAll);
router.get('/trash', pagoController.getTrash);
router.get('/cliente/:clienteId', pagoController.getByClienteId);
router.post('/', pagoController.create);
router.put('/restore/:id', pagoController.restore);
router.delete('/soft/:id', pagoController.softDelete);
router.delete('/hard/:id', pagoController.hardDelete);

export default router;
