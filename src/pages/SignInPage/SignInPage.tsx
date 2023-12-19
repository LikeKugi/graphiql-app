import { useEffect, useState, JSX, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '@/lib/firebase';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { Stack } from '@mui/material';
import { RouterConstants } from '@/constants/routes';
import { useLanguage } from '@/contexts/LanguageContext';
import { ISignInFormData } from './SignInPage.types';

const SignInPage = (): JSX.Element => {
  const { t } = useLanguage();

  const emailValidation = useMemo(() => t('signIn.emailValidation'), [t]);
  const emailRequired = useMemo(() => t('signIn.emailRequired'), [t]);
  const passwordRequired = useMemo(() => t('signIn.passwordRequired'), [t]);

  const schema = yup.object().shape({
    email: yup.string().email(emailValidation).required(emailRequired),
    password: yup.string().required(passwordRequired),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  if (user && !user.isAnonymous) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  async function handleFormSubmit(data: ISignInFormData) {
    const { email, password } = data;
    try {
      setErrorMessage('');

      const { success, error: loginError } = await logInWithEmailAndPassword(
        email,
        password,
      );

      if (!success) {
        setErrorMessage(loginError);
      }
    } catch (error) {
      setErrorMessage(t('signIn.error'));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {loading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!loading && !error && (
        <Stack alignItems={'center'} pt={4} spacing={2}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('signIn.title')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('signIn.email')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!error}
                  value={value}
                  helperText={error ? error.message : ''}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('signIn.password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!error}
                  value={value}
                  helperText={error ? error.message : ''}
                  onChange={onChange}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('signIn.button')}
            </Button>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography component="p">
                  {t('signIn.dontHaveAccount')}
                </Typography>
              </Grid>
              <Grid item>
                <Link to="/signup">{t('signUp.title')}</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SignInPage;
