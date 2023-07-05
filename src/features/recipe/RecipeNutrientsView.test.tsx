import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeNutrientsView from './RecipeNutrientsView';
import { Nutrients } from '../../models/recipe';

describe('RecipeNutrientsView', () => {
  describe('when correct nutrients are provided', () => {
    let mockNutrients: Nutrients;

    beforeEach(() => {
      mockNutrients = { fat: 18, protein: 15, carbs: 70 };
    });

    it('should render header', () => {
      render(<RecipeNutrientsView nutrients={mockNutrients} />);

      expect(screen.getByText('Nutrients:')).toBeInTheDocument();
    });

    it('should render nutrients', () => {
      render(<RecipeNutrientsView nutrients={mockNutrients} />);

      expect(screen.getByText('fat 18g')).toBeInTheDocument();
      expect(screen.getByText('protein 15g')).toBeInTheDocument();
      expect(screen.getByText('carbs 70g')).toBeInTheDocument();
    });
  });
});
