export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  creationDate: string;
}

export interface ReviewListAPIParams {
  take?: number;
  skip?: number;
  recipeId: string;
}
