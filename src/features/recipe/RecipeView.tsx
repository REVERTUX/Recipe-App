import { lazy, Suspense } from 'react';
import { Container, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import RecipeBasicInfo from '../../common/components/RecipeBasicInfo';
import { Recipe, RecipeSteps } from '../../models/recipe';
import ReviewsListView from '../reviews/ReviewsListView';
import RecipeBasicPlaceholder from './RecipeBasicPlaceholder';
import RecipeNutrientsView from './RecipeNutrientsView';
import RecipeNutrientsViewPlaceholder from './RecipeNutrientsViewPlaceholder';
import EditRecipeButton from './EditRecipeButton';
import Loader from '../../common/components/Loader';

const RecipeStepsView = lazy(() => import('./RecipeStepsView'));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

interface RecipeViewProps {
  recipe: Recipe | undefined;
  steps: RecipeSteps | undefined;
}

function RecipeView({ recipe, steps }: RecipeViewProps) {
  return (
    <StyledContainer maxWidth="md">
      {recipe ? (
        <>
          <EditRecipeButton recipe={recipe} steps={steps} />
          <RecipeBasicInfo
            title={recipe.title}
            description={recipe.description}
            imageId={recipe.imageId}
            cookingTime={recipe.cookingTime}
            categories={recipe.categories}
            rating={recipe.rating}
            servings={recipe.servings}
            favorite={recipe.favorite}
            id={recipe.id}
          />
          <RecipeNutrientsView nutrients={recipe.nutrients} />
          {steps && (
            <Suspense fallback={<Loader />}>
              <RecipeStepsView steps={steps} />
            </Suspense>
          )}
          <ReviewsListView recipeId={recipe.id} />
        </>
      ) : (
        <>
          <div>
            <RecipeBasicPlaceholder />
          </div>
          <RecipeNutrientsViewPlaceholder />
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
