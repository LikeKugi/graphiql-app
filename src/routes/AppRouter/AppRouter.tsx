import { JSX } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootPage from '@/pages/RootPage/RootPage';
import { RouterConstants } from '@/constants/routes';
import WelcomePage from '@/pages/WelcomePage/WelcomePage';
import PublicRoutes from '@/routes/PublicRoutes/PublicRoutes';
import SignInPage from '@/pages/SignInPage/SignInPage';
import SignUpPage from '@/pages/SignUpPage/SignUpPage';
import PrivateRoutes from '@/routes/PrivateRoutes/PrivateRoutes';
import MainPage from '@/pages/MainPage/MainPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import Fallback from '@/components/ErrorBoundaryFallback/Fallback';

const routes = createHashRouter(
  createRoutesFromElements(
    <Route path={RouterConstants.INDEX} element={<RootPage />}>
      <Route index element={<WelcomePage />} />
      <Route element={<PublicRoutes />}>
        <Route
          path={RouterConstants.SIGNIN}
          errorElement={<Fallback routeMessage="/signin" />}
          element={<SignInPage />}
        />
        <Route
          path={RouterConstants.SIGNUP}
          errorElement={<Fallback routeMessage="/signup" />}
          element={<SignUpPage />}
        />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route
          path={RouterConstants.MAIN}
          errorElement={<Fallback routeMessage="/main" />}
          element={<MainPage />}
        />
      </Route>
      <Route
        path="*"
        errorElement={<Fallback routeMessage="404" />}
        element={<NotFoundPage />}
      />
      ,
    </Route>,
  ),
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={routes} />;
};
export default AppRouter;
