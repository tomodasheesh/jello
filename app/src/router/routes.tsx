import UserLayout from '../layouts/UserLayout';
import GuestLayout from '../layouts/GuestLayout';
import Landing from '../pages/Landing';
import Home from '../pages/Home';

import type { RouteObject } from 'react-router-dom';

export const ROUTES: RouteObject[] = [
  {
    path: '/home',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <Landing />
      }
    ]
  }
];