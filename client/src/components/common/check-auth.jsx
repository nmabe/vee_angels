import { Navigate, useLocation } from 'react-router-dom'

function CheckAuthentication({ isAuthenticated, user, children }) {
  const ageVerified =
    typeof window !== 'undefined' ? localStorage.getItem('ageVerified') : null
  const location = useLocation()
  // 👤 Get user role safely

  // 🎂 Age verification check (apply to all routes except auth and age-verification)

  if (
    !ageVerified &&
    !location.pathname.includes('/signIn') &&
    !location.pathname.includes('/signUp') &&
    !location.pathname.includes('/age-verification')
  ) {
    return (
      <Navigate to="/age-verification" state={{ from: location }} replace />
    )
  }

  if (
    !isAuthenticated &&
    (location.pathname === '/' ||
      location.pathname.includes('/angels/applications') ||
      location.pathname.includes('/angels/home') ||
      location.pathname.includes('/angels/angels'))
  ) {
    return <>{children}</>
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes('/signIn') ||
      location.pathname.includes('/signUp') ||
      location.pathname.includes('/age-verification') ||
      location.pathname.includes('/unauth-page')
    )
  ) {
    return <Navigate to="/auth/signIn" state={{ from: location }} replace />
  }

  if (
    isAuthenticated &&
    (location.pathname.includes('/signIn') ||
      location.pathname.includes('/signUp'))
  ) {
    if (user?.role === 'admin') {
      return (
        <Navigate to="/admin/dashboard" state={{ from: location }} replace />
      )
    } else {
      return <Navigate to="/angels/home" state={{ from: location }} replace />
    }
  }

  if (isAuthenticated && location.pathname.includes('/admin')) {
    if (user?.role !== 'admin') {
      return <Navigate to="/unauth-page" state={{ from: location }} replace />
    }
  }

  if (
    isAuthenticated &&
    location.pathname.includes('/angels') &&
    user?.role === 'admin' &&
    !location.pathname.includes('/admin/angels')
  ) {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />
  }
  console.log('Authentication check passed for:', location.pathname);
  return <>{children}</>
}

export default CheckAuthentication
