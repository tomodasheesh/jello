import { useState } from 'react';
import { TextField, Box, IconButton, Button } from '@mui/material';
import { VisibilityOff, Visibility, Email } from '@mui/icons-material';
import { api } from '../../api';
import { client } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { data, error } = await api('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!error) {
      await client.auth.setSession({
        access_token: data.data.session.access_token,
        refresh_token: data.data.session.refresh_token
      });

      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          fullWidth
          label="Email" 
          variant="outlined"
          value={email}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(v => !v)}
                edge="end"
              >
                <Email />
              </IconButton>
            ),
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Password" 
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(v => !v)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Button type="submit" variant="contained" sx={{ width: '100%' }}>Login</Button>
      </Box>
    </form>
  );
}

export default LoginForm;