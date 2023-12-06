import { JSX } from 'react';
import {
  createBrowserRouter,
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

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouterConstants.INDEX} element={<RootPage />}>
      <Route index element={<WelcomePage />} />
      <Route element={<PublicRoutes />}>
        <Route path={RouterConstants.SIGNIN} element={<SignInPage />} />
        <Route path={RouterConstants.SIGNUP} element={<SignUpPage />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path={RouterConstants.MAIN} element={<MainPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />,
    </Route>,
  ),
);

const AppRouter = (): JSX.Element => {
  return <RouterProvider router={routes} />;
};
export default AppRouter;
