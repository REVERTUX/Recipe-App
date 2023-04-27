import { Typography, Skeleton } from '@mui/material';

function RecipeBasicPlaceholder() {
  return (
    <>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Typography variant="body1">
        <Skeleton />
      </Typography>
      <Typography variant="body1">
        <Skeleton />
      </Typography>
      <Typography variant="body1">
        <Skeleton />
      </Typography>
      <Typography variant="body1">
        <Skeleton />
      </Typography>
      <Skeleton height="32px" />
    </>
  );
}

export default RecipeBasicPlaceholder;
