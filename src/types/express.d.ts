import * as admin from 'firebase-admin';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        role: 'admin' | 'moderator' | 'student';
      };
    }
  }
}
