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
import { useEffect } from 'react'
import { authCheck } from './store/auth-slice'
import '@fontsource/gugi';
import '@fontsource-variable/comfortaa/wght.css';
import '@fontsource/nosifer';

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    dispatch(authCheck())
  }, [dispatch])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuthentication>
          }
        >
          <Route path="signIn" element={<AuthSignIn />} />
          <Route path="signUp" element={<AuthSignUp />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuthentication>
          }
        >
          <Route path="users" element={<UsersAdminPage />} />
          <Route path="angels" element={<AngelsAdminPage />} />
          <Route path="dashboard" element={<DashboardAdminPage />} />
          <Route path="features" element={<FeaturesAdminPage />} />
        </Route>

        <Route
          path="/angels"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AngelsLayout />
            </CheckAuthentication>
          }
        >
          <Route path="faves" element={<AngelsFavesPage />} />
          <Route path="account" element={<AngelsAccountPage />} />
          <Route path="checkout" element={<AngelsCheckoutPage />} />
          <Route path="home" element={<AngelsHomePage />} />
          <Route path="angels" element={<AngelsListingPage />} />
          <Route path="applications" element={<AngelApplications />} />
        </Route>
        <Route
          path="/"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AngelsLayout />
            </CheckAuthentication>
          }
        >
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="unauth-page" element={<UnauthPage />} />
          <Route path="/age-verification" element={<AgeVerificationPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
