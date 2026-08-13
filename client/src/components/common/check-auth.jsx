import { useEffect, useState } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

function CheckAuthentication({ isAuthenticated, user }) {
  const location = useLocation()
  const [isMounted, setIsMounted] = useState(false)
  const [ageVerified, setAgeVerified] = useState(null)

  useEffect(() => {
    setAgeVerified(localStorage.getItem('ageVerified'))
    setIsMounted(true)
  }, [])

  // Avoid server/client markup mismatches during the initial hydration pass.
  if (!isMounted) {
    return null
  }
  // 🎂 Age verification check
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

  // 🔒 Unauthenticated requests to restricted paths
  if (
    !isAuthenticated &&
    (location.pathname === '/' ||
      location.pathname.includes('/angels/applications') ||
      location.pathname.includes('/angels/home') ||
      location.pathname.includes('/angels/angels'))
  ) {
    if (location.pathname === '/') {
      return <Navigate to="/angels/home" state={{ from: location }} replace />
    } else {
      return <Outlet />
    }
  }

  // 🔒 Catch-all fallback authentication redirect
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

  // 🚪 Logged in user hitting authentication paths
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

  // 🛡️ Guarding Admin routes
  if (isAuthenticated && location.pathname.includes('/admin')) {
    if (user?.role !== 'admin') {
      return <Navigate to="/unauth-page" state={{ from: location }} replace />
    }
  }

  // 🛡️ Redirecting Admin away from customer-facing portal
  if (
    isAuthenticated &&
    location.pathname.includes('/angels') &&
    user?.role === 'admin' &&
    !location.pathname.includes('/admin/angels')
  ) {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default CheckAuthentication
