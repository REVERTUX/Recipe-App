export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  directions: string[];
  cookingTime: CookingTime;
  servings: 4;
  nutrition: Nutrition;
  rating: number;
  reviews: Review[];
  categories: string[];
  calories: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CookingTime {
  value: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Nutrition {
  fat: number;
  protein: number;
  carbs: number;
}
