import { useEffect } from 'react';
import { RouterConstants } from '@/constants/routes';
import { auth, logout } from '@/lib/firebase';
import { User as FirebaseAuthUser, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useLogout() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // Create a custom type that extends the FirebaseAuthUser type
  interface CustomUser extends FirebaseAuthUser {
    stsTokenManager: {
      expirationTime: number;
    };
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { stsTokenManager } = user as CustomUser;
        const { expirationTime } = stsTokenManager;
        const now = Date.now();
        const timeToExpire = expirationTime - now;

        console.log(timeToExpire);

        if (timeToExpire < 0) {
          // Automatically logout and redirect user
          logout();
          navigate(`${RouterConstants.INDEX}`);
        }
      }
    });
  }, [user, navigate]);
}
