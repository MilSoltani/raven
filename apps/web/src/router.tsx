import { createBrowserRouter } from 'react-router-dom'
import { AuthGate, SigninPage, SignupPage } from './modules/auth'
import { HomePage } from './modules/home'

export const router = createBrowserRouter([
  {
    element: <AuthGate />,
    children: [
      {
        path: '/',
        element: <HomePage />,
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
