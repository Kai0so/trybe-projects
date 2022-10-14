import { Router } from 'express';
import { tokenValidation } from '../middlewares/index';
import MatchController from '../controllers/MatchController';

const router = Router();
const matchController = new MatchController();

// GET endpoints
router.get('/matches', matchController.getAll);
// POST endpoints
router.post('/matches', tokenValidation, matchController.create);
// PATCH endpoints
router.patch('/matches/:id/finish', matchController.finish);
router.patch('/matches/:id', matchController.updateScore);

export default router;
