import { TextField, Button, Stack } from '@mui/material';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { UserSignIn } from '../../models/user';

const initialValues: UserSignIn = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required('Please provide email address'),
});

interface SignInFormProps {
  onSubmit: (values: UserSignIn) => void;
  error: string | null;
}

export default function SignInForm({ onSubmit, error }: SignInFormProps) {
  const handleSubmitForm = (values: UserSignIn) => {
    onSubmit(values);
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
      }) => (
        <Stack
          sx={{ width: '100%' }}
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <Field
            required
            fullWidth
            autoFocus
            as={TextField}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <Field
            required
            fullWidth
            as={TextField}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting && !error}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
