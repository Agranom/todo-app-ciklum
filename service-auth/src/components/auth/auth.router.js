import passport from 'passport';
import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router
  .post('/signup', AuthController.signup)
  .post('/signin', AuthController.signin)
  .post('/api/internal/validate-token',
    passport.authenticate('basic', { session: false }), AuthController.validateTokenAndReturnUser);

export default router;
