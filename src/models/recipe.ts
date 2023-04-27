export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  steps: Step[];
  cookingTime: CookingTime;
  servings: number;
  nutrients: Nutrients;
  rating: number;
  categories: Category[];
  calories: number;
}

export interface CookingTime {
  value: number;
  unit: string;
}

export interface Ingredient {
  id: string;
  ingredientName: string;
  ingredientUnitName: string;
  amount: number;
}

export interface Nutrients {
  fat: number;
  protein: number;
  carbs: number;
}

export interface Category {
  id: string;
  categoryName: string;
}

export interface Step {
  id: string;
  order: number;
  step: string;
}

export type RecipeListView = Omit<Recipe, 'steps' | 'reviews' | 'ingredients'>;

export interface RecipeListAPIParams {
  search?: string;
  take?: number;
  skip?: number;
}
