import passport from 'passport';
import { Router } from 'express';
import { validateTokenAndReturnUser } from '../controllers/auth.controllers';

const router = Router();

router
  .post('/', passport.authenticate('basic', { session: false }), validateTokenAndReturnUser);

export default router;
