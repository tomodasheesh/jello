import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskDialog from '../task-dialog/TaskDialog';
import { Grid } from '@mui/material';
import TaskList from './TaskList';

import { useSnackbar } from '../../hooks/useSnackbar';
import { useKanban } from '../../hooks/useKanban';
import { getRandomId } from '../../utils/helpers';
import { api } from '../../api';

import type { Status, Task, Nullable } from '../../types/app.type';
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
  attachments: [],
  sequence: 0
});

const saveTask = async (task: Task, create?: boolean) => {
  const getPayload = () => {
    const payload: Record<string, any> = {
      assignee: task.assignee,
      description: task.description,
      project: task.project,
      status: task.status,
      subtasks: task.subtasks,
      title: task.title,
      attachments: task.attachments,
      sequence: task.sequence
    };
    if (!create) {
      payload.id = task.id;
    }
    return payload;
  };

  return await api('task', {
    method: create ? 'POST' : 'PATCH',
    body: JSON.stringify(getPayload())
  });
};

const deleteTask = async (id: string) => {
  return await api('task', {
    method: 'DELETE',
    body: JSON.stringify({ id })
  });
};

const Kanban = forwardRef(({ defaultToDo, defaultInProgress, defaultCompleted, defaultTrash }: KanbanProps, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(getDefaultTask());
  const isAdding = useRef(false);

  const { Snackbar, handleOpen } = useSnackbar();

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

  const handleOnSave = async (newTask: Task) => {
    setOpen(false);
    if (isAdding.current) {
      handleOpen({
        color: 'info',
        message: 'Saving...'
      });

      const tasks = getNewArrayFrom(newTask.status) ?? [];
      const { data, error } = await saveTask(newTask, true);
      if (!error) {
        isAdding.current = false;
        setNewState(newTask.status, [
          {
            ...newTask,
            dateCreated: data.data.dateCreated,
            id: data.data.id
          },
          ...tasks
        ]);
      }

      handleOpen({
        color: error ? 'error' : 'success',
        message: error ? data.message : 'Created a new task'
      });
      return;
    }

    setOpen(false);
    const oldTask = selectedTask;
    const fromArray = getNewArrayFrom(oldTask.status ?? 'To Do');
    if (!fromArray) return;
    const fromIndex = fromArray.findIndex((task) => task.id === oldTask.id);

    moveItem(oldTask.status ?? 'To Do', newTask.status, fromIndex, 0, newTask.id, newTask);
    saveTask(newTask);
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

  const handleOnDelete = (id: string) => {
    setOpen(false);
    const newTasks = trash.filter((task) => task.id !== id);
    setNewState('Trash', newTasks);
    deleteTask(id);
  };

  const handleDragStop = (context: any) => {
    handleDragEnd(context, (tasks) => {
      if (tasks) {
        api('task/order', {
          method: 'PATCH',
          body: JSON.stringify({ tasks })
        });
      }
    });
  };

  useImperativeHandle(ref, () => ({
    showCreateTask: () => handleOnAddCard('To Do')
  }), []);

  return (
    <DragDropContext onDragEnd={handleDragStop}>
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
        onDelete={handleOnDelete}
      />

      <Snackbar></Snackbar>
    </DragDropContext>
  );
});

export default Kanban;