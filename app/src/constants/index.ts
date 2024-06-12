import type { Status, Color } from '../types/app.type';

export const STATUS_COLOR: Record<Status, Color> = {
  'To Do': 'info',
  'In Progress': 'warning',
  'Completed': 'success',
  'Trash': 'error'
};
