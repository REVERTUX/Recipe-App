import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import StepsForm from './StepsForm';

describe('StepsForm', () => {
  it('should render correctly', () => {
    const steps = [{ step: 'Step 1' }, { step: 'Step 2' }];
    const error = undefined;
    const touched = undefined;
    const handleChange = vi.fn();

    render(
      <Formik initialValues={steps} onSubmit={vi.fn()}>
        <StepsForm
          steps={steps}
          error={error}
          touched={touched}
          handleChange={handleChange}
        />
      </Formik>
    );
    expect(
      screen.getByRole('button', { name: 'Add Step' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(steps.length);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Add Step')).toBeInTheDocument();
  });
});
