import { useAuthenticator } from '@aws-amplify/ui-react';
import { lazy, Suspense } from 'react';
import Loader from '../../../common/components/Loader';

const UserProfileCard = lazy(() => import('../UserProfileCard'));

function UserProfilePage() {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <Suspense fallback={<Loader height="400px" />}>
      <UserProfileCard name={user.username} email={user.attributes?.email} />
    </Suspense>
  );
}

export default UserProfilePage;
