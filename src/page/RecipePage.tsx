import { lazy, Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetRecipeQuery, useGetRecipeStepsQuery } from '../services/recipes';

const RecipeView = lazy(() => import('../features/recipe/RecipeView'))

function RecipePage() {
  const { id } = useParams();

  const { data, isError } = useGetRecipeQuery(id!, { skip: !id });
  const { data: steps } = useGetRecipeStepsQuery(id!, { skip: !id });

  if (!id || isError) return <Navigate to="/recipes" />;
  return <Suspense>
  <RecipeView recipe={data} steps={steps} />
  </Suspense>
}

export default RecipePage;
