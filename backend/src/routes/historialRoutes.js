import express from 'express';
import { historialController } from '../controllers/historialController.js';

const router = express.Router();

router.get('/', historialController.findAll);
router.get('/:id', historialController.findById);
router.get('/mascota/:mascotaId', historialController.findByMascotaId);
router.get('/cliente/:clienteId', historialController.findByClienteId);
router.post('/', historialController.create);
router.put('/:id', historialController.update);
router.delete('/:id', historialController.delete);

export default router;
