import { getTextQuery } from '../utils/index.js';
import { createClient } from '../supabase.js';
import { Router } from 'express';

const router = Router();

router.get('/list', async (req, res) => {
  const { search, sort } = req.query;

  const client = createClient({ req, res });
  let result = client.from('tasks').select('*');
  if (search) {
    result.textSearch('title', getTextQuery(search));
  }

  if (sort === '1') {
    result.order('dateCreated', { ascending: true })
  } else {
    result.order('sequence', { ascending: true })
  }

  const { data, error } = await result;

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

router.patch('/order', async (req, res) => {
  const client = createClient({ req, res });
  const { data, error } = await client.from('tasks').upsert(req.body.tasks)

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

router.post('/', async (req, res) => {
  const client = createClient({ req, res });
  const { data, error } = await client.from('tasks').insert(req.body).select();

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data: data && data[0]
  });
});

router.patch('/', async (req, res) => {
  const client = createClient({ req, res });
  const { data, error } = await client.from('tasks').update(req.body).eq('id', req.body.id)

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

router.delete('/', async (req, res) => {
  const client = createClient({ req, res });
  const { data, error } = await client.from('tasks').delete().eq('id', req.body.id)

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

export default router;
