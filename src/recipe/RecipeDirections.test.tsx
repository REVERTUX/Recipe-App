import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeSteps from './RecipeSteps';
import { Step } from '../models/recipe';

const mockSteps: Step[] = [
  { id: '1', step: 'Bring a large pot of salted water to a boil.', order: 1 },
  {
    id: '2',
    step: 'Cook pasta according to package instructions until al dente.',
    order: 2,
  },
];

describe('RecipeStepsInfo', () => {
  it('should render headers', () => {
    render(<RecipeSteps steps={mockSteps} />);

    expect(screen.getByText('Steps:')).toBeInTheDocument();
  });
  it('should render nutrition', () => {
    render(<RecipeSteps steps={mockSteps} />);

    expect(
      screen.getByText('Bring a large pot of salted water to a boil.')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Cook pasta according to package instructions until al dente.'
      )
    ).toBeInTheDocument();
  });
});
