import { UserAvatar } from './user-avatar.interface';

export interface NewUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: UserAvatar;
}
