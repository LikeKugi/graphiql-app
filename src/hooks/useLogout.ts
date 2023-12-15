import { useEffect } from 'react';
import { RouterConstants } from '@/constants/routes';
import { auth, logout } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CustomUser } from './interfaces';

export function useLogout() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { stsTokenManager } = user as CustomUser;
        const { expirationTime } = stsTokenManager;
        const now = Date.now();
        const timeToExpire = expirationTime - now;

        if (timeToExpire < 0) {
          // Automatically logout and redirect user
          logout();
          navigate(`${RouterConstants.INDEX}`);
        }
      }
    });
  }, [user, navigate]);
}
