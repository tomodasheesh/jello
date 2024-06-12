import { useMemo, useState } from 'react';
import Task from './Task';
import { Task as StateTask, Status } from '../../types/app.type';
import { Card, Chip, Button, Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Droppable } from '@hello-pangea/dnd';
import { STATUS_COLOR } from '../../constants';
interface TaskListProps {
  label: Status
  tasks: StateTask[]
  onClickAdd: (status: Status) => void;
  onTaskClick: (task: Task) => void
}

function TaskList({ label, tasks, onClickAdd, onTaskClick }: TaskListProps) {
  const chipColor = useMemo(() => {
    return STATUS_COLOR[label] as any;
  }, [label]);

  return (
    <Card sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Chip label={label.toUpperCase()} color={chipColor} />
      </Box>
      <Droppable droppableId={label}>
        {
          (provided: any) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                tasks.length ? 
                  tasks.map((task, index) => <Task key={task.id} task={task} index={index} onClick={onTaskClick} />) :
                  <Box component="section" sx={{ my: 2, p: 2, border: '1px dashed grey' }}>
                    <Typography color="grey">No tasks</Typography>
                  </Box> 
              }
              { provided.placeholder }
            </div>
          )
        }
      </Droppable>
      <Button variant="outlined" startIcon={<Add />} onClick={() => onClickAdd(label)}>Add Card</Button>
    </Card>
  );
}

export default TaskList;
