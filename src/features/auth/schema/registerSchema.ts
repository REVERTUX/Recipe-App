import * as Yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Must be 3 characters or more.')
    .required('Please provide username'),
  email: Yup.string().email().required('Please provide email address'),
  password: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
    .matches(
      /[!@#$%^&*()-_=+]/,
      getCharacterValidationError('special character')
    ),
  confirmPassword: Yup.string()
    .required('Please re-type your password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

export default validationSchema;
