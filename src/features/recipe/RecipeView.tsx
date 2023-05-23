import { Container, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import RecipeBasicInfo from '../../common/components/RecipeBasicInfo';
import RecipeSteps from './RecipeSteps';
import RecipeIngredientsInfo from './RecipeIngredientsInfo';
import { Recipe } from '../../models/recipe';
import ReviewsListView from '../reviews/ReviewsListView';
import RecipeBasicPlaceholder from './RecipeBasicPlaceholder';
import RecipeIngredientsInfoPlaceholder from './RecipeIngredientsInfoPlaceholder';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

interface RecipeViewProps {
  recipe: Recipe | undefined;
}

function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <StyledContainer maxWidth="md">
      {recipe ? (
        <>
          <RecipeBasicInfo
            title={recipe.title}
            description={recipe.description}
            imageId={recipe.imageId}
            cookingTime={recipe.cookingTime}
            categories={recipe.categories}
            rating={recipe.rating}
            servings={recipe.servings}
          />
          <RecipeIngredientsInfo
            ingredients={recipe.ingredients}
            nutrients={recipe.nutrients}
          />
          <RecipeSteps steps={recipe.steps} />
          <ReviewsListView recipeId={recipe.id} />
        </>
      ) : (
        <>
          <div>
            <RecipeBasicPlaceholder />
          </div>
          <RecipeIngredientsInfoPlaceholder />
          <div>
            <Typography variant="h5">
              <Skeleton />
            </Typography>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
              <p key={idx}>
                <Skeleton />
              </p>
            ))}
          </div>
        </>
      )}
    </StyledContainer>
  );
}

export default RecipeView;
