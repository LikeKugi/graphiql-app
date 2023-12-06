import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

const RootPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootPage;
