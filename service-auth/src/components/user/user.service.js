import { AppError } from '../shared/errors';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      throw new AppError(401, 'Unauthorized');
    }
  }
}
