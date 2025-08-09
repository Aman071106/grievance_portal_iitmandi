import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { signup, signin, me, signout, changePassword } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/me', requireAuth, me);
router.post('/change-password', requireAuth, changePassword);

export default router;


