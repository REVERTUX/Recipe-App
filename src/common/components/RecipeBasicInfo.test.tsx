import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { renderWithProviders } from '../../utils/test-utils';
import RecipeBasicInfo, { RecipeBasicInfoProps } from './RecipeBasicInfo';

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

describe('RecipeBasicInfo', () => {
  it('should render all info', async () => {
    const props: RecipeBasicInfoProps = {
      categories: [
        { id: '1', categoryName: 'category1' },
        { id: '2', categoryName: 'category2' },
      ],
      cookingTime: { value: 30, unit: 'min' },
      description: 'description',
      rating: 3.5,
      servings: 4,
      title: 'title',
      favorite: true,
      id: '1',
      disableFavoriteInteraction: false,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    renderWithProviders(<RecipeBasicInfo {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${props.cookingTime.value}${props.cookingTime.unit}`)
    ).toBeInTheDocument();
    expect(screen.getByText(props.servings)).toBeInTheDocument();
    expect(screen.getByLabelText(`${props.rating} Stars`)).toBeInTheDocument();
    expect(
      screen.getByText(props.categories[0].categoryName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(props.categories[1].categoryName)
    ).toBeInTheDocument();
  });
});
