/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { lazy, Suspense } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FormikHelpers } from 'formik';

import { CreateRecipe } from '../models/recipe';
import {
  useGetRecipeQuery,
  useGetRecipeStepsQuery,
  useUpdateRecipeMutation,
} from '../services/recipes';
import Loader from '../common/components/Loader';

const RecipeForm = lazy(() => import('../features/createRecipe/RecipeForm'));

function EditRecipePage() {
  const [updateRecipe] = useUpdateRecipeMutation();
  const { id } = useParams();

  const { data: recipe } = useGetRecipeQuery(id!, { skip: !id });
  const { data: recipeSteps } = useGetRecipeStepsQuery(id!, { skip: !id });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleFormSubmit = (
    values: CreateRecipe,
    helpers: FormikHelpers<CreateRecipe>
  ) => {
    if (!id) return;

    updateRecipe({ recipe: values, recipeId: id })
      .unwrap()
      .then((data) => {
        enqueueSnackbar('Recipe was successfully created.', {
          variant: 'success',
        });
        navigate(`/recipes/${data.id}`);
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

  if (!recipe || !recipeSteps) return null;

  return (
    <Container sx={{ px: { xs: 0.5 } }}>
      <Suspense fallback={<Loader />}>
        <RecipeForm
          onSubmit={handleFormSubmit}
          initialValues={{ ...recipe, steps: recipeSteps }}
        />
      </Suspense>
    </Container>
  );
}

export default EditRecipePage;
