import { Router } from 'express';
import UserController from '../controllers/UserController';
import { loginValidation, auth } from '../middlewares/index';

const router = Router();
const userControler = new UserController();

// GET endpoints
router.get('/login/validate', auth);
// POST endpoints
router.post('/login', loginValidation, userControler.login);

export default router;
