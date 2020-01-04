import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../../shared/models/error-response.model';
import { Task } from '../../../models';

export const createTask = createAction(
  '[Tasks API] Task create',
  props<{task: Partial<Task>}>()
);

export const createTaskSuccess = createAction(
  '[Tasks API] Task create success',
  props<{newTask: Task}>()
);

export const createTaskFailure = createAction(
  '[Tasks API] Task create failure',
  props<{error: ErrorResponse}>()
);
