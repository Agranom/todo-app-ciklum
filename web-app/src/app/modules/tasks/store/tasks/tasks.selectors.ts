import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TASKS_FEATURE_NAME } from '../feature-name';
import { State } from '../state';
import { tasksAdapter } from './tasks.adapter';
import { TasksState } from './tasks.state';

const selectFeatureState = createFeatureSelector(TASKS_FEATURE_NAME);

const { selectAll } = tasksAdapter.getSelectors();

export const selectTasksState = createSelector(selectFeatureState, (state: State) => state.tasks);

export const selectTasks = createSelector(selectTasksState, selectAll);

export const isLoading = createSelector(selectTasksState, (state: TasksState) => state.loading);
