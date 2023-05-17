export interface Ingredient {
  name: string;
}

export interface IngredientListAPIParams {
  search?: string;
  take?: number;
  skip?: number;
}
