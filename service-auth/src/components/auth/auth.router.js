import passport from 'passport';
import { Router } from 'express';
import { BasicStrategy } from 'passport-http';
import { AuthController } from './auth.controller';

const router = Router();

passport.use(new BasicStrategy((username, password, done) => {
  if (username === process.env.INTERNAL_USER && password === process.env.INTERNAL_PASSWORD) {
    return done(null, true);
  }
  return done({ statusCode: 401 });
}));

router
  .post('/signup', AuthController.signup)
  .post('/signin', AuthController.signin)
  .post('/api/internal/validate-token',
    passport.authenticate('basic', { session: false }), AuthController.validateTokenAndReturnUser);

export default router;
