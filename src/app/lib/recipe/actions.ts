/* eslint-disable import/prefer-default-export */

'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateRecipeState, CreateRecipe } from './shema';

const BASE_URL = 'http://127.0.0.1:3000';

// eslint-disable-next-line consistent-return
export async function createRecipe(
  prevState: CreateRecipeState,
  formData: FormData,
  markdown: string | undefined
): Promise<CreateRecipeState> {
  const validatedFields = CreateRecipe.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    imageId: formData.get('imageId') ? formData.get('imageId') : undefined,
    servings: formData.get('servings'),
    calories: formData.get('calories'),
    cookingTime: { value: formData.get('time'), unit: 'h' },
    nutrients: {
      fat: formData.get('fat'),
      protein: formData.get('protein'),
      carbs: formData.get('carbs'),
    },
    categories: [],
    steps: markdown,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Recipe',
    };
  }
  
  try {
    await axios.post(`${BASE_URL}/recipes`, validatedFields.data);
  } catch (error: any) {
    return {
      message: 'Database Error: Failed to Create Invoice',
    };
  }

  revalidatePath('/recipes');
  redirect('/recipes');
}
