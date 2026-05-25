import { Link } from 'react-router-dom'

export function AppSidebar() {
  return (
    <div className="min-h-screen flex flex-col gap-2">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/signin">SignIn</Link>
      <Link to="/signout">SingOut</Link>
      <Link to="/signup">SingUp</Link>
    </div>
  )
}
