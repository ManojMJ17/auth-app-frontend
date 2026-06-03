import type { User } from './User';

export default interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
