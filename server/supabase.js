import { createServerClient } from '@supabase/ssr';

const supabaseURL = 'https://wehanoluwmobftbdvyis.supabase.co';
const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlaGFub2x1d21vYmZ0YmR2eWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxODEyNDksImV4cCI6MjAzMzc1NzI0OX0.dqTUF9TRpipRcrn2fxeIzFya04rErV7B2kcoeGg1Hno';
export const createClient = (context) => {
  return createServerClient(supabaseURL, publicKey, {
    cookies: {
      get: (key) => {
        const cookies = context.req.cookies ?? {};
        const cookie = cookies[key] ?? '';
        return decodeURIComponent(cookie);
      },
      set: (key, value, options) => {
        if (!context.res) return;
        context.res.cookie(key, encodeURIComponent(value), {
          ...options,
          sameSite: 'Lax',
          httpOnly: true,
        });
      },
      remove: (key, options) => {
        if (!context.res) return;
        context.res.cookie(key, '', { ...options, httpOnly: true });
      },
    },
  });
};
