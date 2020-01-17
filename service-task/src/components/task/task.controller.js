import { Task } from './task.model';
import { TaskService } from './task.service';
import { AppError } from '../shared/errors';

const taskService = new TaskService(Task);

export class TaskController {
  static async getTask(req, res, next) {
    try {
      const task = await taskService.getTask(req.params.id, req.user.id);

      if (!task) {
        return next(new AppError(404, 'Task is not found'));
      }

      return res.status(200).json({ ...task });
    } catch (e) {
      return next(e);
    }
  }

  static async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasksByUserId(req.user.id);

      return res.status(200).json({ items: tasks });
    } catch (e) {
      return next(e);
    }
  }

  static async createTask(req, res, next) {
    try {
      const newTask = await taskService.createTask(req.body, req.user.id);

      return res.status(201).json({ ...newTask });
    } catch (e) {
      return next(e);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.user.id, req.body);

      if (!updatedTask) {
        return next(new AppError(404, 'Task is not found'));
      }

      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  }

  static async removeTask(req, res, next) {
    try {
      const removedItem = await taskService.removeTask(req.params.id, req.user.id);

      if (!removedItem) {
        return next(new AppError(404, 'Task is not found'));
      }

      return res.status(204).end();
    } catch (e) {
      return next(e);
    }
  }
}
