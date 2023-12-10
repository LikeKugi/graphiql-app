import { Container, Box, Typography, Button } from '@mui/material';
import { JSX } from 'react';
import styles from './Welcome.module.scss';
import { useAppSelector } from '@/store';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/constants/routes';
import { welcomeText } from './text';

const WelcomePage = (): JSX.Element => {
  const { lang } = useAppSelector((state) => state.lang);
  const currentText = welcomeText[lang];

  const isAuth = false;

  return (
    <Box component={'main'} className={styles.welcome}>
      <Container className={styles.welcome__wrapper} fixed>
        <Box className={styles.welcome__links}>
          <Typography textAlign="center" variant="h6">
            {isAuth ? currentText.headAuth : currentText.headNotAuth}
          </Typography>
          <Box className={styles.welcome__links}>
            {isAuth ? (
              <Link to={RouterConstants.MAIN}>
                <Button size="large">{currentText.linkMain}</Button>
              </Link>
            ) : (
              <>
                <Link to={RouterConstants.SIGNIN}>
                  <Button size="large" variant="text">
                    {currentText.linkSignIn}
                  </Button>
                </Link>
                <Link to={RouterConstants.SIGNUP}>
                  <Button size="large" variant="text">
                    {currentText.linkSignUp}
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
