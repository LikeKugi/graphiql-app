import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '@/lib/firebase';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import PasswordMeterInput from '@/components/PasswordMeter/PasswordMeter';
import { Stack } from '@mui/material';
import { RouterConstants } from '@/constants/routes';
import { useLanguage } from '@/contexts/LanguageContext';
import { ISignUpFormData } from './SignUpPage.types';
import { useAppDispatch } from '@/store';
import {
  setErrorMessage as setErrorToast,
  setSuccessMessage as setSuccessToast,
} from '@/store/reducers/toastSlice';

const SignUpPage = (): JSX.Element => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();

  const firstNameRequired = useMemo(() => t('signUp.firstNameRequired'), [t]);
  const lastNameRequired = useMemo(() => t('signUp.lastNameRequired'), [t]);
  const emailRequired = useMemo(() => t('signIn.emailRequired'), [t]);
  const emailValidation = useMemo(() => t('signIn.emailValidation'), [t]);
  const passwordRequired = useMemo(() => t('signIn.passwordRequired'), [t]);
  const passwordNote = useMemo(() => t('signUp.passwordNote'), [t]);

  const schema = yup.object().shape({
    firstName: yup.string().required(firstNameRequired),
    lastName: yup.string().required(lastNameRequired),
    email: yup.string().email(emailValidation).required(emailRequired),
    password: yup
      .string()
      .required(passwordRequired)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        passwordNote,
      ),
  });

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const watchPassword = watch('password');

  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFormSubmit(data: ISignUpFormData) {
    const { firstName, lastName, email, password } = data;

    try {
      dispatch(setErrorToast(''));
      dispatch(setSuccessToast(''));
      const name = `${firstName} ${lastName}`;

      const { success, error: signUpError } =
        await registerWithEmailAndPassword(name, email, password);

      if (!success) {
        console.log(signUpError);
        if (signUpError !== 'Missing or insufficient permissions.') {
          setErrorMessage(signUpError);
          dispatch(setErrorToast(signUpError));
        }
      }
      if (success || signUpError === 'Missing or insufficient permissions.') {
        dispatch(setSuccessToast(t('signUp.success')));
      }
    } catch (err) {
      console.log(err);
      dispatch(setErrorToast(t('signUp.error')));
    }
  }

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  if (user && !user.isAnonymous) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      {loading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!loading && !error && (
        <>
          <Stack pt={4} spacing={2} alignItems={'center'}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('signUp.title')}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit((data) => handleFormSubmit(data))}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label={t('signUp.firstName')}
                        autoFocus
                        error={!!error}
                        value={value}
                        helperText={error ? error.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoComplete="family-name"
                        name="lastName"
                        required
                        fullWidth
                        id="lastName"
                        label={t('signUp.lastName')}
                        error={!!error}
                        value={value}
                        helperText={error ? error.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
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
                        error={!!error}
                        value={value}
                        helperText={error ? error.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
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
                  <PasswordMeterInput value={watchPassword || ''} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('signUp.button')}
              </Button>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Typography component="p">
                    {t('signUp.haveAccount')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to="/signin">{t('signIn.button')}</Link>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default SignUpPage;
