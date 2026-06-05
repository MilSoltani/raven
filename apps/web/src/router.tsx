import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './common/components/app.layout'
import { AuthGate, SigninPage, SignupPage } from './modules/auth'
import { HomePage } from './modules/home'
import { TicketPage, TicketsPage } from './modules/tickets'
import { UserPage, UsersPage } from './modules/users'

export const router = createBrowserRouter([
	{
		element: <AuthGate />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						path: '/',
						element: <HomePage />,
					},
					{
						path: '/tickets',
						element: <TicketsPage />,
					},
					{
						path: '/tickets/:id',
						element: <TicketPage />,
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
