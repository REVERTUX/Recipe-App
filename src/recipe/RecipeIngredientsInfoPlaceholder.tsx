import { Box, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
}));

function RecipeIngredientsInfoPlaceholder() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Typography variant="h5">
          <Skeleton />
        </Typography>
        <StyledList>
          {[1, 2, 3, 4, 5].map((idx) => (
            <Skeleton key={idx} width="200px" />
          ))}
        </StyledList>
      </div>
      <div>
        <Typography variant="h5">
          <Skeleton />
        </Typography>
        <StyledList>
          {[1, 2, 3].map((idx) => (
            <Skeleton key={idx} width="100px" />
          ))}
        </StyledList>
      </div>
    </Box>
  );
}

export default RecipeIngredientsInfoPlaceholder;
