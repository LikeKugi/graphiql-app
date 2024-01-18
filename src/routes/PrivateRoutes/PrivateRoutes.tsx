import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

const PrivateRoutes = (): JSX.Element => {
  const [user] = useAuthState(auth);

  if (!user || user.isAnonymous) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  return <Outlet />;
};
export default PrivateRoutes;
