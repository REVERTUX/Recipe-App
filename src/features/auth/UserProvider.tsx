import { useEffect } from 'react';
import { useGetUserProfileQuery } from '../../services/auth';
import { setCredentials } from './authSlice';
import { useAppDispatch } from '../../app/hooks';

const FETCH_INTERVAL = 1000 * 60 * 15; // 15min

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const { data, isError } = useGetUserProfileQuery('user', {
    pollingInterval: FETCH_INTERVAL,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
    if (isError) dispatch(setCredentials(null));
  }, [data, dispatch, isError]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default UserProvider;
