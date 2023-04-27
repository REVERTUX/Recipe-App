/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeListAPIParams, RecipeListView } from '../models/recipe';
import { ListResponse } from '../common/model';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    mode: 'no-cors',
  }),
  tagTypes: ['Recipes'],
  endpoints: (builder) => ({
    getRecipe: builder.query<Recipe, string>({
      query: (id) => ({ url: `recipes/${id}` }),
    }),
    getRecipes: builder.query<
      ListResponse<RecipeListView>,
      RecipeListAPIParams
    >({
      query: (params) => ({ url: 'recipes', params }),
      providesTags: (result, error, page) =>
        result
          ? [
              // Provides a tag for each post in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({ id }) => ({
                type: 'Recipes' as const,
                id,
              })),
              { type: 'Recipes', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Recipes', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeQuery } = recipesApi;
