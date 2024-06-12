import { Grid, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={8}>
        <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ p: 3, maxWidth: '600px' }}>
            <Typography variant="h2">
            Jello brings all your tasks, teammates, and tools together
            </Typography>
            <Typography variant="h6">
            Keep everything in the same place—even if your team isn’t.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box sx={{ height: '100%', backgroundColor: 'grey'}}>
          <Outlet />
        </Box>
      </Grid>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3}}
      >
        <Outlet />
      </Box> */}
    </Grid>
  );
}
