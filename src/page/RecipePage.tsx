import { recipe } from '../services/mock-recipe';
import RecipeComp from '../recipe/RecipeComp';

function RecipePage() {
  return <RecipeComp recipe={recipe} />;
}

export default RecipePage;
