import { User } from '@src/models/User';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'email'>;
    }
  }
}