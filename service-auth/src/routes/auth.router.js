import { validateTokenAndGetUser } from '../controllers/auth.controllers';
import passport from 'passport';
import { Router } from 'express';

const router = Router();

router
  .post('/', passport.authenticate('basic', { session: false }), validateTokenAndGetUser);

export default router;
