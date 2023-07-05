import { Formik, FastField, FormikHelpers } from 'formik';
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { CreateRecipe, RecipeSteps } from '../../models/recipe';
import NutrientsForm from './NutrientsForm';
import CategoriesForm from './CategoriesForm';
import ImageForm from './ImageForm';
import RecipeStepsEditor from './RecipeStepsEditor';
import recipeFormSchema from './recipeFormSchema';

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

interface RecipeFormProps {
  onSubmit: (
    values: CreateRecipe,
    onSuccess: () => void,
    onError: () => void
  ) => void;
}

function RecipeForm({ onSubmit }: RecipeFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmitForm = (
    values: CreateRecipe,
    helpers: FormikHelpers<CreateRecipe>
  ) => {
    helpers.setSubmitting(true);

    const handleSuccess = () => {
      enqueueSnackbar('Recipe was successfully created.', {
        variant: 'success',
      });
      navigate('/recipes');
    };
    const handleError = () => {
      enqueueSnackbar(
        'Something went wrong during recipe creation. Try again later.',
        {
          variant: 'error',
        }
      );
      helpers.setSubmitting(false);
    };
    onSubmit(values, handleSuccess, handleError);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={recipeFormSchema}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" textAlign="center" gutterBottom>
            New Recipe
          </Typography>
          <Stack spacing={2} alignItems="flex-start">
            <Paper
              elevation={1}
              width="100%"
              component={Stack}
              sx={{ borderRadius: 4 }}
              spacing={2}
              alignItems="flex-start"
              p={2}
            >
              <FastField
                fullWidth
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                as={TextField}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <FastField
                fullWidth
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                as={TextField}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <ImageForm setFieldValue={setFieldValue} error={errors.imageId} />
              <Stack
                direction="row"
                width="100%"
                gap={2}
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Stack spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
                  <FastField
                    type="number"
                    placeholder="Time..."
                    label="Time"
                    name="cookingTime.value"
                    value={values.cookingTime.value}
                    onChange={handleChange}
                    as={TextField}
                    error={
                      touched.cookingTime?.value &&
                      Boolean(errors.cookingTime?.value)
                    }
                    helperText={
                      touched.cookingTime?.value && errors.cookingTime?.value
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">h</InputAdornment>
                      ),
                    }}
                  />
                  <FastField
                    type="number"
                    placeholder="Servings..."
                    name="servings"
                    label="Servings"
                    value={values.servings}
                    onChange={handleChange}
                    as={TextField}
                    error={touched.servings && Boolean(errors.servings)}
                    helperText={touched.servings && errors.servings}
                  />
                  <FastField
                    type="number"
                    placeholder="Calories..."
                    name="calories"
                    label="Calories"
                    value={values.calories}
                    onChange={handleChange}
                    as={TextField}
                    error={touched.calories && Boolean(errors.calories)}
                    helperText={touched.calories && errors.calories}
                  />
                  <CategoriesForm
                    categories={values.categories}
                    setFieldValue={setFieldValue}
                    error={errors.categories}
                    touched={touched.categories}
                  />
                </Stack>
                <NutrientsForm
                  nutrients={values.nutrients}
                  handleChange={handleChange}
                  error={errors.nutrients}
                  touched={touched.nutrients}
                />
              </Stack>
            </Paper>
            <RecipeStepsEditor
              steps={values.steps}
              onChange={(value: RecipeSteps) => setFieldValue('steps', value)}
              error={!!(touched.steps && Boolean(errors.steps))}
            />
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export default RecipeForm;
