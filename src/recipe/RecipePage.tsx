import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { recipe } from '../services/mock-recipe';
import RecipeBasic from './RecipeBasic';
import ReviewList from './ReviewList';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
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
    <Container maxWidth="md">
      <RecipeBasic
        title={title}
        description={description}
        cookingTime={cookingTime}
        categories={categories}
        rating={rating}
        servings={servings}
      />
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5">Ingredients:</Typography>
          <StyledList>
            {ingredients.map(({ amount, name, unit }) => (
              <li key={name}>
                {name} {amount} {unit}
              </li>
            ))}
          </StyledList>
        </div>
        <div>
          <Typography variant="h5">Nutrition:</Typography>
          <StyledList>
            {Object.entries(nutrition).map(([key, value]) => (
              <li key={key}>
                {key} {value}g
              </li>
            ))}
          </StyledList>
        </div>
      </Box>
      <br />
      <Typography variant="h5">Steps:</Typography>
      {directions.map((direction) => (
        <p key={direction.substring(0, 20)}>{direction}</p>
      ))}
      <ReviewList reviews={reviews} />
    </Container>
  );
}

export default RecipePage;
