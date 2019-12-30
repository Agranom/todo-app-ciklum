import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { NewUser, UserToken } from '../../models';

export const signUp = createAction(
  '[Auth API] Sign Up',
  props<{ newUser: NewUser }>()
);

export const signUpSuccess = createAction(
  '[Auth API] Sign Up success',
  props<{ token: UserToken }>()
);

export const signUpFailure = createAction(
  '[Auth API] Sign Up failure',
  props<{ error: ErrorResponse }>()
);
