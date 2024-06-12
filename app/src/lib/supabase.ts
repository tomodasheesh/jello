import { createClient } from '@supabase/supabase-js';

export const SUPABASE_APP_NAME = 'wehanoluwmobftbdvyis';
const SUPABASE_URL = `https://${SUPABASE_APP_NAME}.supabase.co`;
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlaGFub2x1d21vYmZ0YmR2eWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxODEyNDksImV4cCI6MjAzMzc1NzI0OX0.dqTUF9TRpipRcrn2fxeIzFya04rErV7B2kcoeGg1Hno';
export const client = createClient(SUPABASE_URL, PUBLIC_KEY);