import { Snackbar as Toast, Alert } from '@mui/material';
import { useState } from 'react';

type Opts = { open?: boolean, message: string, color?: 'error' | 'warning' | 'success' | 'info' }
export const useSnackbar = () => {
  const [opts, setOpts] = useState<Opts>({
    open: false,
    message: '',
    color: undefined
  });

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpts((v) => ({ ...v, open: false }));
  };

  const handleOpen = (opts: Opts) => {
    setOpts({
      ...opts,
      open: true
    });
  };

  const Snackbar = () => (
    <Toast
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={opts.open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={opts.color}
        variant="filled"
        sx={{ width: '100%' }}
      >
        { opts.message }
      </Alert>
    </Toast>
  );

  return {
    handleOpen,
    Snackbar,
  };
};