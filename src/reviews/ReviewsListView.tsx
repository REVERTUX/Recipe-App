import { useGetReviewsQuery } from '../services/reviews';
import ReviewList from './ReviewList';

interface ReviewsListViewProps {
  recipeId: string;
}

function ReviewsListView({ recipeId }: ReviewsListViewProps) {
  const { data, isLoading } = useGetReviewsQuery({ recipeId });
  if (isLoading) return null;
  if (!data) return null;
  return <ReviewList reviews={data.data} />;
}

export default ReviewsListView;
