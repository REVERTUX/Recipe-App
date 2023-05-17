import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { subMinutes } from 'date-fns';

import ReviewItem from './ReviewItem';
import { Review } from '../../models/review';

const mockReview: Review = {
  id: '1',
  comment: 'I like this recipe',
  creationDate: subMinutes(new Date(), 30).toJSON(),
  rating: 4,
  user: 'testuser',
};

describe('ReviewItem', () => {
  it('should render all fields', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText('I like this recipe')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('30 minutes ago')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('should rating be readonly', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByRole('img')).toHaveClass('MuiRating-readOnly');
  });
});
