import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Review } from './model';
import ReviewList from './ReviewList';

const mockReviews: Review[] = [
  {
    id: '1',
    comment: 'I like this recipe',
    date: '2022-04-05',
    rating: 4,
    user: 'testuser',
  },
  {
    id: '2',
    comment: 'I do not like this recipe',
    date: '2022-03-07',
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
