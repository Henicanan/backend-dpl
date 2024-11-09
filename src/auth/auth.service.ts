import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async registerWithGoogle(token: string) {
    const decodedToken = await this.firebaseService.verifyIdToken(token);
    const uid = decodedToken.uid;

    await this.firebaseService.assignRole(uid, 'student');

    return decodedToken;
  }

  async registerWithEmailAndPassword(
    email: string,
    password: string,
    role: 'admin' | 'moderator',
  ) {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await this.firebaseService.assignRole(userRecord.uid, role);

    return userRecord;
  }

  async loginWithEmailAndPassword(email: string) {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;

      //get roles
      const userClaims = await admin.auth().getUser(uid);
      const role = userClaims.customClaims?.role;

      if (role === 'admin' || role === 'moderator') {
        const customToken = await admin.auth().createCustomToken(uid);

        return {
          message: 'Login successful',
          customToken,
          role,
        };
      } else {
        throw new Error('Access denied');
      }
    } catch (err) {
      throw new Error('Invalid email or password');
    }
  }
}
