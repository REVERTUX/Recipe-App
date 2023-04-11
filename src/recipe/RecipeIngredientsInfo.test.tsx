import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeIngredientsInfo from './RecipeIngredientsInfo';
import { Ingredient, Nutrition } from './model';

const mockIngredients: Ingredient[] = [
  { name: 'pasta', amount: 1, unit: 'pound' },
  { name: 'pesto sauce', amount: 1, unit: 'cup' },
  { name: 'parmesan cheese', amount: 0.5, unit: 'cup' },
];
const mockNutrition: Nutrition = { fat: 18, protein: 15, carbs: 70 };

describe('RecipeIngredientsInfo', () => {
  it('should render headers', () => {
    render(
      <RecipeIngredientsInfo
        ingredients={mockIngredients}
        nutrition={mockNutrition}
      />
    );

    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
    expect(screen.getByText('Nutrition:')).toBeInTheDocument();
  });
  it('should render nutrition', () => {
    render(
      <RecipeIngredientsInfo
        ingredients={mockIngredients}
        nutrition={mockNutrition}
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
        nutrition={mockNutrition}
      />
    );

    expect(screen.getByText('pasta 1 pound')).toBeInTheDocument();
    expect(screen.getByText('pesto sauce 1 cup')).toBeInTheDocument();
    expect(screen.getByText('parmesan cheese 0.5 cup')).toBeInTheDocument();
  });
});
