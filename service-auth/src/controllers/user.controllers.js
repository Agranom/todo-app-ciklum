import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import config from '../config';
import User from '../models/user.model';

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secrets.jwt,
};

passport.use(new JwtStrategy(jwtOpts, async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ _id: jwtPayload.id });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    console.error(e);
    return done(e, false);
  }
}));

const getProfile = (req, res) => res.status(200).json({ ...req.user.toObject() });

export default getProfile;
