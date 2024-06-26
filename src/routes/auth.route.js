import { Router } from 'express';
import { registerUser, login, logout } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);

// router.post('/login', login);

export default router;
