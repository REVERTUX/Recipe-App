import { ListResponse } from '../../common/model';
import { Recipe, RecipeListView } from '../../models/recipe';

const BASE_URL = 'http://127.0.0.1:3000';

async function fetchRecipes(search: string, take: number, skip: number) {
  const params = new URLSearchParams({
    search,
    take: take.toString(),
    skip: skip.toString(),
  });

  const res = await fetch(`${BASE_URL}/recipes?${params}`, {
    next: { tags: ['recipes', search, take.toString(), skip.toString()] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }

  return res.json() as unknown as ListResponse<RecipeListView>;
}

async function fetchRecipe(recipeId: string) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
    next: { tags: ['recipes', recipeId] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return res.json() as unknown as Recipe;
}

export { fetchRecipes, fetchRecipe };
