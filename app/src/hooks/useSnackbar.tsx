import { Snackbar as Toast, Alert } from '@mui/material';
import { useState, memo, useCallback } from 'react';

type Opts = { open?: boolean, message: string, color?: 'error' | 'warning' | 'success' | 'info' }
export const useSnackbar = () => {
  const [opts, setOpts] = useState<Opts>({
    open: false,
    message: '',
    color: undefined
  });

  const handleClose = useCallback((_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpts((v) => ({ ...v, open: false }));
  }, []);

  const handleOpen = useCallback((opts: Opts) => {
    setOpts({
      ...opts,
      open: true
    });
  }, []);

  const Snackbar = memo(() => (
    <Toast
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={opts.open}
      autoHideDuration={2000}
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
  ));

  return {
    handleClose,
    handleOpen,
    Snackbar,
  };
};