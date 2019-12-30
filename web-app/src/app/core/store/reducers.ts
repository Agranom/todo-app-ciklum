import { ActionReducerMap } from '@ngrx/store';
import { State } from './state';
import { userReducer } from './user';

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};
