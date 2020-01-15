import { ErrorHandler } from '../../utils/error-handler';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      throw new ErrorHandler(401, 'Unauthorized');
    }
  }
}
