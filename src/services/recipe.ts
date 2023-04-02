/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Recipe } from '../recipe/model';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://' }),
  endpoints: (builder) => ({
    getRecipe: builder.query<Recipe, string>({
      query: (id) => `recipes/${id}`,
    }),
    getRecipesByName: builder.query<Recipe[], string>({
      query: (name) => {
        return { url: `recipes`, params: { name } };
      },
    }),
    // getRecipes: builder.query<Recipe[], void>({
    //   query: () => 'recipes',
    // }),
    getRecipes: builder.query<Recipe[], void>({
      query: () => 'recipes',
    }),
  }),
});

export const {
  useGetRecipesByNameQuery,
  useGetRecipesQuery,
  useGetRecipeQuery,
} = recipeApi;
