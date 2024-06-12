import { Checkbox, Grid, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Textarea from './Textarea';

interface CheckBoxInputProp {
  checked: boolean
  value: string
  onCheckChange: (checked: boolean) => void
  onValueChange: (newValue: string) => void
  onDelete: () => void
}

function CheckBoxInput({ checked, onCheckChange, value, onValueChange, onDelete }: CheckBoxInputProp) {


  return (
    <Grid container spacing={2}>
      <Grid item >
        <Checkbox
          checked={checked}
          onChange={(_, _checked) => onCheckChange(_checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
      <Grid item xs={8}>
        <Textarea
          label="New subtask"
          disabled={checked}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CheckBoxInput;