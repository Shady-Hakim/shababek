import { createBrowserRouter } from 'react-router-dom';
import { Tables, Menu, Orders, SignIn } from '../../pages';
import NotFound from '../../pages/NotFound';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Tables />,
  },
  {
    path: '/tables/:tableNumber',
    element: <Menu />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const NonLoggedInRouter = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
