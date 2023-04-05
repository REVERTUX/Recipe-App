import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import ReviewItem from './ReviewItem';
import { Review } from './model';

const StyledWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
}));

interface ReviewListProps {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <StyledWrapper>
      <Typography variant="h5">Comments:</Typography>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </StyledWrapper>
  );
}

export default ReviewList;
