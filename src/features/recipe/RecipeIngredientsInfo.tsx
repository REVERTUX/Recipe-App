import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Recipe } from '../../models/recipe';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
}));

type RecipeIngredientsInfoProps = Pick<Recipe, 'ingredients' | 'nutrients'>;

function RecipeIngredientsInfo({
  ingredients,
  nutrients,
}: RecipeIngredientsInfoProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <Typography variant="h5">Ingredients:</Typography>
        <StyledList>
          {ingredients.map(
            ({
              amount,
              ingredientName,
              ingredientUnitName,
              description,
              id,
            }) => (
              <li key={id}>
                {ingredientName} {amount === 0 ? '' : amount}{' '}
                {ingredientUnitName} {description}
              </li>
            )
          )}
        </StyledList>
      </div>
      <div>
        <Typography variant="h5">Nutrients:</Typography>
        <StyledList>
          {Object.entries(nutrients).map(([key, value]) => (
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
