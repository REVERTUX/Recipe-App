import { Stack, TextField, InputAdornment } from '@mui/material';
import { FastField, FormikErrors, FormikTouched } from 'formik';
import { Nutrients } from '../../models/recipe';

interface NutrientsFormProps {
  nutrients: Nutrients;
  handleChange: (event: React.ChangeEvent<never>) => void;
  touched: FormikTouched<Nutrients> | undefined;
  error: FormikErrors<Nutrients> | undefined;
}

function NutrientsForm({
  handleChange,
  nutrients,
  error,
  touched,
}: NutrientsFormProps) {
  return (
    <Stack spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
      <FastField
        sx={{ width: { xs: '100%' } }}
        type="number"
        placeholder="Carbs..."
        label="Carbs"
        name="nutrients.carbs"
        value={nutrients.carbs}
        onChange={handleChange}
        as={TextField}
        error={touched?.carbs && Boolean(error?.carbs)}
        helperText={!!touched?.carbs && error?.carbs}
        InputProps={{
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
      />
      <FastField
        type="number"
        placeholder="Protein..."
        label="Protein"
        name="nutrients.protein"
        value={nutrients.protein}
        onChange={handleChange}
        as={TextField}
        error={touched?.protein && Boolean(error?.protein)}
        helperText={!!touched?.protein && error?.protein}
        InputProps={{
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
      />
      <FastField
        type="number"
        placeholder="Fat..."
        label="Fat"
        name="nutrients.fat"
        value={nutrients.fat}
        onChange={handleChange}
        as={TextField}
        error={touched?.fat && Boolean(error?.fat)}
        helperText={!!touched?.fat && error?.fat}
        InputProps={{
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
      />
    </Stack>
  );
}

export default NutrientsForm;
