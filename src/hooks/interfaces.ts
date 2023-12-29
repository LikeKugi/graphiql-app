import { User as FirebaseAuthUser } from 'firebase/auth';

export interface CustomUser extends FirebaseAuthUser {
  stsTokenManager: {
    expirationTime: number;
  };
}
