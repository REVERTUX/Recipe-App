import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Recipe } from './model';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
}));

type RecipeIngredientsInfoProps = Pick<Recipe, 'ingredients' | 'nutrition'>;

function RecipeIngredientsInfo({
  ingredients,
  nutrition,
}: RecipeIngredientsInfoProps) {
  return (
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
  );
}

export default RecipeIngredientsInfo;
