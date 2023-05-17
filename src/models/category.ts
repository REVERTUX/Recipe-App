export interface Category {
  name: string;
}

export interface CategoryListAPIParams {
  search?: string;
  take?: number;
  skip?: number;
}
