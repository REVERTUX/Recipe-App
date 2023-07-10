/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { lazy, Suspense, useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FormikHelpers } from 'formik';
import isEqual from 'lodash/isEqual';

import { CreateRecipe, UpdateRecipe } from '../models/recipe';
import {
  useGetRecipeQuery,
  useGetRecipeStepsQuery,
  useUpdateRecipeMutation,
  useUpdateRecipeStepsMutation,
} from '../services/recipes';
import Loader from '../common/components/Loader';

const RecipeForm = lazy(() => import('../features/createRecipe/RecipeForm'));

function EditRecipePage() {
  const [updateRecipe, {}] = useUpdateRecipeMutation();
  const [updateRecipeSteps] = useUpdateRecipeStepsMutation();
  const { id } = useParams();

  const { data: recipe } = useGetRecipeQuery(id!, { skip: !id });
  const { data: recipeSteps } = useGetRecipeStepsQuery(id!, { skip: !id });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleFormSubmit = (
    values: CreateRecipe,
    helpers: FormikHelpers<CreateRecipe>
  ) => {
    if (!id || !recipe) return;
    const { steps: newSteps, ...newRecipe } = values;

    const recipeToCompare: UpdateRecipe = {
      title: recipe.title,
      calories: recipe.calories,
      servings: recipe.servings,
      imageId: recipe.imageId,
      nutrients: recipe.nutrients,
      categories: recipe.categories,
      cookingTime: recipe.cookingTime,
      description: recipe.description,
    };

    const promises: any[] = [];

    console.log(values);

    if (!isEqual(newRecipe, recipeToCompare)) {
      const updateRecipePromise = updateRecipe({
        recipe: newRecipe,
        recipeId: id,
      })
        .unwrap()
        .then((data) => {
          enqueueSnackbar('Recipe was successfully updated.', {
            variant: 'success',
          });
        })
        .catch(() => {
          enqueueSnackbar(
            'Something went wrong during recipe update. Try again later.',
            {
              variant: 'error',
            }
          );
          helpers.setSubmitting(false);
        });

      promises.push(updateRecipePromise);
    }

    if (!isEqual(newSteps.blocks, recipeSteps?.blocks)) {
      const updateRecipeStepsPromise = updateRecipeSteps({
        steps: newSteps,
        recipeId: id,
      })
        .unwrap()
        .then((data) => {
          enqueueSnackbar('Recipe steps were successfully updated.', {
            variant: 'success',
          });
        })
        .catch(() => {
          enqueueSnackbar(
            'Something went wrong during recipe steps update. Try again later.',
            {
              variant: 'error',
            }
          );
          helpers.setSubmitting(false);
        });
      promises.push(updateRecipeStepsPromise);
    }
    Promise.all(promises).then(() => {
      navigate(`/recipes/${recipe?.id}`);
    });
  };

  if (!recipe || !recipeSteps) return null;

  return (
    <Container sx={{ px: { xs: 0.5 } }}>
      <Suspense fallback={<Loader />}>
        <RecipeForm
          onSubmit={handleFormSubmit}
          initialValues={{ title: recipe.title, calories: recipe.calories, nutrients: recipe.nutrients, servings: recipe.servings, imageId: recipe.imageId, categories: recipe.categories, cookingTime: recipe.cookingTime
          , description: recipe.description , steps: recipeSteps }}
        />
      </Suspense>
    </Container>
  );
}

export default EditRecipePage;
