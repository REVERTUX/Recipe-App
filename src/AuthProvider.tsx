import React, { useCallback, useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import Loader from './common/components/Loader';

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      await Auth.currentAuthenticatedUser({ bypassCache: true });
    } catch (error) {}
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (isLoading) return <Loader height="100vh" />;
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}

export default AuthProvider;
