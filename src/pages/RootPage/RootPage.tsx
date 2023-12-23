import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './RootPage.module.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setErrorMessage,
  setSuccessMessage,
} from '@/store/reducers/toastSlice';

const RootPage = (): JSX.Element => {
  const { errorMessage, successMessage } = useAppSelector(
    (state) => state.toast,
  );
  const dispatch = useAppDispatch();

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    if (errorMessage) {
      dispatch(setErrorMessage(''));
    }
    if (successMessage) {
      dispatch(setSuccessMessage(''));
    }
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Header />
      <div className={styles.root__content}>
        <Outlet />
      </div>
      <Footer />
      <Snackbar
        open={!!errorMessage || !!successMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default RootPage;
