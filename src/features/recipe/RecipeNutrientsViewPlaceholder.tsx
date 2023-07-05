import { Box, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledList = styled('ul')(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  margin: '0',
}));

function RecipeNutrientsViewPlaceholder() {
  return (
    <Box sx={{ display: 'flex' }}>
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

export default RecipeNutrientsViewPlaceholder;
