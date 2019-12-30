import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { User } from '../../../models';

export const loadUser = createAction(
  '[User API] User load'
);

export const loadUserSuccess = createAction(
  '[User API] User load success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User API] User load failure',
  props<{ error: ErrorResponse }>()
);
