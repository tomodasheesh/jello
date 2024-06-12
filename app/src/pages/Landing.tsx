import { useState } from 'react';
import { Grid, Box, Card, Typography, CardContent, ButtonGroup, Button } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';

function Landing() {
  const [selected, setSelected] = useState('login');

  const label = selected === 'login' ? 'Login' : 'Sign Up';

  return (
    <Grid sx={{ height: '100%' }} container justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{ label } to Jello</Typography> 
          <Box sx={{ mt: 2, mb: 5, textAlign: 'center'  }}>
            <ButtonGroup variant="contained">
              <Button variant={selected === 'login' ? 'contained' : 'outlined'} onClick={() => setSelected('login')}>Login</Button>
              <Button variant={selected === 'sign-up' ? 'contained' : 'outlined'} onClick={() => setSelected('sign-up')}>Sign Up</Button>
            </ButtonGroup>
          </Box>

          {selected === 'login' ? <LoginForm /> : <SignUpForm />}
          
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Landing;