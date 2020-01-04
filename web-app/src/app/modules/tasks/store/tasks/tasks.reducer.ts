import { Action, createReducer, on } from '@ngrx/store';
import { CreateTaskActions, DeleteTaskActions, LoadTasksActions, UpdateTaskActions } from './actions';
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
  }),
  on(UpdateTaskActions.updateTaskSuccess, (state, { updatedTask }) => {
    return tasksAdapter.updateOne(updatedTask, state);
  }),
  on(DeleteTaskActions.deleteTaskSuccess, (state, { id }) => {
    return tasksAdapter.removeOne(id, state);
  })
);

export function tasksReducer(state: TasksState, action: Action) {
  return reducer(state, action);
}
