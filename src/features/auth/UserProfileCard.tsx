import { Paper, Typography, TextField, Grid, Box } from '@mui/material';
import { User } from '../../models/user';

interface UserProfileCardProps {
  user: User;
}

function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Paper elevation={1}>
      <Box padding={2} height="50%">
        <Typography variant="h6" pb={4}>
          General information
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <TextField fullWidth disabled value={user?.email} label="name" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth disabled value={user?.name} label="email" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default UserProfileCard;
