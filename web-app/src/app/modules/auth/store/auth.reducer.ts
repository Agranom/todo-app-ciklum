import { Action, createReducer, on } from '@ngrx/store';
import { SignInActions, SignUpActions } from './actions';
import { authInitialState, AuthState } from './auth.state';

const reducer = createReducer(
  authInitialState,
  on(
    SignUpActions.signUp,
    SignInActions.signIn,
    (state) => ({ ...state, loading: true })),
  on(
    SignUpActions.signUpSuccess,
    SignUpActions.signUpFailure,
    SignInActions.signInSuccess,
    SignInActions.signInFailure,
    (state) => ({ ...state, loading: false })
  )
);

export function authReducer(state: AuthState, action: Action) {
  return reducer(state, action);
}
