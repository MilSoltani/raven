import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from './hooks/use-me'

export function AuthGate() {
  const { data: me, isLoading } = useMe()

  if (isLoading)
    return null

  if (!me) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return <Outlet />
}
