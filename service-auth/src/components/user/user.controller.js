import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import config from '../../config';
import { UserService } from './user.service';
import { User } from './user.model';

const userService = new UserService(User);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secrets.jwt,
};

passport.use(new JwtStrategy(jwtOpts, async (jwtPayload, done) => {
  try {
    const user = await userService.getUserById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));

export class UserController {
  static getProfile(req, res) {
    res.status(200).json({
      ...req.user.toObject(),
    });
  }
}
