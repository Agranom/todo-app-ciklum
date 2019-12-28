import { UserToken } from '../models';

export interface AuthState {
  payload: UserToken;
  loading: boolean;
  error: any;
}

export const authInitialState: AuthState = {
  payload: null,
  loading: false,
  error: null
};
