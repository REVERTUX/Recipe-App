import * as Yup from 'yup';

const recipeFormSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Must be 3 characters or more.')
    .required('Required'),
  description: Yup.string()
    .min(15, 'Must be 15 characters or more.')
    .required('Required'),
  imageId: Yup.string().uuid().optional(),
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
  steps: Yup.object({
    verison: Yup.string(),
    blocks: Yup.array().min(1),
  }),
});

export default recipeFormSchema;
