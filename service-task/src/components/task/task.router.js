import { Router } from 'express';
import { TaskController } from './task.controller';

const router = Router();

// api/task
router.route('/')
  .get(TaskController.getTasks)
  .post(TaskController.createTask);

// api/task/:id
router.route('/:id')
  .get(TaskController.getTask)
  .put(TaskController.updateTask)
  .delete(TaskController.removeTask);

export default router;
