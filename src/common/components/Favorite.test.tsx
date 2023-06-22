import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { describe, expect, it } from 'vitest';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { renderWithProviders } from '../../utils/test-utils';
import Favorite from './Favorite';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const handlers = [
  rest.put('/api/recipes/:id/favorite', (req, res) => {
    return res();
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Favorite', () => {
  it('should render marked state', async () => {
    renderWithProviders(
      <SnackbarProvider>
        <Favorite favorite recipeId="1" />
      </SnackbarProvider>
    );

    const button = screen.getByLabelText('Unmark favorite');
    const icon = screen.getByTestId('StarIcon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should render unmarked state', async () => {
    renderWithProviders(
      <SnackbarProvider>
        <Favorite favorite={false} recipeId="1" />
      </SnackbarProvider>
    );

    const button = screen.getByLabelText('Mark as favorite');
    const icon = screen.getByTestId('StarOutlineIcon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should show message after click', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <SnackbarProvider>
        <Favorite favorite={false} recipeId="1" />
      </SnackbarProvider>
    );

    const button = screen.getByLabelText('Mark as favorite');

    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText('Recipe is now favorite'));
  });

  it('should button be disabled', async () => {
    renderWithProviders(
      <SnackbarProvider>
        <Favorite favorite={false} recipeId="1" disabled />
      </SnackbarProvider>
    );

    const button = screen.getByLabelText('Mark as favorite');

    expect(button).toHaveProperty('disabled');
  });
});
