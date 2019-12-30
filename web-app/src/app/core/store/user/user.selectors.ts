import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state && state.payload);
