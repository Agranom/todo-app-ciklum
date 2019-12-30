import { ErrorResponse } from '../../../shared/models/error-response.model';
import { User } from '../../models';

export interface UserState {
  payload: User;
  loading: boolean;
  error: ErrorResponse;
}

export const userInitialState: UserState = {
  payload: null,
  loading: false,
  error: null
};
