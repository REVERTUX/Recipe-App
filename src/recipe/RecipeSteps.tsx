import { Typography } from '@mui/material';
import { Recipe } from '../models/recipe';

type RecipeStepsProps = Pick<Recipe, 'steps'>;

function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <div>
      <Typography variant="h5">Steps:</Typography>
      {steps.map(({ id, step }) => (
        <p key={id}>{step}</p>
      ))}
    </div>
  );
}

export default RecipeSteps;
