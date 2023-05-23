import { describe, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import RecipeForm from './RecipeForm';
import { renderWithProviders } from '../../utils/test-utils';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.post('/api/recipes', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150));
  }),
  rest.get('/api/recipes/ingredients', (req, res, ctx) => {
    return res(
      ctx.json({ data: [{ name: 'Test ingredient' }], count: 1 }),
      ctx.delay(150)
    );
  }),
  rest.get('/api/recipes/categories', (req, res, ctx) => {
    return res(
      ctx.json({ data: [{ name: 'Test category' }], count: 1 }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('RecipeForm', () => {
  it(
    'should submit correctly',
    async () => {
      // Mock dependencies
      const user = userEvent.setup();
      const onSubmitMock = vi.fn();

      // Render component
      renderWithProviders(
        <SnackbarProvider>
          <BrowserRouter>
            <RecipeForm onSubmit={onSubmitMock} />,
          </BrowserRouter>
        </SnackbarProvider>
      );

      // Fill out form
      await user.type(screen.getByLabelText('Title'), 'Test Recipe');
      await user.type(
        screen.getByLabelText('Description'),
        'Test recipe description with lot of letters.'
      );
      await user.type(screen.getByLabelText('Time'), '60');
      await user.type(screen.getByLabelText('Servings'), '4');
      await user.type(screen.getByLabelText('Calories'), '500');
      await user.type(screen.getByLabelText('Carbs'), '50');
      await user.type(screen.getByLabelText('Protein'), '30');
      await user.type(screen.getByLabelText('Fat'), '20');
      await user.type(screen.getAllByLabelText('Amount')[0], '2');

      fireEvent.change(screen.getAllByLabelText('Step')[0], {
        target: { value: 'Test Step with correct number of letters' },
      });

      // Categories Autocomplete
      // -------------------------------------------------

      const autocompleteCategories = screen.getAllByLabelText('Categories')[0];
      const inputCategories =
        // eslint-disable-next-line testing-library/no-node-access
        autocompleteCategories.parentElement?.querySelector('div') as Element;
      expect(inputCategories).toBeInTheDocument();
      await userEvent.click(inputCategories);

      await user.type(inputCategories, 'Test');
      await userEvent.click(screen.getByText('Test category'));

      // -------------------------------------------------

      // Unit Autocomplete
      // -------------------------------------------------

      const autocompleteUnit = screen.getAllByLabelText('Unit')[0];
      // eslint-disable-next-line testing-library/no-node-access
      const inputUnit = autocompleteUnit.parentElement?.querySelector(
        'div'
      ) as Element;
      expect(inputUnit).toBeInTheDocument();
      await userEvent.click(inputUnit);

      await user.type(inputUnit, 'cup');
      await userEvent.click(screen.getByText('cup'));

      // -------------------------------------------------

      // Ingredient Autocomplete
      // -------------------------------------------------

      const autocompleteIngredient = screen.getAllByLabelText('Ingredient')[0];
      const inputIngredient =
        // eslint-disable-next-line testing-library/no-node-access
        autocompleteIngredient.parentElement?.querySelector('div') as Element;
      expect(inputIngredient).toBeInTheDocument();
      await userEvent.click(inputIngredient);

      await user.type(inputIngredient, 'Test');
      await userEvent.click(screen.getByText('Test ingredient'));

      // -------------------------------------------------

      // Submit form
      await userEvent.click(screen.getByText('Submit'));

      // Assert
      await waitFor(() => {
        expect(onSubmitMock).toBeCalledWith(
          {
            title: 'Test Recipe',
            description: 'Test recipe description with lot of letters.',
            image: undefined,
            calories: 500,
            servings: 4,
            nutrients: { carbs: 50, fat: 20, protein: 30 },
            cookingTime: { value: 60, unit: 'h' },
            categories: [{ categoryName: 'Test category' }],
            ingredients: [
              {
                amount: 2,
                ingredientName: 'Test ingredient',
                ingredientUnitName: 'cup',
                description: '',
              },
            ],
            steps: [{ step: 'Test Step with correct number of letters' }],
          },
          expect.any(Function),
          expect.any(Function)
        );
      });
    },
    { timeout: 10000 }
  );
  it('should display field errors and not trigger submit function', async () => {
    // Mock dependencies
    const handleSubmit = vi.fn();

    // Render the component
    renderWithProviders(
      <SnackbarProvider>
        <BrowserRouter>
          <RecipeForm onSubmit={handleSubmit} />,
        </BrowserRouter>
      </SnackbarProvider>
    );

    const user = userEvent.setup();

    // Fill in the form fields with invalid data
    await user.type(screen.getByLabelText('Title'), 'T');
    await user.type(screen.getByLabelText('Description'), 'This is.');
    await user.type(screen.getByLabelText('Time'), '-1');
    await user.type(screen.getByLabelText('Servings'), '0');
    await user.type(screen.getByLabelText('Calories'), '-1');
    await user.type(screen.getByLabelText('Carbs'), '-1');
    await user.type(screen.getByLabelText('Protein'), '-1');
    await user.type(screen.getByLabelText('Fat'), '-1');

    // Submit the form
    await user.click(screen.getByText('Submit'));

    // Assert that the appropriate error messages are displayed
    expect(
      screen.getByText('Must be 3 characters or more.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must be 15 characters or more.')
    ).toBeInTheDocument();
    expect(screen.getByText('Must be 1 or more')).toBeInTheDocument();
    expect(handleSubmit).not.toBeCalled();
  });
});
