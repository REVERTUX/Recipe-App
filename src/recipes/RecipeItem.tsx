import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { Chip, Paper, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { Recipe } from '../recipe/model';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textDecoration: 'none',

  ':hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const TimeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const ServingsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

interface RecipeItemProps {
  recipe: Recipe;
}

function RecipeItem({ recipe }: RecipeItemProps) {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <StyledPaper elevation={2}>
        <Typography variant="h3">{recipe.title}</Typography>
        <Typography variant="body1">{recipe.description}</Typography>
        <Typography variant="body1">
          <TimeContainer>
            <AccessTimeIcon />
            {recipe.cookingTime.value}
            {recipe.cookingTime.unit}
          </TimeContainer>
        </Typography>
        <Typography variant="body1">
          <ServingsContainer>
            <TakeoutDiningIcon />
            {recipe.servings}
          </ServingsContainer>
        </Typography>
        <Typography variant="body1">
          <Rating value={recipe.rating} max={5} precision={0.5} readOnly />
        </Typography>
        <Stack direction="row" spacing={1}>
          {recipe.categories.map((category) => (
            <Chip key={category} label={category} />
          ))}
        </Stack>
      </StyledPaper>
    </Link>
  );
}

export default RecipeItem;
