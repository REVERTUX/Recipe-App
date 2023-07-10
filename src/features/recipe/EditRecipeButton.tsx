import { IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import { useAppSelector } from '../../app/hooks';
import { Recipe, RecipeSteps } from '../../models/recipe';

interface EditRecipeButtonProps {
  recipe: Recipe | undefined;
  steps: RecipeSteps | undefined;
}

function EditRecipeButton({ recipe, steps }: EditRecipeButtonProps) {
  const { isLogged } = useAppSelector((state) => state.auth);

  return (
    <Box textAlign="right">
      {isLogged && recipe && (
        <Link to={`/recipes/${recipe.id}/edit`} state={{ recipe, steps }}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
      )}
    </Box>
  );
}

export default EditRecipeButton;
