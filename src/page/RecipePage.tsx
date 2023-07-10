/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Loader from '../common/components/Loader';
import { useGetRecipeQuery, useGetRecipeStepsQuery } from '../services/recipes';

const RecipeView = lazy(() => import('../features/recipe/RecipeView'));

function RecipePage() {
  const { id } = useParams();
  const location = useLocation();

  const { data, isError } = useGetRecipeQuery(id!, { skip: !id });
  const { data: steps } = useGetRecipeStepsQuery(id!, { skip: !id });

  if (!id || isError) return <Navigate to="/recipes" />;

  return (
    <Suspense fallback={<Loader />}>
      <RecipeView
        recipe={data || location.state?.recipe}
        steps={steps || location.state?.steps}
      />
    </Suspense>
  );
}

export default RecipePage;
