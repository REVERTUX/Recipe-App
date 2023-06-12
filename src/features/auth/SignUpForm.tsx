import { Grid, TextField, Button } from '@mui/material';
import { Formik, Field } from 'formik';

import { UserRegister } from '../../models/user';
import registerSchema from './schema/registerSchema';

const initialValues: UserRegister = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

interface SignUpFormProps {
  onSubmit: (values: UserRegister) => void;
  error: string | null;
}

export default function SignUpForm({ onSubmit, error }: SignUpFormProps) {
  const handleSubmitForm = (values: UserRegister) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={registerSchema}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                required
                fullWidth
                autoFocus
                as={TextField}
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                name="name"
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                required
                fullWidth
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Field
                required
                fullWidth
                as={TextField}
                value={values.confirmPassword}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting && !error}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
}
