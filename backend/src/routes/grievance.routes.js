import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createGrievance, myGrievances, grievancesForAuthority, updateStatus } from '../controllers/grievance.controller.js';

const router = Router();

router.post('/', requireAuth, createGrievance);
router.get('/mine', requireAuth, myGrievances);
router.get('/authority/:key', requireAuth, grievancesForAuthority);
router.patch('/:id/status', requireAuth, updateStatus);

export default router;


