import { Router } from 'express';
import passport from 'passport';
import { UserController } from './user.controller';

const router = Router();

// /api/me
router.get('/', passport.authenticate('jwt', { session: false }), UserController.getProfile);

export default router;
