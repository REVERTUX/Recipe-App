import { lazy, Suspense } from 'react';
import { Container } from '@mui/material';

import { CreateRecipe } from '../models/recipe';
import { useCreateRecipeMutation } from '../services/recipes';

const RecipeForm = lazy(() => import('../features/createRecipe/RecipeForm'));

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

  return (
    <Container sx={{ px: { xs: 0.5 } }}>
      <Suspense>
        <RecipeForm onSubmit={handleFormSubmit} />
      </Suspense>
    </Container>
  );
}

export default CreateRecipePage;
