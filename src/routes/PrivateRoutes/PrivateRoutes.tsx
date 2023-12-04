import { JSX, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';

const PrivateRoutes = (): JSX.Element => {
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  return <Outlet />;
};
export default PrivateRoutes;
