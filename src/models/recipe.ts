export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: RecipeIngredient[];
  steps: Step[];
  cookingTime: CookingTime;
  servings: number;
  nutrients: Nutrients;
  rating: number;
  categories: RecipeCategory[];
  calories: number;
}

export interface CreateRecipe
  extends Omit<
    Recipe,
    'id' | 'rating' | 'categories' | 'steps' | 'ingredients'
  > {
  categories: Omit<RecipeCategory, 'id'>[];
  steps: Omit<Step, 'id'>[];
  ingredients: CreateRecipeIngredient[];
}

export type CreateRecipeIngredient = Omit<RecipeIngredient, 'id'>;

export interface CookingTime {
  value: number;
  unit: string;
}

export interface RecipeIngredient {
  id: string;
  ingredientName: string;
  ingredientUnitName: string;
  amount: number;
  description?: string;
}

export interface Nutrients {
  fat: number;
  protein: number;
  carbs: number;
}

export interface RecipeCategory {
  id: string;
  categoryName: string;
}

export interface Step {
  id: string;
  step: string;
}

export type RecipeListView = Omit<Recipe, 'steps' | 'reviews' | 'ingredients'>;

export interface RecipeListAPIParams {
  search?: string;
  take?: number;
  skip?: number;
}
