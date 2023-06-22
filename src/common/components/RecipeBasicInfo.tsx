import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { Chip, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RecipeListView } from '../../models/recipe';
import Favorite from './Favorite';

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

const StyledImage = styled('img')({
  width: '100%',
  maxHeight: '852px',
  aspectRatio: '1',
});

interface RecipeBasicInfoProps
  extends Pick<
    RecipeListView,
    | 'id'
    | 'title'
    | 'description'
    | 'imageId'
    | 'cookingTime'
    | 'servings'
    | 'rating'
    | 'categories'
    | 'favorite'
  > {
  disableFavoriteInteraction?: boolean;
}

function RecipeBasicInfo({
  categories,
  cookingTime,
  description,
  rating,
  servings,
  title,
  imageId,
  favorite,
  id,
  disableFavoriteInteraction,
}: RecipeBasicInfoProps) {
  return (
    <div>
      {imageId && <StyledImage src={`/api/files/${imageId}`} alt={title} />}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">{title}</Typography>
        <Favorite
          favorite={favorite}
          recipeId={id}
          disabled={disableFavoriteInteraction}
        />
      </Stack>
      <Typography variant="body1">{description}</Typography>
      <TimeContainer>
        <AccessTimeIcon />
        <Typography variant="body1">
          {cookingTime.value}
          {cookingTime.unit}
        </Typography>
      </TimeContainer>
      <ServingsContainer>
        <TakeoutDiningIcon />
        <Typography variant="body1">{servings}</Typography>
      </ServingsContainer>
      <Typography variant="body1">
        <Rating value={rating} max={5} precision={0.5} readOnly />
      </Typography>
      <Stack direction="row" spacing={1}>
        {categories.map((category) => (
          <Chip key={category.id} label={category.categoryName} />
        ))}
      </Stack>
    </div>
  );
}

export default RecipeBasicInfo;
