import type { Status, Color } from '../types/app.type';

export const STATUS_COLOR: Record<Status, Color> = {
  'To Do': 'info',
  'In Progress': 'warning',
  'Completed': 'success',
  'Trash': 'error'
};

export const DUMMY_MEMBERS = [
  {
    id: '1',
    image: '/1.jpg',
    email: 'john.doe@example.com'
  },
  {
    id: '2',
    image: '/2.jpg',
    email: 'jane.smith@example.com'
  },
  {
    id: '3',
    image: '/3.jpg',
    email: 'michael.johnson@example.com'
  },
  {
    id: '4',
    image: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
    email: 'emily.davis@example.com'
  },
  {
    id: '5',
    image: 'https://chic-content.co.uk/wp-content/uploads/2021/06/sample-avatar-002.jpg',
    email: 'david.wilson@example.com'
  },
  {
    id: '6',
    image: 'https://mui.com/static/images/avatar/5.jpg',
    email: 'emma.brown@example.com'
  }
];

export const DEFAULT_IMAGE = 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png';

