import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ReviewList from './ReviewList';
import { Review } from '../models/review';

const mockReviews: Review[] = [
  {
    id: '1',
    comment: 'I like this recipe',
    creationDate: '2022-04-05',
    rating: 4,
    user: 'testuser',
  },
  {
    id: '2',
    comment: 'I do not like this recipe',
    creationDate: '2022-03-07',
    rating: 2,
    user: 'neagtiveuser',
  },
];

describe('ReviewList', () => {
  it('should render header', () => {
    render(<ReviewList reviews={mockReviews} />);
    expect(screen.getByText('Comments:')).toBeInTheDocument();
  });
  it('should render 2 ReviewItem', () => {
    render(<ReviewList reviews={mockReviews} />);
    expect(screen.getByText('I like this recipe')).toBeInTheDocument();
    expect(screen.getByText('I do not like this recipe')).toBeInTheDocument();
  });
});
