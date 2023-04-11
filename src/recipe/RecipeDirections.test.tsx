import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeDirections from './RecipeDirections';

const mockDirections: string[] = [
  'Bring a large pot of salted water to a boil.',
  'Cook pasta according to package instructions until al dente.',
];

describe('RecipeDirectionsInfo', () => {
  it('should render headers', () => {
    render(<RecipeDirections directions={mockDirections} />);

    expect(screen.getByText('Steps:')).toBeInTheDocument();
  });
  it('should render nutrition', () => {
    render(<RecipeDirections directions={mockDirections} />);

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
