import { createBrowserRouter } from 'react-router-dom'
import { AuthGate, SigninPage, SignupPage } from './modules/auth'
import { HomePage } from './modules/home'
import { UserPage, UsersPage } from './modules/users'

export const router = createBrowserRouter([
  {
    element: <AuthGate />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserPage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
])
