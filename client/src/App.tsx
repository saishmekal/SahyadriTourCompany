import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Destinations from './components/Destinations'
import WhyTravelWithUs from './components/WhyTravelWithUs'
import TopPackages from './components/TopPackages'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Enquiry from './components/Enquiry'
import AboutUs from './components/AboutUs'
import Gallery from './components/Gallery'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'

// Lazy-loaded pages
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'))
const Login = lazy(() => import('./admin/pages/Login'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const Packages = lazy(() => import('./admin/pages/Packages'))
const AdminDestinations = lazy(() => import('./admin/pages/Destinations'))
const Enquiries = lazy(() => import('./admin/pages/Enquiries'))
const Profile = lazy(() => import('./admin/pages/Profile'))
const PackageDetails = lazy(() => import('./pages/PackageDetails'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Cancellation = lazy(() => import('./pages/Cancellation'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEFAF4]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EAE5D9] border-t-[#66705D]" />
    </div>
  )
}

function PublicHome() {
  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#66705D]">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <AboutUs />
        <Destinations />
        <WhyTravelWithUs />
        <TopPackages />
        <Testimonials />
        <Gallery />
        <Enquiry />
        <Footer />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<PublicHome />} />

            <Route
              path="/packages/:slug"
              element={<PackageDetails />}
            />

            <Route path="/admin/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="packages" element={<Packages />} />
                <Route path="destinations" element={<AdminDestinations />} />
                <Route path="enquiries" element={<Enquiries />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="/faq" element={
                <Suspense fallback={<PageLoader />}>
                  <FAQ />
                </Suspense>
              }
            />

            <Route
              path="/terms"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Terms />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Privacy />
                </Suspense>
              }
            />
            <Route
              path="/cancellation"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Cancellation />
                </Suspense>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App