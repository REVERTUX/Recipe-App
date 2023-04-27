import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Pagination, Paper } from '@mui/material';

import RecipeItem from './RecipeListItem';
import { RecipeListView } from '../models/recipe';
import RecipeBasicPlaceholder from '../recipe/RecipeBasicPlaceholder';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textDecoration: 'none',

  ':hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

interface RecipesViewProps {
  recipes: RecipeListView[] | undefined;
  count: number | undefined;
  itemsPerPage: number;
  page: number;
  isFetching: boolean;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function RecipesView({
  recipes,
  count,
  itemsPerPage,
  page,
  isFetching,
  handlePageChange,
}: RecipesViewProps) {
  const getPlaceholderList = (quantity: number) => {
    const arr = [];
    for (let index = 0; index < quantity; index += 1) {
      arr.push(
        <StyledPaper>
          <RecipeBasicPlaceholder key={index} />
        </StyledPaper>
      );
    }

    return arr;
  };

  return (
    <WrapperContainer>
      <RecipesContainer>
        {isFetching || !recipes
          ? getPlaceholderList(itemsPerPage)
          : recipes.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
      </RecipesContainer>
      <Pagination
        count={Math.ceil((count || 0) / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
      />
    </WrapperContainer>
  );
}

export default RecipesView;
