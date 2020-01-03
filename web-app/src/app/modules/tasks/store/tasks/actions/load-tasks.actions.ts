import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../../shared/models/error-response.model';
import { Task } from '../../../models';

export const loadTasks = createAction(
  '[Tasks API] Tasks load'
);

export const loadTasksSuccess = createAction(
  '[Tasks API] Tasks load success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks API] Tasks load failure',
  props<{ error: ErrorResponse }>()
);
