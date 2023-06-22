/* eslint-disable import/prefer-default-export */
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateRecipe,
  Recipe,
  RecipeListAPIParams,
  RecipeListView,
} from '../models/recipe';
import { ListResponse } from '../common/model';
import { Category, CategoryListAPIParams } from '../models/category';
import { Ingredient, IngredientListAPIParams } from '../models/ingredient';
import baseQueryWithReauth from './queryWithReauth';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['Recipes', 'Categories', 'Ingredients'],
  endpoints: (builder) => ({
    getRecipe: builder.query<Recipe, string>({
      query: (id) => ({ url: `recipes/${id}` }),
      providesTags: (_, __, id) => [{ type: 'Recipes', id }],
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

    getFavoriteRecipes: builder.query<
      ListResponse<RecipeListView>,
      RecipeListAPIParams
    >({
      query: (params) => ({ url: 'recipes/favorite', params }),
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
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Recipes'],
    }),

    updateRecipeFavorite: builder.mutation<
      undefined,
      { recipeId: string; favorite: boolean }
    >({
      query: ({ recipeId, favorite }) => ({
        url: `recipes/${recipeId}/favorite`,
        body: { favorite },
        method: 'PUT',
      }),
      invalidatesTags: (_, __, { recipeId }) => [
        { type: 'Recipes', id: recipeId },
      ],
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Categories'],
    }),

    uploadFile: builder.mutation<{ id: string }, FormData>({
      query: (body) => ({
        url: 'files',
        body,
        method: 'POST',
        formData: true,
      }),
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
  useUploadFileMutation,
  useGetFavoriteRecipesQuery,
  useUpdateRecipeFavoriteMutation,
} = recipesApi;
