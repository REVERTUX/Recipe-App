import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeStepsView from './RecipeStepsView';
import { RecipeSteps } from '../../models/recipe';

describe('RecipeStepsView', () => {
  let mockSteps: RecipeSteps;
  describe('when not empty blocks array is provided', () => {
    beforeEach(() => {
      mockSteps = {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'Bring a large pot of salted water to a boil.',
            },
          },
          {
            type: 'paragraph',
            data: {
              text: 'Cook pasta according to package instructions until al dente.',
            },
          },
        ],
      };
    });

    it('should render text', async () => {
      render(<RecipeStepsView steps={mockSteps} />);

      expect(
        await screen.findByText('Bring a large pot of salted water to a boil.')
      ).toBeInTheDocument();

      expect(
        await screen.findByText(
          'Cook pasta according to package instructions until al dente.'
        )
      ).toBeInTheDocument();
    });
  });
  describe('when empty blocks array is provided', () => {
    beforeEach(() => {
      mockSteps = { blocks: [] };
    });

    it('should not render any text', async () => {
      const { container } = render(<RecipeStepsView steps={mockSteps} />);

      expect(container).toHaveTextContent('');
    });
  });
});
