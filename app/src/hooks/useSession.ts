import { SUPABASE_APP_NAME } from '../lib/supabase';

export const useSession = () => {
  const sessionData = localStorage.getItem(`sb-${SUPABASE_APP_NAME}-auth-token`) ?? '{}';
  const data = JSON.parse(sessionData);
  return { user: data.user };
};