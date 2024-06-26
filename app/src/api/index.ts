const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const api = async (route: string, init?: RequestInit) => {
  try {
    const controller = new AbortController();
    const resp = await fetch(`${API_BASE_URL}/${route}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
      signal: controller.signal
    });
    const json = await resp.json();
    return { data: json, error: !json.success, abort: controller.abort };
  } catch (error) {
    return { data: null, error };
  }
};