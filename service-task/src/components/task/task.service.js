import { AppError, mongoErrorTypes, ValidationError } from '../shared/errors';

export class TaskService {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }

  async getTask(taskId, userId) {
    try {
      const task = await this.taskModel.findOne({ _id: taskId, createdBy: userId });

      if (task) {
        return task.toObject();
      }
      return task;
    } catch (e) {
      throw new AppError(500, e.message);
    }
  }

  async getTasksByUserId(userId) {
    try {
      const tasks = await this.taskModel.find({ createdBy: userId });

      return tasks.map((task) => task.toObject());
    } catch (e) {
      throw new AppError(500, e.message);
    }
  }

  async createTask(data, userId) {
    try {
      const newTask = await this.taskModel.create({ ...data, createdBy: userId });

      return newTask.toObject();
    } catch (e) {
      if (e.name === mongoErrorTypes.validationError) {
        throw new ValidationError(e.errors);
      }
      throw new AppError(500, e.message);
    }
  }

  async updateTask(taskId, userId, data) {
    try {
      return await this.taskModel
        .findOneAndUpdate({ _id: taskId, createdBy: userId }, data, { new: true })
        .lean()
        .exec();
    } catch (e) {
      if (e.name === mongoErrorTypes.validationError) {
        throw new ValidationError(e.errors);
      }
      throw new AppError(500, e.message);
    }
  }

  async removeTask(taskId, userId) {
    try {
      return await this.taskModel
        .findOneAndRemove({ _id: taskId, createdBy: userId })
        .lean()
        .exec();
    } catch (e) {
      throw new AppError(500, e.message);
    }
  }
}
