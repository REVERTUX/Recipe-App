import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Box, Pagination, Paper } from '@mui/material';

import RecipeItem from './RecipeListItem';
import { RecipeListView } from '../../models/recipe';
import RecipeBasicPlaceholder from '../recipe/RecipeBasicPlaceholder';

const RecipesContainer = styled('div')(({ theme }) => ({
  width: '100%',
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
        <StyledPaper key={index}>
          <RecipeBasicPlaceholder />
        </StyledPaper>
      );
    }

    return arr;
  };

  const renderContent = () => {
    if (isFetching || !recipes) {
      return getPlaceholderList(itemsPerPage);
    }

    if (recipes.length === 0) {
      return (
        <Box
          sx={{ textAlign: 'center', padding: (theme) => theme.spacing(2, 0) }}
        >
          No results
        </Box>
      );
    }

    return recipes.map((recipe) => (
      <RecipeItem key={recipe.id} recipe={recipe} />
    ));
  };

  return (
    <WrapperContainer>
      <RecipesContainer>{renderContent()}</RecipesContainer>
      <Pagination
        count={Math.ceil((count || 0) / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
      />
    </WrapperContainer>
  );
}

export default RecipesView;
