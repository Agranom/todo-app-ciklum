import { Action, createReducer, on } from '@ngrx/store';
import { CreateTaskActions, LoadTasksActions } from './actions';
import { tasksAdapter } from './tasks.adapter';
import { tasksInitialState, TasksState } from './tasks.state';

const reducer = createReducer(
  tasksInitialState,
  on(LoadTasksActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(LoadTasksActions.loadTasksSuccess, (state, { tasks }) => {
    return tasksAdapter.addAll(tasks, { ...state, loading: false });
  }),
  on(CreateTaskActions.createTaskSuccess, (state, { newTask }) => {
    return tasksAdapter.addOne(newTask, state);
  })
);

export function tasksReducer(state: TasksState, action: Action) {
  return reducer(state, action);
}
