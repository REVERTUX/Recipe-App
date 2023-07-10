import {
  Route,
  Navigate,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Home from './features/home';
import Layout from './Layout';
import RecipesPage from './page/RecipesPage';
import RecipePage from './page/RecipePage';
import CreateRecipePage from './page/CreateRecipePage';
import SignInPage from './features/auth/pages/SignInPage';
import SignUpPage from './features/auth/pages/SignUpPage';
import UserProfilePage from './features/auth/pages/UserProfilePage';
import { useAppSelector } from './app/hooks';
import UserProvider from './features/auth/UserProvider';
import FavoriteRecipesPage from './page/FavoriteRecipesPage';
import EditRecipePage from './page/EditRecipePage';

interface ProtectedRouteProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  isAllowed: boolean;
  // eslint-disable-next-line react/require-default-props
  redirectPath?: string;
}

function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = '/sign-in',
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return children ? <>{children}</> : <Outlet />;
}

function App() {
  const { isLogged } = useAppSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipePage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAllowed={isLogged} />}>
          <Route path="recipes/:id/edit" element={<EditRecipePage />} />
          <Route path="recipes/create" element={<CreateRecipePage />} />
          <Route path="favorites" element={<FavoriteRecipesPage />} />
          <Route path="categories" element={<div>Categories</div>} />
          <Route path="cuisines" element={<div>Cuisines</div>} />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
