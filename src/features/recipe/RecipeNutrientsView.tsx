import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Recipe } from '../../models/recipe';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
}));

type RecipeNutrientsViewProps = Pick<Recipe, 'nutrients'>;

function RecipeNutrientsView({ nutrients }: RecipeNutrientsViewProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
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

export default RecipeNutrientsView;
