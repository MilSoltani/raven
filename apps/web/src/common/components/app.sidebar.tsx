import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'

export function AppSidebar() {
	return (
		<div className="min-h-screen flex flex-col gap-2">
			<Link to="/" viewTransition>
				Home
			</Link>
			<Link to="/users" viewTransition>
				Users
			</Link>
			<Link to="/signin" viewTransition>
				SignIn
			</Link>
			<Link to="/signout" viewTransition>
				SingOut
			</Link>
			<Link to="/signup" viewTransition>
				SingUp
			</Link>

			<ModeToggle />
		</div>
	)
}
