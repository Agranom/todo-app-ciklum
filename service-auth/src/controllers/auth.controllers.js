import { BasicStrategy } from 'passport-http';
import passport from 'passport';
import User from '../models/user.model';
import { generateToken, verifyToken } from '../utils/auth';
import { ErrorHandler } from '../utils/error-handler';

passport.use(new BasicStrategy((username, password, done) => {
  if (username === process.env.INTERNAL_USER && password === process.env.INTERNAL_PASSWORD) {
    return done(null, true);
  }
  return done({ statusCode: 401 });
}));

export const signup = async (req, res, next) => {
  const { email, password, ...rest } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, 'Email or password is not valid'));
  }

  try {
    const newUser = await User.create({
      email,
      password,
      ...rest,
    });

    return res.status(201).json({ token: generateToken(newUser.id) });
  } catch (e) {
    console.error(e);
    if (e.name === 'MongoError' && e.code === 11000) {
      return next(new ErrorHandler(400, 'User with this email already exists'));
    }
    return next(new ErrorHandler());
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, 'Email or password is not valid'));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }

    return res.status(200).json({ token: generateToken(user.id) });
  } catch (e) {
    console.error(e);
    return next(new ErrorHandler());
  }
};

export const validateTokenAndReturnUser = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new ErrorHandler(401, 'Unauthorized'));
  }

  try {
    const tokenPayload = await verifyToken(token);
    const user = await User.findOne({ _id: tokenPayload.id });

    return res.status(200).json({ ...user.toObject() });
  } catch (e) {
    console.error(e);
    return next(new ErrorHandler(401, 'Unauthorized'));
  }
};
