import { User as FirebaseAuthUser } from 'firebase/auth';

// Create a custom type that extends the FirebaseAuthUser type
export interface CustomUser extends FirebaseAuthUser {
  stsTokenManager: {
    expirationTime: number;
  };
}
