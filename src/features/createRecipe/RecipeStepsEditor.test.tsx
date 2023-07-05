/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react';
import { describe, it, vi, Mock } from 'vitest';

import { RecipeSteps } from '../../models/recipe';
import { renderWithProviders } from '../../utils/test-utils';
import RecipeStepsEditor from './RecipeStepsEditor';

describe.skip('RecipeStepsEditor', () => {
  let mockSteps: RecipeSteps;
  let onChangeMock: Mock;
  describe('when not empty blocks array is provided', () => {
    beforeEach(() => {
      mockSteps = {
        blocks: [],
      };
      onChangeMock = vi.fn();
    });

    it('should render text', async () => {
      renderWithProviders(
        <RecipeStepsEditor
          steps={mockSteps}
          onChange={onChangeMock}
          error={false}
        />
      );

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
  describe.skip('when empty blocks array is provided', () => {
    beforeEach(() => {
      mockSteps = { blocks: [] };
    });

    it('should not render any text', async () => {
      const { container } = renderWithProviders(
        <RecipeStepsEditor
          steps={mockSteps}
          onChange={onChangeMock}
          error={false}
        />
      );

      expect(container).toHaveTextContent('');
    });
  });
});
