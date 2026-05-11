import { createBrowserRouter } from 'react-router-dom'
import { AuthGate, LoginPage } from './modules/auth'
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
    path: '/login',
    element: <LoginPage />,
  },
])
