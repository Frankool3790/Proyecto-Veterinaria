import express from 'express';
import { citaController } from '../controllers/citaController.js';

const router = express.Router();

router.get('/', citaController.findAll);
router.get('/:id', citaController.findById);
router.get('/mascota/:mascotaId', citaController.findByMascotaId);
router.get('/veterinario/:veterinarioId', citaController.findByVeterinarioId);
router.get('/cliente/:clienteId', citaController.findByClienteId);
router.post('/', citaController.create);
router.put('/:id', citaController.update);
router.delete('/:id', citaController.delete);

export default router;
