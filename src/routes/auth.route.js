import { Router } from 'express';
import {
  registerUser,
  login,
  logout,
  profile,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

// router.post('/login', login);

export default router;
