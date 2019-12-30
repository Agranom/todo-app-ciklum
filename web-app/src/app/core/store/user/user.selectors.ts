import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../state';
import { UserState } from './user.state';

const selectFeatureState = createFeatureSelector('app');

export const selectUserState = createSelector(selectFeatureState, (state: State) => state.user);

export const selectUser = createSelector(selectUserState, (state: UserState) => state.payload);
