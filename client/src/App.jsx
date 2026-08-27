import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthSignIn from './pages/auth/signIn'
import AuthSignUp from './pages/auth/signUp'
import { LoadingSkeleton } from './components/common/loading'
import AdminLayout from './components/admin/layout'
import AngelsAdminPage from './pages/admin/vAngelsAdmin'
import UsersAdminPage from './pages/admin/UsersAdmin'
import DashboardAdminPage from './pages/admin/dashboardAdmin'
import FeaturesAdminPage from './pages/admin/featuresAdmin'
import PageNotFound from './pages/not-found'
import AngelsLayout from './components/v-angels/layout'
import AngelsHomePage from './pages/angels/home'
import AngelsListingPage from './pages/angels/listing'
import AngelsAccountPage from './pages/angels/account'
import AngelsFavesPage from './pages/angels/faves'
import AngelsCheckoutPage from './pages/angels/checkout'
import UnauthPage from './pages/unauth-page'
import CheckAuthentication from './components/common/check-auth'
import AngelApplications from './pages/angels/applications'
import AgeVerificationPage from './pages/launch/initial'
import PrivacyPage from './pages/privacy'
import TermsPage from './pages/terms'
import CookiesPage from './pages/cookies'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { authCheck } from './store/auth-slice'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  const [hasHydrated, setHasHydrated] = useState(false)
  const dispatch = useDispatch()
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    setHasHydrated(true)
    dispatch(authCheck())
  }, [dispatch])

  // ALWAYS match the initial render to server defaults:
  // On server: user is null, isAuthenticated is false, hasHydrated is false
  const activeAuth = hasHydrated ? isAuthenticated : false
  const activeUser = hasHydrated ? user : null

  return (
      (hasHydrated && isLoading && !user) ? (
        <LoadingSkeleton />
      ) : (
        <>
        <Routes>
          <Route
            element={
              <CheckAuthentication
                isAuthenticated={activeAuth}
                user={activeUser}
              />
            }
          >
            {/* AUTH PATHS */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="signIn" element={<AuthSignIn />} />
              <Route path="signUp" element={<AuthSignUp />} />
            </Route>

            {/* ADMIN PATHS */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<UsersAdminPage />} />
              <Route path="angels" element={<AngelsAdminPage />} />
              <Route path="dashboard" element={<DashboardAdminPage />} />
              <Route path="features" element={<FeaturesAdminPage />} />
            </Route>

            {/* ANGELS PATHS */}
            <Route path="/angels" element={<AngelsLayout />}>
              <Route path="faves" element={<AngelsFavesPage />} />
              <Route path="account" element={<AngelsAccountPage />} />
              <Route path="checkout" element={<AngelsCheckoutPage />} />
              <Route path="home" element={<AngelsHomePage />} />
              <Route path="angels" element={<AngelsListingPage />} />
              <Route path="applications" element={<AngelApplications />} />
            </Route>

            {/* ROOT PATHS */}
            <Route path="/" element={<AngelsLayout />}>
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="cookies" element={<CookiesPage />} />
              <Route path="unauth-page" element={<UnauthPage />} />
              <Route path="age-verification" element={<AgeVerificationPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
        {hasHydrated && <Toaster richColors={true} theme="system" />}
        </>
      )
  )
}