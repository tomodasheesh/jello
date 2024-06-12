import { useEffect, useMemo, useRef, useState } from 'react';
import Kanban from '../components/kanban/Kanban';
import type { Task, Status } from '../types/app.type';
import { getRandomId } from '../utils/helpers';
import { SwapVert } from '@mui/icons-material';
import { Grid, Typography, Button, Box } from '@mui/material';
import SearchInput from '../components/ui/SearchInput';
import { api } from '../api';
import { useDebounce } from '../hooks/useDebounce';

const getTasksWithQuery = async (taskQuery: any) => {
  const query = new URLSearchParams(taskQuery);
  const url = `task/list?${query}`;
  return await api(url);
};

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sorted, setSorted] = useState(false);

  const kanban = useRef<{ showCreateTask: () => void }>(null);

  useDebounce(async () => {
    const { data, error } = await getTasksWithQuery({ search: keyword });
    if (!error) {
      setTasks(data.data);
    }
  }, 500, [keyword]);

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
    const { data, error } = await api('task/list');
    if (!error) setTasks(data.data);
  };

  const handleCreateTask = () => {
    kanban.current?.showCreateTask();
  };

  const handleSortOnClick = async () => {
    setSorted(v => !v);
    const { data, error } = await getTasksWithQuery({
      sort: sorted ? 0 : 1
    });
    if (!error) setTasks(data.data);
  };

  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} lg={4}>
          <Typography variant="h4">
            Project #1
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box display="flex" alignItems="center" justifyContent="end">
            <Box sx={{ mr: 1 }}>
              <Button 
                variant={sorted ? 'contained' : 'outlined'}
                startIcon={<SwapVert />} 
                onClick={handleSortOnClick}
              >
                Sort by date
              </Button>
            </Box>
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