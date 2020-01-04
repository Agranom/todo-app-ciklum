import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../../shared/models/error-response.model';
import { Task } from '../../../models';

export const updateTask = createAction(
  '[Tasks API] Task update',
  props<{id: string, task: Partial<Task>}>()
);

export const updateTaskSuccess = createAction(
  '[Tasks API] Task update success',
  props<{updatedTask: Update<Task>}>()
);

export const updateTaskFailure = createAction(
  '[Tasks API] Task update failure',
  props<{error: ErrorResponse}>()
);
