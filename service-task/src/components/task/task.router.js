import { Router } from 'express';
import { TaskController } from './task.controller';

const router = Router();

// api/task
router.route('/')
  .get(TaskController.getMany)
  .post(TaskController.createOne);

// api/task/:id
router.route('/:id')
  .get(TaskController.getOne)
  .put(TaskController.updateOne)
  .delete(TaskController.removeOne);

export default router;
