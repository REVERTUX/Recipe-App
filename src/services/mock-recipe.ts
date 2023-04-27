/* eslint-disable import/prefer-default-export */
import { Recipe } from '../models/recipe';

export const recipe: Recipe = {
  id: '1',
  title: 'Pesto Pasta',
  image: 'https://example.com/images/pesto-pasta.jpg',
  categories: ['dinner', 'meat'],
  cookingTime: { value: 1, unit: 'h' },
  description: 'Delicious and easy pesto pasta recipe',
  steps: [
    'Bring a large pot of salted water to a boil.',
    'Cook pasta according to package instructions until al dente.',
    'While the pasta is cooking, heat olive oil in a large pan over medium heat. Add garlic and cherry tomatoes and cook until the tomatoes are soft and starting to burst.',
    'Add the cooked pasta, pesto sauce, and parmesan cheese to the pan with the tomatoes. Toss everything together until the pasta is coated in the sauce.',
    'Season with salt and pepper to taste.',
    'Serve hot.',
  ],
  ingredients: [
    { name: 'pasta', amount: 1, unit: 'pound' },
    { name: 'pesto sauce', amount: 1, unit: 'cup' },
    { name: 'parmesan cheese', amount: 0.5, unit: 'cup' },
    { name: 'cherry tomatoes', amount: 1, unit: 'cup' },
    { name: 'garlic', amount: 2, unit: 'cloves' },
    { name: 'olive oil', amount: 2, unit: 'tbsp' },
    { name: 'salt and pepper', amount: 0, unit: 'to taste' },
  ],
  calories: 500,
  nutrition: {
    fat: 18,
    protein: 15,
    carbs: 70,
  },
  rating: 4.5,
  reviews: [
    {
      id: '1',
      user: 'Alice',
      rating: 5,
      comment: 'This was amazing! Definitely making it again.',
      date: '2022-03-21',
    },
    {
      id: '2',
      user: 'Bob',
      rating: 4,
      comment:
        'Great recipe! I added some grilled chicken to mine and it turned out really well.',
      date: '2022-03-20',
    },
  ],
  servings: 4,
};

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Pesto Pasta',
    image: 'https://example.com/images/pesto-pasta.jpg',
    categories: ['dinner', 'meat'],
    cookingTime: { value: 1, unit: 'h' },
    description: 'Delicious and easy pesto pasta recipe',
    steps: [
      'Bring a large pot of salted water to a boil.',
      'Cook pasta according to package instructions until al dente.',
      'While the pasta is cooking, heat olive oil in a large pan over medium heat. Add garlic and cherry tomatoes and cook until the tomatoes are soft and starting to burst.',
      'Add the cooked pasta, pesto sauce, and parmesan cheese to the pan with the tomatoes. Toss everything together until the pasta is coated in the sauce.',
      'Season with salt and pepper to taste.',
      'Serve hot.',
    ],
    ingredients: [
      { name: 'pasta', amount: 1, unit: 'pound' },
      { name: 'pesto sauce', amount: 1, unit: 'cup' },
      { name: 'parmesan cheese', amount: 0.5, unit: 'cup' },
      { name: 'cherry tomatoes', amount: 1, unit: 'cup' },
      { name: 'garlic', amount: 2, unit: 'cloves' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'salt and pepper', amount: 0, unit: 'to taste' },
    ],
    calories: 500,
    nutrition: {
      fat: 18,
      protein: 15,
      carbs: 70,
    },
    rating: 4.5,
    reviews: [
      {
        id: '1',
        user: 'Alice',
        rating: 5,
        comment: 'This was amazing! Definitely making it again.',
        date: '2022-03-21',
      },
      {
        id: '2',
        user: 'Bob',
        rating: 4,
        comment:
          'Great recipe! I added some grilled chicken to mine and it turned out really well.',
        date: '2022-03-20',
      },
    ],
    servings: 4,
  },
  {
    id: '2',
    title: 'Pesto Pasta',
    image: 'https://example.com/images/pesto-pasta.jpg',
    categories: ['dinner', 'meat'],
    cookingTime: { value: 1, unit: 'h' },
    description: 'Delicious and easy pesto pasta recipe',
    steps: [
      'Bring a large pot of salted water to a boil.',
      'Cook pasta according to package instructions until al dente.',
      'While the pasta is cooking, heat olive oil in a large pan over medium heat. Add garlic and cherry tomatoes and cook until the tomatoes are soft and starting to burst.',
      'Add the cooked pasta, pesto sauce, and parmesan cheese to the pan with the tomatoes. Toss everything together until the pasta is coated in the sauce.',
      'Season with salt and pepper to taste.',
      'Serve hot.',
    ],
    ingredients: [
      { name: 'pasta', amount: 1, unit: 'pound' },
      { name: 'pesto sauce', amount: 1, unit: 'cup' },
      { name: 'parmesan cheese', amount: 0.5, unit: 'cup' },
      { name: 'cherry tomatoes', amount: 1, unit: 'cup' },
      { name: 'garlic', amount: 2, unit: 'cloves' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'salt and pepper', amount: 0, unit: 'to taste' },
    ],
    calories: 500,
    nutrition: {
      fat: 18,
      protein: 15,
      carbs: 70,
    },
    rating: 3.5,
    reviews: [
      {
        id: '1',
        user: 'Alice',
        rating: 5,
        comment: 'This was amazing! Definitely making it again.',
        date: '2022-03-21',
      },
      {
        id: '2',
        user: 'Bob',
        rating: 4,
        comment:
          'Great recipe! I added some grilled chicken to mine and it turned out really well.',
        date: '2022-03-20',
      },
    ],
    servings: 4,
  },
];
