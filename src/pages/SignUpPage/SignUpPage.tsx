import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, registerWithEmailAndPassword } from '@/lib/firebase';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const SignUpPage = (): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (firstName || lastName || email || password) setErrorMessage('');
  }, [firstName, lastName, email, password]);

  const isStrongPassword = (password: string): boolean => {
    // Minimum 8 characters, at least one letter, one digit, one special character
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email: string): boolean => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!firstName || !lastName) {
        setErrorMessage('Please, enter your full name');
        return;
      }

      if (!isValidEmail(email)) {
        setErrorMessage('Invalid email address');
        return;
      }

      if (!isStrongPassword(password)) {
        setErrorMessage(
          'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.',
        );
        return;
      }

      const name = `${firstName} ${lastName}`;

      const { success, error } = await registerWithEmailAndPassword(
        name,
        email,
        password,
      );

      if (success) {
        console.log('success');
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Validation error. Please check your inputs.');
    }
  };

  useEffect(() => {
    if (error) console.log(error);
    if (user) navigate('/');
  }, [user, error, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading && <CircularProgress />}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!loading && !error && (
        <>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography component="p">
                    Already have an account?
                  </Typography>
                  <Link to="/signin">Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Button onClick={logout}>Log out</Button>
        </>
      )}
    </Container>
  );
};

export default SignUpPage;
