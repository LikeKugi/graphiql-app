import { Container, Box, Typography, Button } from '@mui/material';
import { JSX } from 'react';
import styles from './Welcome.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomePage = (): JSX.Element => {
  const { t } = useLanguage();

  const [user] = useAuthState(auth);

  return (
    <Box component={'main'} className={styles.welcome}>
      <Container className={styles.welcome__wrapper} fixed>
        <Box className={styles.welcome__links}>
          <Typography textAlign="center" variant="h6">
            {user ? t('welcome.headAuth') : t('welcome.headNotAuth')}
          </Typography>
          <Box className={styles.welcome__links}>
            {user ? (
              <Link to={RouterConstants.MAIN}>
                <Button size="large">{t('welcome.linkMain')}</Button>
              </Link>
            ) : (
              <>
                <Link to={RouterConstants.SIGNIN}>
                  <Button size="large" variant="text">
                    {t('welcome.linkSignIn')}
                  </Button>
                </Link>
                <Link to={RouterConstants.SIGNUP}>
                  <Button size="large" variant="text">
                    {t('welcome.linkSignUp')}
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default WelcomePage;
