import { useEffect, useState, JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInPage = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (error) console.log(error);
    if (user) navigate('/');
  }, [user, error, navigate]);

  interface ISignInFormData {
    email: string;
    password: string;
  }

  async function handleFormSubmit(data: ISignInFormData) {
    console.log(data);
    const { email, password } = data;
    try {
      setErrorMessage('');

      const {
        success,
        userID,
        error: loginError,
      } = await logInWithEmailAndPassword(email, password);

      if (success) {
        console.log(userID);
      } else {
        setErrorMessage(loginError);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
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
            Sign in
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
                  label="Email Address"
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
                  label="Password"
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
              Sign In
            </Button>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Typography component="p">Don't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link to="/signup">{'Sign Up'}</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SignInPage;
