import { lazy, Suspense } from 'react';
import { Container } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FormikHelpers } from 'formik';
import { CreateRecipe } from '../models/recipe';
import { useCreateRecipeMutation } from '../services/recipes';
import Loader from '../common/components/Loader';

const RecipeForm = lazy(() => import('../features/createRecipe/RecipeForm'));

const initialValues: CreateRecipe = {
  title: '',
  description: '',
  imageId: undefined,
  calories: 0,
  servings: 0,
  nutrients: { carbs: 0, fat: 0, protein: 0 },
  cookingTime: { value: 0, unit: 'h' },
  categories: [],
  steps: { blocks: [] },
};

function CreateRecipePage() {
  const [createRecipe] = useCreateRecipeMutation();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleFormSubmit = (
    values: CreateRecipe,
    helpers: FormikHelpers<CreateRecipe>
  ) => {
    createRecipe(values)
      .unwrap()
      .then((recipe) => {
        enqueueSnackbar('Recipe was successfully created.', {
          variant: 'success',
        });
        navigate(`/recipes/${recipe.id}`, { state: { recipe } });
      })
      .catch(() => {
        enqueueSnackbar(
          'Something went wrong during recipe creation. Try again later.',
          {
            variant: 'error',
          }
        );
        helpers.setSubmitting(false);
      });
  };

  return (
    <Container sx={{ px: { xs: 0.5 } }}>
      <Suspense fallback={<Loader />}>
        <RecipeForm onSubmit={handleFormSubmit} initialValues={initialValues} />
      </Suspense>
    </Container>
  );
}

export default CreateRecipePage;
