import { User } from '../models/user.model';
import { generateToken } from '../utils/auth';

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
    req.user = newUser.toJSON();

    return res.status(201).json({ token: generateToken(newUser.id) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.errmsg });
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
    req.user = user;
    res.status(200).json({ token: generateToken(user.id) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.errmsg });
  }
};
