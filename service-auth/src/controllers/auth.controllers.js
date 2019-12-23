import { User } from '../models/user.model';
import { generateToken, verifyToken } from '../utils/auth';
import { BasicStrategy } from 'passport-http';
import passport from 'passport';

passport.use(new BasicStrategy((username, password, done) => {
  if (username === process.env.INTERNAL_USER && password === process.env.INTERNAL_PASSWORD) {
    return done(null, true);
  }
  return done({statusCode: 401});
}));

export const signup = async (req, res) => {
  const { email, password, ...rest } = req.body;

  if (!email || !password) {
    return res.status(400).end();
  }

  try {
    const newUser = await User.create({
      email,
      password,
      ...rest
    });

    res.status(201).json({ token: generateToken(newUser.id) });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.errmsg });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).end();
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).end();
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).end();
    }

    res.status(200).json({ token: generateToken(user.id) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.errmsg });
  }
};

export const validateTokenAndReturnUser = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).end();
  }

  try {
    const tokenPayload = await verifyToken(token);

    if (!tokenPayload) {
      return res.status(401).end();
    }

    const user = await User.findOne({ _id: tokenPayload.id });

    if (!user) {
      return res.status(401).end();
    }
    res.status(200).json({ ...user.toObject() });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
