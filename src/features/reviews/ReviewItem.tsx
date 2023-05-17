import { Rating, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Review } from '../../models/review';

interface ReviewItemProps {
  review: Review;
}

function ReviewItem({
  review: { comment, creationDate, rating, user },
}: ReviewItemProps) {
  return (
    <div>
      <Typography variant="h6">{user}</Typography>
      <Typography variant="subtitle1">
        {formatDistanceToNow(new Date(creationDate), { addSuffix: true })}
      </Typography>
      <Rating value={rating} max={5} precision={0.5} readOnly />
      <Typography variant="body1">{comment}</Typography>
    </div>
  );
}

export default ReviewItem;
