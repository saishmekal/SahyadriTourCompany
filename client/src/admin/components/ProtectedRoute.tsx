import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFAF4]">
        <p className="text-[#66705D] font-medium">
          Verifying admin session...
        </p>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute