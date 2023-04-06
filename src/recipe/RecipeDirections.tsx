import { Typography } from '@mui/material';
import { Recipe } from './model';

type RecipeDirectionsProps = Pick<Recipe, 'directions'>;

function RecipeDirections({ directions }: RecipeDirectionsProps) {
  return (
    <div>
      <Typography variant="h5">Steps:</Typography>
      {directions.map((direction) => (
        <p key={direction.substring(0, 20)}>{direction}</p>
      ))}
    </div>
  );
}

export default RecipeDirections;
