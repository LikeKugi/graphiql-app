import { auth, logout } from '@/lib/firebase';
import { User as FirebaseAuthUser, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Create a custom type that extends the FirebaseAuthUser type
interface CustomUser extends FirebaseAuthUser {
  stsTokenManager: {
    expirationTime: number;
  };
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user] = useAuthState(auth);

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
          window.location.href = '/';
        }
      }
    });
  }, [user]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
