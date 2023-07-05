import { Navigate, useParams } from 'react-router-dom';
import RecipeView from '../features/recipe/RecipeView';
import { useGetRecipeQuery, useGetRecipeStepsQuery } from '../services/recipes';

function RecipePage() {
  const { id } = useParams();

  const { data, isError } = useGetRecipeQuery(id!, { skip: !id });
  const { data: steps } = useGetRecipeStepsQuery(id!, { skip: !id });

  if (!id || isError) return <Navigate to="/recipes" />;
  return <RecipeView recipe={data} steps={steps} />;
}

export default RecipePage;
