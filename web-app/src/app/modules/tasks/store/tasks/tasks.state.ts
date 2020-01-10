import { EntityState } from '@ngrx/entity';
import { Task } from '../../models';
import { tasksAdapter } from './tasks.adapter';

export interface TasksState extends EntityState<Task> {
  loading: boolean;
}

export const tasksInitialState: TasksState = tasksAdapter.getInitialState({
  loading: false
});
