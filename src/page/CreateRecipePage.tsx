import { CreateRecipe } from '../models/recipe';
import RecipeForm from '../features/createRecipe/RecipeForm';
import { useCreateRecipeMutation } from '../services/recipes';

function CreateRecipePage() {
  const [createRecipe] = useCreateRecipeMutation();

  const handleFormSubmit = (
    values: CreateRecipe,
    onSuccess: () => void,
    onError: () => void
  ) => {
    createRecipe(values)
      .unwrap()
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        onError();
      });
  };

  return <RecipeForm onSubmit={handleFormSubmit} />;
}

export default CreateRecipePage;
