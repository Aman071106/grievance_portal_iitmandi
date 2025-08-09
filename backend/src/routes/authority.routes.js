import { Router } from 'express';
import { requireAuth, requireSecretaryOrAdmin, requireGeneral, requireGeneralOrCult } from '../middleware/auth.js';
import { listAuthorities, createAuthority, deleteAuthority, listSecretaryUsers, addSecretaryUser, removeSecretaryUser } from '../controllers/authority.controller.js';

const router = Router();

router.get('/', listAuthorities);

export default router;

