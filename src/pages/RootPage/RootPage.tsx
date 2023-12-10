import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './RootPage.module.scss';

const RootPage = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.root__content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default RootPage;
