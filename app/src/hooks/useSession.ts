import { useEffect, useState } from 'react';
import { SUPABASE_APP_NAME } from '../lib/supabase';

export const useSession = () => {
  const [user, setUser] = useState();
  
  useEffect(() => {
    const sessionData = localStorage.getItem(`sb-${SUPABASE_APP_NAME}-auth-token`) ?? '{}';
    const data = JSON.parse(sessionData);
    if (data.user) setUser(data);
  }, []);

  return { user };
};