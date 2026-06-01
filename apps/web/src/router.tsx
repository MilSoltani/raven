import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './common/components/app.layout'
import { AppSidebar } from './common/components/app.sidebar'
import { AuthGate, SigninPage, SignupPage } from './modules/auth'
import { HomePage } from './modules/home'
import { UsersPage } from './modules/users'
import { UserPage } from './modules/users/pages/user.page'

export const router = createBrowserRouter([
	{
		element: <AuthGate />,
		children: [
			{
				element: <AppLayout sidebar={<AppSidebar />} />,
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
