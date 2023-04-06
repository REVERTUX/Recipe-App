import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import { recipe } from '../services/mock-recipe';
import RecipeBasic from './RecipeBasic';
import ReviewList from './ReviewList';
import RecipeDirections from './RecipeDirections';
import RecipeIngredientsInfo from './RecipeIngredientsInfo';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

function RecipePage() {
  const {
    categories,
    cookingTime,
    description,
    directions,
    id,
    image,
    ingredients,
    nutrition,
    rating,
    reviews,
    servings,
    title,
  } = recipe;
  return (
    <StyledContainer maxWidth="md">
      <RecipeBasic
        title={title}
        description={description}
        cookingTime={cookingTime}
        categories={categories}
        rating={rating}
        servings={servings}
      />
      <RecipeIngredientsInfo ingredients={ingredients} nutrition={nutrition} />
      <RecipeDirections directions={directions} />
      <ReviewList reviews={reviews} />
    </StyledContainer>
  );
}

export default RecipePage;
