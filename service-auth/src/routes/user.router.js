import { Router } from 'express';
import passport from 'passport';
import { getProfile } from '../controllers/user.controllers';

const router = Router();

// /api/me
router.get('/', passport.authenticate('jwt', { session: false }), getProfile);

export default router;
