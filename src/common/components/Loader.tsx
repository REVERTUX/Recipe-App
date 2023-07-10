import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  height?: string;
}

function Loader({ height }: LoaderProps) {
  return (
    <Box
      width="100%"
      height={height || '100%'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
