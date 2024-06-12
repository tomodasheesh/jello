import { Avatar, Card, CardContent, Typography, Grid } from '@mui/material';
import type { Task } from '../../types/app.type';
import { Draggable } from '@hello-pangea/dnd';
import { formatDate } from '../../utils/helpers';
interface TaskProp {
  task: Task
  index: number
  onClick: (task: Task) => void
}

function Task({ task, index, onClick }: TaskProp) {
  const date = formatDate(task.dateCreated);
  const subtask = task.subtasks ?? [];
  const subtaskCount = subtask.length;
  const subtaskDone = (subtask.filter((subtask) => subtask.done)).length;
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {
        (provided: any) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => onClick(task)}
          >
            <Card sx={{ my: 2 }} variant="outlined">
              <CardContent>
                <Typography variant="body1" component="div">
                  { task.title }
                </Typography>

                <Grid
                  sx={{ mt: 1.5 }} 
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Avatar src={task.assignee} />
                  </Grid>
                  <Grid>
                    <Typography variant="body2">
                      { date }
                    </Typography>
                    <Typography variant="caption">{`${subtaskDone}/${subtaskCount}`} subtask</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        )
      }
    </Draggable>
    
  );
}

export default Task;