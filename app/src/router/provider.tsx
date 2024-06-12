import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ROUTES } from './routes';

const router = createBrowserRouter(ROUTES);

export const PageRouteProvider = () => {
  return (<RouterProvider router={router} />);
};
