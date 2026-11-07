import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  MapPin,
  MessageSquare,
  UserRound,
  Menu,
  X,
  LogOut,
  Mountain,
} from 'lucide-react'

import { useAuth } from '../../context/useAuth'

const navigation = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: 'Packages',
    path: '/admin/packages',
    icon: Package,
  },
  {
    name: 'Destinations',
    path: '/admin/destinations',
    icon: MapPin,
  },
  {
    name: 'Enquiries',
    path: '/admin/enquiries',
    icon: MessageSquare,
  },
  {
    name: 'Profile',
    path: '/admin/profile',
    icon: UserRound,
  },
]

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    setLogoutError('')
    setIsLoggingOut(true)

    try {
      await logout()
      navigate('/admin/login', { replace: true })
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : 'Logout failed. Please try again.',
      )
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFAF4] text-[#354331]">

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[#E8E5DA]">
        <div className="flex items-center gap-2">
          <Mountain size={25} className="text-[#66705D]" />
          <span className="font-semibold">Sahyadri Admin</span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={25} />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E8E5DA] flex flex-col transition-transform duration-300 ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#E8E5DA]">
          <div className="flex items-center gap-3">
            <Mountain size={30} className="text-[#66705D]" />

            <div>
              <h1 className="font-semibold text-[#354331]">
                Sahyadri
              </h1>
              <p className="text-xs text-[#92978B]">
                ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <p className="px-3 py-3 text-xs font-semibold tracking-widest text-[#A0A397]">
            MENU
          </p>

          {navigation.map(({ name, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#E9EDE4] text-[#536449]'
                    : 'text-[#777E70] hover:bg-[#F5F4EE]'
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#E8E5DA]">
          {logoutError && (
            <p
              role="alert"
              className="mb-3 text-xs text-red-600"
            >
              {logoutError}
            </p>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={19} />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">

        {/* Desktop Header */}
        <div className="hidden lg:flex h-20 items-center justify-between px-8 bg-white border-b border-[#E8E5DA]">
          <div>
            <p className="text-sm text-[#92978B]">
              Sahyadri Tour Company
            </p>
            <h2 className="font-semibold">
              Administration
            </h2>
          </div>

          <span className="text-sm text-[#66705D]">
            Admin Panel
          </span>
        </div>

        {/* Page Content */}
        <div className="p-5 sm:p-8">
          <Outlet />
        </div>

      </main>
    </div>
  )
}

export default AdminLayout