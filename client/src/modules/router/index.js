import { createBrowserRouter } from 'react-router-dom';
import { Tables, Menu, Orders, SignIn } from '../../pages';

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
]);

export const NonLoggedInRouter = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
]);
