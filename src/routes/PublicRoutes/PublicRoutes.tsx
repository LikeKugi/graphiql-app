import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

const PublicRoutes = (): JSX.Element => {
  const [user] = useAuthState(auth);

  if (user && !user.isAnonymous) {
    return <Navigate to={RouterConstants.MAIN} />;
  }

  return <Outlet />;
};
export default PublicRoutes;
