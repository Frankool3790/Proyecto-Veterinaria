import express from 'express';
import { vacunaController } from '../controllers/vacunaController.js';

const router = express.Router();

router.get('/', vacunaController.findAll);
router.get('/:id', vacunaController.findById);
router.get('/mascota/:mascotaId', vacunaController.findByMascotaId);
router.post('/', vacunaController.create);
router.put('/:id', vacunaController.update);
router.delete('/:id', vacunaController.delete);

export default router;
