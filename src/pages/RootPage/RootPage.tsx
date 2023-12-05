import Header from '@/components/Header/Header';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

const RootPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <p>content</p>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  );
};
export default RootPage;
