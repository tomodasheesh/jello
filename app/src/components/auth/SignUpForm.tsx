import { useState } from 'react';
import { TextField, Box, IconButton, Button } from '@mui/material';
import { VisibilityOff, Visibility, Email } from '@mui/icons-material';

interface LoginFormProp {
  
}

function SignUpForm(props: LoginFormProp) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState(''); 

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log();
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

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Confirm Password" 
          variant="outlined"
          type={confirmPass ? 'text' : 'password'}
          value={confirmPass}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPass(v => !v)}
                edge="end"
              >
                {showConfirmPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Button type="submit" variant="contained" sx={{ width: '100%' }}>Login</Button>
      </Box>
    </form>
  );
}

export default SignUpForm;