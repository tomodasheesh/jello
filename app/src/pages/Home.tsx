import { useEffect, useMemo, useRef, useState } from 'react';
import Kanban from '../components/kanban/Kanban';
import type { Task, Status } from '../types/app.type';
import { getRandomId } from '../utils/helpers';
import { SwapVert } from '@mui/icons-material';
import { Grid, Typography, Button } from '@mui/material';
import SearchInput from '../components/ui/SearchInput';
import { api } from '../api';
import { useDebounce } from '../hooks/useDebounce';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const getTasksWithQuery = async (taskQuery: any) => {
  const query = new URLSearchParams(taskQuery);
  const url = `task/list?${query}`;
  return await api(url);
};

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sorted, setSorted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Grid container sx={{ mb: 2 }} spacing={1}>
        <Grid item xs={12} lg={4}>
          <Typography variant="h4">
            Project #1
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={2} alignItems="center" justifyContent={isMobile ? 'left' : 'end'}>
            <Grid item xs={6} sm="auto">
              <Button
                sx={{ width: '100%' }}
                variant={sorted ? 'contained' : 'outlined'}
                startIcon={<SwapVert />} 
                onClick={handleSortOnClick}
              >
                Sort by date
              </Button>
            </Grid>
            <Grid item xs={6} sm="auto">
              <Button sx={{ width: '100%' }} variant="contained" onClick={handleCreateTask}>Create Task</Button>
            </Grid>
            <Grid item xs={12} sm="auto">
              <SearchInput value={keyword} onChange={setKeyword} />
            </Grid>
          </Grid>
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