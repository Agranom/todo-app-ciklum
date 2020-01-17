import { AuthService } from './auth.service';
import { User } from '../user';
import { AppError } from '../shared/errors';

const authService = new AuthService(User);

export class AuthController {
  static async signup(req, res, next) {
    try {
      const newUser = await authService.signup(req.body);

      return res.status(201).json({ token: AuthService.generateToken(newUser.id) });
    } catch (e) {
      return next(e);
    }
  }

  static async signin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(400, 'Email or password is not provided'));
    }

    try {
      const user = await authService.signin(email);

      if (!user) {
        return next(new AppError(401, 'Unauthorized'));
      }
      const isPasswordValid = await user.validatePassword(password);

      if (!isPasswordValid) {
        return next(new AppError(401, 'Unauthorized'));
      }

      return res.status(200).json({ token: AuthService.generateToken(user.id) });
    } catch (e) {
      return next(e);
    }
  }

  static async validateTokenAndReturnUser(req, res, next) {
    const { token } = req.body;

    if (!token) {
      return next(new AppError(401, 'Unauthorized'));
    }

    try {
      const user = await authService.validateTokenAndReturnUser(token);

      if (!user) {
        return next(new AppError(401, 'Unauthorized'));
      }

      return res.status(200).json({ ...user.toObject() });
    } catch (e) {
      return next(e);
    }
  }
}
