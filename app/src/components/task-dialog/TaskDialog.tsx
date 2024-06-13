import { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import CheckBoxInput from '../ui/CheckBoxInput';
import type { Task, Nullable } from '../../types/app.type';
import Textarea from '../ui/Textarea';
import StatusPicker from './StatusPicker';
import { Add } from '@mui/icons-material';
import { getRandomId } from '../../utils/helpers';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DUMMY_MEMBERS, DEFAULT_IMAGE } from '../../constants';
import { useSession } from '../../hooks/useSession';

interface TaskDialogProp {
  open: boolean
  task: Nullable<Task>
  onCancel: () => void
  onSave: (newTask: Task) => void
  onDelete: (id: string) => void
}

function TaskDialog({ open, task, onCancel, onSave, onDelete }: TaskDialogProp) {
  const [newTask, setNewTask] = useState<Nullable<Task>>({
    ...task,
    title: task.title ?? 'Add title here',
    description: task.description ?? 'Add description here'
  });
  const { user } = useSession();

  const MEMBERS: any = [...DUMMY_MEMBERS, {
    id: user?.id,
    email: user?.email,
    image: DEFAULT_IMAGE
  }];


  const updateField = (field: keyof Nullable<Task>, value: any) => {
    setNewTask((_newTask) => {
      return {
        ..._newTask,
        [field]: value
      };
    });
  };

  const handleOnSave = () => {
    onSave({
      ...newTask,
      assignee: newTask.assignee ?? DEFAULT_IMAGE
    } as Task);
  };

  const handleOnDelete = () => {
    if (task.id) onDelete(task.id);
  };

  const handleSubtaskChange = (id: string, field: string, newValue: any) => {
    const subtasks = newTask.subtasks ?? [];
    const newSubtasks = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return {
          ...subtask,
          [field]: newValue
        };
      }
      return subtask;
    });
    updateField('subtasks', newSubtasks);
  };

  const handleAddSubtasks = () => {
    const subtasks = newTask.subtasks ?? [];
    const newSubtasks = [...subtasks, {
      id: getRandomId(),
      title: '',
      done: false
    }];
    updateField('subtasks', newSubtasks);
  };

  const handleDeleteSubtasks = (id: string) => {
    const subtasks = newTask.subtasks ?? [];
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    updateField('subtasks', newSubtasks);
  };

  const handleAssignee = (e: any) => {
    updateField('assignee', e.target.value);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: fullScreen ? undefined : '90vh' } }}
      maxWidth={!fullScreen && 'sm'}
      open={open}
    >
      <DialogContent>
        <Box>
          <Textarea label="Title" value={newTask.title ?? ''} onChange={(e) => updateField('title', e.target.value)}></Textarea>
        </Box>
        <Box sx={{ mt: 2}}>
          <Textarea label="Description" value={newTask.description ?? ''} onChange={(e) => updateField('description', e.target.value)} minRows={4}></Textarea>
        </Box>

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" fontWeight="600">Assignee</Typography>
          <Select
            id="assignee"
            value={newTask.assignee ?? DEFAULT_IMAGE}
            label="Members"
            onChange={handleAssignee}
          >
            {
              MEMBERS.map((member: any) => (
                <MenuItem key={member.id} value={member.image}>{ member.email }</MenuItem>
              ))
            }
          </Select>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" fontWeight="600">Task Status</Typography>
          <StatusPicker status={newTask.status ?? 'To Do'} onStatusChange={(e) => updateField('status', e)}></StatusPicker>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" fontWeight="600">Subtask</Typography>
          {
            newTask.subtasks?.map((subtask) => (
              <Box sx={{ mt: 1 }} key={subtask.id}>
                <CheckBoxInput
                  checked={subtask.done} 
                  value={subtask.title} 
                  onCheckChange={(e) => handleSubtaskChange(subtask.id, 'done', e)}
                  onValueChange={(e) => handleSubtaskChange(subtask.id, 'title', e)}
                  onDelete={() => handleDeleteSubtasks(subtask.id)}
                />
              </Box>
            ))
          }
          <Button startIcon={<Add />} onClick={handleAddSubtasks}>Add Subtask</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        { task.status === 'Trash' && <Button variant="contained" color="error" onClick={handleOnDelete}>Delete</Button> }
        <Button variant="contained" onClick={handleOnSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDialog;