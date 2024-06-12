import { useEffect, useMemo, useRef, useState } from 'react';
import Kanban from '../components/kanban/Kanban';
import type { Task, Status } from '../types/app.type';
import { getRandomId } from '../utils/helpers';
import { Grid, Typography, Button, Box } from '@mui/material';
import SearchInput from '../components/ui/SearchInput';
import { useDebounce } from '../hooks/useDebounce';

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [keyword, setKeyword] = useState('');
  const kanban = useRef<{ showCreateTask: () => void }>(null);

  useDebounce(() => {
    console.log(1);
  }, 800, [keyword]);

  useEffect(() => {
    getTasks();
  }, []);

  const defaultTasks = useMemo(() => {
    const _defaultTasks: Record<Status, Task[]> & Record<'id', string> = {
      'In Progress': [],
      'To Do': [],
      Completed: [],
      Trash: [],
      id: getRandomId()
    };
    for (const task of tasks) {
      const statusTask = _defaultTasks[task.status];
      if (statusTask) {
        statusTask.push(task);
      }
    }
    return _defaultTasks;
  }, [tasks]);

  const getTasks = async () => {
    setTasks([
      {
        assignee: '/1.jpg',
        dateCreated: '2024-10-04',
        status: 'In Progress',
        id: '1',
        project: 'Project #1',
        title: 'React Task Management Demo',
        description: 'A quick brown fox jumped over a lazy dog',
        subtasks: [],
        attachments: []
      },
      {
        assignee: '/2.jpg',
        dateCreated: '2024-10-04',
        status: 'In Progress',
        id: '2',
        project: 'Project #1',
        title: 'React Task Management Demo',
        description: 'A quick brown fox jumped over a lazy dog',
        subtasks: [],
        attachments: []
      },
      {
        assignee: '/3.jpg',
        dateCreated: '2024-10-04',
        status: 'In Progress',
        id: '3',
        project: 'Project #1',
        title: 'React Task Management Demo',
        description: 'A quick brown fox jumped over a lazy dog',
        subtasks: [],
        attachments: []
      }
    ]);
  };

  const handleCreateTask = () => {
    kanban.current?.showCreateTask();
  };

  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h4">
            Project Name
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center" justifyContent="end">
            <Box sx={{ mr: 1 }}>
              <Button variant="contained" onClick={handleCreateTask}>Create Task</Button>
            </Box>
            <Box>
              <SearchInput value={keyword} onChange={setKeyword} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Kanban
        key={defaultTasks.id}
        ref={kanban}
        defaultToDo={defaultTasks['To Do']}
        defaultInProgress={defaultTasks['In Progress']}
        defaultCompleted={defaultTasks['Completed']}
        defaultTrash={defaultTasks['Trash']}
      />
    </>
  );
}

export default Home;