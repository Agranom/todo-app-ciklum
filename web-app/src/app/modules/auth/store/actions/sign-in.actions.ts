import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { UserToken } from '../../models';

export const signIn = createAction(
  '[Auth API] Sign In',
  props<{ email: string, password: string }>()
);

export const signInSuccess = createAction(
  '[Auth API] Sign In success',
  props<{ token: UserToken }>()
);

export const signInFailure = createAction(
  '[Auth API] Sign In failure',
  props<{ error: ErrorResponse }>()
);
