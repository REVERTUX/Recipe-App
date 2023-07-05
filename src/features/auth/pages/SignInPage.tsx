import { lazy, Suspense, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  Link,
  Alert,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { UserSignIn } from '../../../models/user';
import { loginUser } from '../authAction';

const SignInForm = lazy(() => import('../SignInForm'))

function SignInPage() {
  const { error, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to main page if user is authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (values: UserSignIn) => {
    dispatch(loginUser(values));
  };

  return (
    <Container maxWidth="xs">
    <Suspense>
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
          Sign in
        </Typography>
        <SignInForm onSubmit={handleSubmit} error={error} />
        <Box width="100%" pt={1} pb={1}>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/sign-up" variant="body2">
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
      </Suspense>
    </Container>
  );
}

export default SignInPage;
