import { Action, createReducer, on } from '@ngrx/store';
import { LoadUserActions } from './actions';
import { userInitialState, UserState } from './user.state';

const reducer = createReducer(
  userInitialState,
  on(LoadUserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    payload: user
  }))
);

export function userReducer(state: UserState, action: Action) {
  return reducer(state, action);
}
