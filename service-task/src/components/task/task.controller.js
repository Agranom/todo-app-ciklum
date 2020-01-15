import { Task } from './task.model';
import { TaskService } from './task.service';

const taskService = new TaskService(Task);

export class TaskController {
  static async getTask(req, res) {
    try {
      const task = await taskService.getTask(req.params.id, req.user.id);

      if (!task) {
        return res.status(404).end();
      }

      return res.status(200).json({ ...task });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }

  static async getTasks(req, res) {
    try {
      const tasks = await taskService.getTasksByUserId(req.user.id);

      return res.status(200).json({ items: tasks });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }

  static async createTask(req, res) {
    try {
      const newTask = await taskService.createTask(req.body, req.user.id);

      return res.status(201).json({ ...newTask });
    } catch (e) {
      console.error(e);
      return res.status(400).end();
    }
  }

  static async updateTask(req, res) {
    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.user.id, req.body);

      if (!updatedTask) {
        return res.status(404).end();
      }

      return res.status(204).end();
    } catch (e) {
      console.error(e);
      return res.status(400).end();
    }
  }

  static async removeTask(req, res) {
    try {
      const removedItem = await taskService.removeTask(req.params.id, req.user.id);

      if (!removedItem) {
        return res.status(404).end();
      }

      return res.status(204).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
}
