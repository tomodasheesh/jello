import { Grid, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function UserLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} lg={8}>
        <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ p: 3, maxWidth: '850px' }}>
            <img width="100%" src="/landing.png" alt="Landing" />
            <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight="600">
              <span style={{ color: blue[300] }}>Jello</span> brings all your tasks, teammates, and tools together
            </Typography>
            <Typography variant="body1">
              Keep everything in the same place—even if your team isn’t.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Box sx={{ p: 5, height: '100%', backgroundColor: blue[900] }}>
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
