import { useState, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Chip, MenuItem, ClickAwayListener, Box, Popper } from '@mui/material';
import { Status } from '../../types/app.type';
import { STATUS_COLOR } from '../../constants';

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 150,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

export default function StatusPicker(props: { status: Status, onStatusChange: (newStatus: Status) => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleChange = (status: Status) => {
    props.onStatusChange(status);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'status-picker' : undefined;

  const statuses = Object.keys(STATUS_COLOR) as Status[];

  return (
    <>
      <Box>
        <Chip 
          label={props.status} 
          onClick={handleOpen} 
          color={STATUS_COLOR[props.status]} 
          variant="outlined"
        />
      </Box>
      <StyledPopper 
        id={id} 
        open={open} 
        anchorEl={anchorEl} 
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {
              statuses.map((status) => (
                <MenuItem key={status} onClick={() => handleChange(status)}>
                  <Chip
                    label={status} 
                    onClick={handleOpen} 
                    color={STATUS_COLOR[status]} 
                    variant="outlined"
                  />
                </MenuItem>
              ))
            }
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}
