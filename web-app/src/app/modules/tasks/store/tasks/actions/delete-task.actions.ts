import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../../shared/models/error-response.model';

export const deleteTask = createAction(
  '[Tasks API] Task delete',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks API] Task delete success',
  props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
  '[Tasks API] Task delete failure',
  props<{ error: ErrorResponse }>()
);
