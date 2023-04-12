import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import RecipeBasic from './RecipeBasic';
import ReviewList from './ReviewList';
import RecipeDirections from './RecipeDirections';
import RecipeIngredientsInfo from './RecipeIngredientsInfo';
import { Recipe } from './model';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

interface RecipeCompProps {
  recipe: Recipe;
}

function RecipeComp({
  recipe: {
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
  },
}: RecipeCompProps) {
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

export default RecipeComp;
