import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RecipeListView } from '../../models/recipe';
import RecipeBasicInfo from '../../common/components/RecipeBasicInfo';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textDecoration: 'none',

  ':hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

interface RecipeListItemProps {
  recipe: RecipeListView;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  const { categories, cookingTime, description, id, rating, servings, title } =
    recipe;
  return (
    <Link to={`/recipes/${id}`} state={recipe}>
      <StyledPaper>
        <RecipeBasicInfo
          categories={categories}
          cookingTime={cookingTime}
          description={description}
          rating={rating}
          servings={servings}
          title={title}
        />
      </StyledPaper>
    </Link>
  );
}

export default RecipeListItem;
