import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeIngredientsInfo from './RecipeIngredientsInfo';
import { Ingredient, Nutrients } from '../models/recipe';

const mockIngredients: Ingredient[] = [
  { id: '1', ingredientName: 'pasta', amount: 1, ingredientUnitName: 'pound' },
  {
    id: '2',
    ingredientName: 'pesto sauce',
    amount: 1,
    ingredientUnitName: 'cup',
  },
  {
    id: '3',
    ingredientName: 'parmesan cheese',
    amount: 0.5,
    ingredientUnitName: 'cup',
  },
  {
    id: '3',
    ingredientName: 'pepper',
    amount: 0,
    ingredientUnitName: 'to taste',
  },
];
const mockNutrients: Nutrients = { fat: 18, protein: 15, carbs: 70 };

describe('RecipeIngredientsInfo', () => {
  it('should render headers', () => {
    render(
      <RecipeIngredientsInfo
        ingredients={mockIngredients}
        nutrients={mockNutrients}
      />
    );

    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
    expect(screen.getByText('Nutrients:')).toBeInTheDocument();
  });
  it('should render nutrients', () => {
    render(
      <RecipeIngredientsInfo
        ingredients={mockIngredients}
        nutrients={mockNutrients}
      />
    );

    expect(screen.getByText('fat 18g')).toBeInTheDocument();
    expect(screen.getByText('protein 15g')).toBeInTheDocument();
    expect(screen.getByText('carbs 70g')).toBeInTheDocument();
  });
  it('should render ingredients', () => {
    render(
      <RecipeIngredientsInfo
        ingredients={mockIngredients}
        nutrients={mockNutrients}
      />
    );

    expect(screen.getByText('pasta 1 pound')).toBeInTheDocument();
    expect(screen.getByText('pesto sauce 1 cup')).toBeInTheDocument();
    expect(screen.getByText('parmesan cheese 0.5 cup')).toBeInTheDocument();
    expect(screen.getByText('pepper to taste')).toBeInTheDocument();
  });
});
