import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

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
    const { getByText, getByRole } = render(<ReviewItem review={mockReview} />);

    expect(getByText('I like this recipe')).toBeInTheDocument();
    expect(getByText('testuser')).toBeInTheDocument();
    expect(getByText('2022-04-05')).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
  });
  it('should rating be readonly', () => {
    const { getByRole } = render(<ReviewItem review={mockReview} />);

    expect(getByRole('img')).toHaveClass('MuiRating-readOnly');
  });
});
