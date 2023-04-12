import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ReviewItem from './ReviewItem';
import { Review } from './model';

const mockReview: Review = {
  id: '1',
  comment: 'I like this recipe',
  date: '2022-04-05',
  rating: 4,
  user: 'testuser',
};

describe('ReviewItem', () => {
  it('should render all fields', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText('I like this recipe')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('2022-04-05')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('should rating be readonly', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByRole('img')).toHaveClass('MuiRating-readOnly');
  });
});
