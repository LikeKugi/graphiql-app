import { JSX, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';

const PublicRoutes = (): JSX.Element => {
  const [isLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  return <Outlet />;
};
export default PublicRoutes;
