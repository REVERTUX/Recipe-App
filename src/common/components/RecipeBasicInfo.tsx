import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { Chip, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Recipe } from '../../models/recipe';

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

type RecipeBasicInfoProps = Pick<
  Recipe,
  | 'title'
  | 'description'
  | 'imageId'
  | 'cookingTime'
  | 'servings'
  | 'rating'
  | 'categories'
>;

function RecipeBasicInfo({
  categories,
  cookingTime,
  description,
  rating,
  servings,
  title,
  imageId,
}: RecipeBasicInfoProps) {
  return (
    <div>
      {imageId && <StyledImage src={`/api/files/${imageId}`} alt={title} />}
      <Typography variant="h3">{title}</Typography>
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
        {categories.map(({ categoryName, id }) => (
          <Chip key={id} label={categoryName} />
        ))}
      </Stack>
    </div>
  );
}

export default RecipeBasicInfo;
