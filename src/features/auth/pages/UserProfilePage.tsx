import { lazy, Suspense } from 'react';
import { useAppSelector } from '../../../app/hooks';

const UserProfileCard = lazy(() => import('../UserProfileCard'));

function UserProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) return null;

  return (
    <Suspense>
      <UserProfileCard user={user} />
    </Suspense>
  );
}

export default UserProfilePage;
