import express from 'express';
import { clienteController } from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', clienteController.findAll);
router.get('/:id', clienteController.findById);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.delete);

export default router;
