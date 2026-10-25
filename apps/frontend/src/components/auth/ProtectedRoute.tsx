import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const session = localStorage.getItem('nexcera-session')

  if (!session) {
    return <Navigate to="/login" replace />
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(session)
  } catch {
    localStorage.removeItem('nexcera-session')
    return <Navigate to="/login" replace />
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('name' in parsed) ||
    !('email' in parsed) ||
    typeof parsed.name !== 'string' ||
    typeof parsed.email !== 'string' ||
    !parsed.name.trim() ||
    !parsed.email.trim()
  ) {
    localStorage.removeItem('nexcera-session')
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
