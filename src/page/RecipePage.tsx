import { Navigate, useParams } from 'react-router-dom';
import RecipeView from '../recipe/RecipeView';
import { useGetRecipeQuery } from '../services/recipes';

function RecipePage() {
  const { id } = useParams();

  const { data, isError } = useGetRecipeQuery(id!, { skip: !id });

  if (!id || isError) return <Navigate to="/recipes" />;
  return <RecipeView recipe={data} />;
}

export default RecipePage;
