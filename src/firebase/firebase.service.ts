import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as serviceAccount from '../firebase/firebase-adminsdk.json';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async assignRole(uid: string, role: 'student' | 'admin' | 'moderator') {
    await admin.auth().setCustomUserClaims(uid, { role });
  }

  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}
