export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageId?: string;
  cookingTime: CookingTime;
  servings: number;
  nutrients: Nutrients;
  rating: number;
  categories: RecipeCategory[];
  calories: number;
  favorite: boolean;
}

export interface CreateRecipe
  extends Omit<Recipe, 'id' | 'rating' | 'categories' | 'favorite'> {
  categories: Omit<RecipeCategory, 'id'>[];
  steps: RecipeSteps;
}

export type UpdateRecipe = Omit<CreateRecipe, 'steps'>;

export interface CookingTime {
  value: number;
  unit: string;
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

export interface RecipeSteps {
  blocks: { type: string; data: object }[];
  version?: string;
}

export type RecipeListView = Recipe;

export interface RecipeListAPIParams {
  search?: string;
  take?: number;
  skip?: number;
}
