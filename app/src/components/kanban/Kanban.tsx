import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Grid } from '@mui/material';
import TaskList from './TaskList';
import { DragDropContext } from '@hello-pangea/dnd';
import type { Status, Task, Nullable } from '../../types/app.type';
import TaskDialog from '../task-dialog/TaskDialog';
import { useKanban } from '../../hooks/useKanban';
import { getRandomId } from '../../utils/helpers';

interface KanbanProps {
  defaultToDo: Task[]
  defaultInProgress: Task[]
  defaultCompleted: Task[]
  defaultTrash: Task[]
}

const getDefaultTask = (status?: Status): Nullable<Task> => ({
  id: getRandomId(),
  dateCreated: null,
  assignee: null,
  description: null,
  project: null,
  status: status ?? 'To Do',
  subtasks: [],
  title: null,
  attachments: []
});

const Kanban = forwardRef(({ defaultToDo, defaultInProgress, defaultCompleted, defaultTrash }: KanbanProps, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(getDefaultTask());
  const isAdding = useRef(false);

  const { handleDragEnd, moveItem, getNewArrayFrom, setNewState, todo, inProgress, completed, trash } = useKanban({
    todoArg: defaultToDo,
    inProgressArg: defaultInProgress,
    completedArg: defaultCompleted,
    trashArg: defaultTrash
  });

  const handleOnCancel = () => {
    setOpen(false);
    isAdding.current = false;
  };

  const handleOnSave = (newTask: Task) => {
    setOpen(false);
    if (isAdding.current) {
      const tasks = getNewArrayFrom(newTask.status) ?? [];
      setNewState(newTask.status, [newTask, ...tasks]);
      return;
    }

    const oldTask = selectedTask;
    const fromArray = getNewArrayFrom(oldTask.status ?? 'To Do');
    if (!fromArray) return;
    const fromIndex = fromArray.findIndex((task) => task.id === oldTask.id);

    moveItem(oldTask.status ?? 'To Do', newTask.status, fromIndex, 0, newTask.id, newTask);
    setSelectedTask(getDefaultTask());
  };

  const handleOnAddCard = (status: Status) => {
    isAdding.current = true;
    setOpen(true);
    setSelectedTask(getDefaultTask(status));
  };

  const handleTaskClick = (task: Task) => {
    setOpen(true);
    setSelectedTask(task);
  };

  useImperativeHandle(ref, () => ({
    showCreateTask: () => handleOnAddCard('To Do')
  }), []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <TaskList label="To Do" tasks={todo} onClickAdd={handleOnAddCard} onTaskClick={handleTaskClick}/>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <TaskList label="In Progress" tasks={inProgress} onClickAdd={handleOnAddCard} onTaskClick={handleTaskClick} />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <TaskList label="Completed" tasks={completed} onClickAdd={handleOnAddCard} onTaskClick={handleTaskClick} />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <TaskList label="Trash" tasks={trash} onClickAdd={handleOnAddCard} onTaskClick={handleTaskClick} />
        </Grid>
      </Grid>

      <TaskDialog
        key={`${selectedTask.id}-${selectedTask.status}`}
        open={open} 
        task={selectedTask} 
        onCancel={handleOnCancel}
        onSave={handleOnSave}
      />
    </DragDropContext>
  );
});

export default Kanban;