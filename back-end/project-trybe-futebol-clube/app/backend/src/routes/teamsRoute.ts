import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();
const teamController = new TeamController();

// GET endpoints
router.get('/teams/', teamController.getAll);
router.get('/teams/:id', teamController.getById);

export default router;
