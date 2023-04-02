import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';

import { recipes } from '../services/mock-recipe';
import { useGetRecipesQuery } from '../services/recipe';
import RecipeItem from './RecipeItem';

const RecipesContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
}));

const WrapperContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

function Recipes() {
  // const { data: recipes, isLoading, isFetching } = useGetRecipesQuery();

  // if (isLoading) return null;
  // if (!isFetching) return null;

  return (
    <WrapperContainer>
      <RecipesContainer>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </RecipesContainer>
      <Pagination count={Math.ceil(recipes.length / 10)} />
    </WrapperContainer>
  );
}

export default Recipes;
