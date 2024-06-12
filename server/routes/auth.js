import { Router } from 'express';
import { createClient } from '../supabase.js';
const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const client = createClient({ req, res });
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

router.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;
  const client = createClient({ req, res });
  const { data, error } = await client.auth.signUp({
    email,
    password,
  })

  res.json({
    success: !error,
    message: error?.message ?? 'Success',
    data
  })
});

export default router;
