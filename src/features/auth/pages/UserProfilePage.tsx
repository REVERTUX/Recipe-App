import { useAppSelector } from '../../../app/hooks';
import UserProfileCard from '../UserProfileCard';

function UserProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) return null;

  return <UserProfileCard user={user} />;
}

export default UserProfilePage;
