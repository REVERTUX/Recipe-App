/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateRecipe,
  Recipe,
  RecipeListAPIParams,
  RecipeListView,
} from '../models/recipe';
import { ListResponse } from '../common/model';
import { Category, CategoryListAPIParams } from '../models/category';
import { Ingredient, IngredientListAPIParams } from '../models/ingredient';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    mode: 'no-cors',
  }),

  tagTypes: ['Recipes', 'Categories', 'Ingredients'],
  endpoints: (builder) => ({
    getRecipe: builder.query<Recipe, string>({
      query: (id) => ({ url: `recipes/${id}` }),
    }),
    getRecipes: builder.query<
      ListResponse<RecipeListView>,
      RecipeListAPIParams
    >({
      query: (params) => ({ url: 'recipes', params }),
      providesTags: (result) =>
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
    createRecipe: builder.mutation<RecipeListView, CreateRecipe>({
      query: (body) => ({
        url: 'recipes',
        body: JSON.stringify(body),
        method: 'POST',
      }),
      invalidatesTags: ['Recipes'],
    }),

    getIngredients: builder.query<
      ListResponse<Ingredient>,
      IngredientListAPIParams
    >({
      query: (params) => ({ url: 'recipes/ingredients', params }),
      providesTags: ['Ingredients'],
    }),
    createIngredient: builder.mutation<Ingredient, Ingredient>({
      query: (body) => ({
        url: 'recipes/ingredients',
        body: JSON.stringify(body),
        method: 'POST',
      }),
      invalidatesTags: ['Ingredients'],
    }),

    getCategories: builder.query<
      ListResponse<Category>,
      CategoryListAPIParams | undefined
    >({
      query: (params) => ({ url: 'recipes/categories', params }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<Category, Category>({
      query: (body) => ({
        url: 'recipes/categories',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useGetCategoriesQuery,
  useGetIngredientsQuery,
  useCreateCategoryMutation,
  useCreateIngredientMutation,
} = recipesApi;
