import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import { Stack } from '@mui/material';
import { RouterConstants } from '@/constants/routes';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be at least 8 characters, and include one letter, one digit, and one special character',
    ),
});

const SignUpPage = (): JSX.Element => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  interface ISignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  async function handleFormSubmit(data: ISignUpFormData) {
    console.log(data);
    const { firstName, lastName, email, password } = data;
    try {
      const name = `${firstName} ${lastName}`;

      const { success, error: signUpError } =
        await registerWithEmailAndPassword(name, email, password);
      if (success) {
        console.log('success');
      } else {
        console.log(signUpError);
        setErrorMessage(signUpError);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (error) console.log(error);
  }, [user, error, navigate]);

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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
                        label="First Name"
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
                        label="Last Name"
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
                        label="Email Address"
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Typography component="p">
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to="/signin">Sign in</Link>
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
