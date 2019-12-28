import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_FEATURE_NAME } from './feature-name';

const selectFeatureModuleState = createFeatureSelector(AUTH_FEATURE_NAME);

export const isLoading = createSelector(selectFeatureModuleState, (state: AuthState) => state.loading);
