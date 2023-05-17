import React from 'react';
import {
  FieldArray,
  FastField,
  FormikErrors,
  FormikTouched,
  getIn,
} from 'formik';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { CreateRecipe, Step } from '../../models/recipe';

interface StepsFormProps {
  steps: CreateRecipe['steps'];
  handleChange: (event: React.ChangeEvent<never>) => void;
  touched: FormikTouched<Step>[] | undefined;
  error: string | string[] | FormikErrors<Step>[] | undefined;
}

function StepsForm({ steps, error, touched, handleChange }: StepsFormProps) {
  const renderStep = (
    step: string,
    idx: number,
    remove: (index: number) => void
  ) => {
    return (
      <Stack direction="row" width="100%" key={`${idx + step.slice(0, 10)}`}>
        <FastField
          multiline
          fullWidth
          minRows={2}
          placeholder="Step..."
          label="Step"
          name={`steps.${idx}.step`}
          value={step}
          onChange={handleChange}
          as={TextField}
          error={
            getIn(touched, `${idx}.step`) &&
            Boolean(getIn(error, `${idx}.step`))
          }
          helperText={
            getIn(touched, `${idx}.step`) && getIn(error, `${idx}.step`)
          }
        />
        <IconButton
          color="error"
          onClick={() => remove(idx)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <FieldArray name="steps">
      {({ remove, push }) => (
        <>
          {steps.map(({ step }, idx) => renderStep(step, idx, remove))}
          <Button
            variant="outlined"
            fullWidth
            onClick={() =>
              push({
                step: '',
              })
            }
          >
            Add Step
          </Button>
        </>
      )}
    </FieldArray>
  );
}

export default React.memo(StepsForm);
