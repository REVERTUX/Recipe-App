import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

function SignInPage() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <Box pt="10%">
      <Authenticator hideSignUp loginMechanisms={['email', 'username']} />
    </Box>
  );
}

export default SignInPage;
