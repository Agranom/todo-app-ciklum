import { ActionReducerMap } from '@ngrx/store';
import { State } from './state';
import { tasksReducer } from './tasks';

export const reducers: ActionReducerMap<State> = {
  tasks: tasksReducer
};
