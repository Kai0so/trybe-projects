import { Router } from 'express';
import LearderBoardController from '../controllers/LeaderBoardController';

const router = Router();

// GET endpoints
router.get('/leaderboard/home', LearderBoardController.getHome);
router.get('/leaderboard/away', LearderBoardController.getAway);
router.get('/leaderboard', LearderBoardController.getAll);

export default router;
