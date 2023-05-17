import { Formik, FastField, FormikHelpers } from 'formik';
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { CreateRecipe } from '../../models/recipe';
import NutrientsForm from './NutrientsForm';
import CategoriesForm from './CategoriesForm';
import StepsForm from './StepsForm';
import IngredientsForm from './IngredientsForm';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Must be 3 characters or more.')
    .required('Required'),
  description: Yup.string()
    .min(15, 'Must be 15 characters or more.')
    .required('Required'),
  calories: Yup.number().min(1, 'Must be 1 or more').required('Required'),
  servings: Yup.number().min(1, 'Must be 1 or more').required('Required'),
  nutrients: Yup.object({
    carbs: Yup.number().min(0, 'Must be 0 or more').required('Required'),
    fat: Yup.number().min(0, 'Must be 0 or more').required('Required'),
    protein: Yup.number().min(0, 'Must be 0 or more').required('Required'),
  }),
  cookingTime: Yup.object({
    value: Yup.number().min(0).required('Required'),
  }),
  categories: Yup.array()
    .of(Yup.object({ name: Yup.string().min(2) }))
    .min(1)
    .required('Required'),
  ingredients: Yup.array()
    .of(
      Yup.object({
        amount: Yup.number().min(0, 'Must be more than 0').required('Required'),
        ingredientName: Yup.string().min(2).required('Required'),
        ingredientUnitName: Yup.string().min(1).required('Required'),
        description: Yup.string(),
      })
    )
    .min(1),
  steps: Yup.array()
    .of(
      Yup.object({
        step: Yup.string()
          .min(15, 'Must be 15 characters or more.')
          .required('Required'),
      })
    )
    .min(1),
});

const initialValues: CreateRecipe = {
  title: '',
  description: '',
  image: 'placeholder',
  calories: 0,
  servings: 0,
  nutrients: { carbs: 0, fat: 0, protein: 0 },
  cookingTime: { value: 0, unit: 'h' },
  categories: [],
  ingredients: [
    {
      amount: 0,
      ingredientName: '',
      ingredientUnitName: '',
      description: '',
    },
  ],
  steps: [{ step: '' }],
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
      validationSchema={validationSchema}
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
            <IngredientsForm
              ingredients={values.ingredients}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              error={errors.ingredients}
              touched={touched.ingredients}
            />
            <StepsForm
              steps={values.steps}
              handleChange={handleChange}
              error={errors.steps}
              touched={touched.steps}
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
