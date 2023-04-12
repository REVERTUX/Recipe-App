import { Rating, Typography } from '@mui/material';

import { Review } from './model';

interface ReviewItemProps {
  review: Review;
}

function ReviewItem({
  review: { comment, date, rating, user },
}: ReviewItemProps) {
  return (
    <div>
      <Typography variant="h6">{user}</Typography>
      <Typography variant="subtitle1">{date}</Typography>
      <Rating value={rating} max={5} precision={0.5} readOnly />
      <Typography variant="body1">{comment}</Typography>
    </div>
  );
}

export default ReviewItem;
