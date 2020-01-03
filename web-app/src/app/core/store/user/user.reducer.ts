import { Action, createReducer, on } from '@ngrx/store';
import { ClearUserActions, LoadUserActions } from './actions';
import { userInitialState, UserState } from './user.state';

const reducer = createReducer(
  userInitialState,
  on(LoadUserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    payload: { ...user }
  })),
  on(ClearUserActions.clearUser, () => ({ ...userInitialState }))
);

export function userReducer(state: UserState, action: Action) {
  return reducer(state, action);
}
