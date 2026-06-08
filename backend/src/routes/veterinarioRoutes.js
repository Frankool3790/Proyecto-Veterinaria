import express from 'express';
import { veterinarioController } from '../controllers/veterinarioController.js';

const router = express.Router();

router.get('/', veterinarioController.findAll);
router.get('/:id', veterinarioController.findById);
router.post('/', veterinarioController.create);
router.put('/:id', veterinarioController.update);
router.delete('/:id', veterinarioController.delete);

export default router;
