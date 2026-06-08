import express from 'express';
import { mascotaController } from '../controllers/mascotaController.js';

const router = express.Router();

router.get('/', mascotaController.findAll);
router.get('/:id', mascotaController.findById);
router.get('/cliente/:clienteId', mascotaController.findByClienteId);
router.post('/', mascotaController.create);
router.put('/:id', mascotaController.update);
router.delete('/:id', mascotaController.delete);

export default router;
