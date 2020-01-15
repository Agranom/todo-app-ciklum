import { ErrorHandler } from '../../utils/error-handler';
import { AuthService } from './auth.service';
import { User } from '../user';

const authService = new AuthService(User);

export class AuthController {
  static async signup(req, res, next) {
    const { email, password, ...rest } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler(400, 'Email or password is not valid'));
    }

    try {
      const newUser = await authService.signup({ email, password, ...rest });

      return res.status(201).json({ token: AuthService.generateToken(newUser.id) });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async signin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler(400, 'Email or password is not valid'));
    }

    try {
      const user = await authService.signin(email);

      if (!user) {
        return next(new ErrorHandler(401, 'Unauthorized'));
      }
      const isPasswordValid = await user.validatePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler(401, 'Unauthorized'));
      }

      return res.status(200).json({ token: AuthService.generateToken(user.id) });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async validateTokenAndReturnUser(req, res, next) {
    const { token } = req.body;

    if (!token) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }

    try {
      const user = await authService.validateTokenAndReturnUser(token);

      return res.status(200).json({ ...user.toObject() });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }
}
