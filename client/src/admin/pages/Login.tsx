import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mountain, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { apiRequest } from '../../services/api'
import { useAuth } from '../../context/useAuth'

function Login() {
  const navigate = useNavigate()
  const { refreshAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      // Retrieve the CSRF token after successful login.
      await refreshAuth()
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFAF4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E9EDE4] mb-4">
            <Mountain size={34} className="text-[#66705D]" />
          </div>

          <h1 className="text-3xl font-semibold text-[#354331]">
            Sahyadri
          </h1>

          <p className="text-sm tracking-[0.2em] text-[#92978B] mt-1">
            TOUR COMPANY
          </p>
        </div>

        <div className="bg-white border border-[#E8E5DA] rounded-2xl shadow-sm p-7 sm:p-9">

          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-[#354331]">
              Admin Login
            </h2>
            <p className="text-sm text-[#92978B] mt-2">
              Sign in to manage your tourism website.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-[#536449] mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92978B]"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8E5DA] bg-[#FEFAF4] text-[#354331] outline-none focus:border-[#66705D] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#536449] mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92978B]"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#E8E5DA] bg-[#FEFAF4] text-[#354331] outline-none focus:border-[#66705D] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92978B] hover:text-[#536449]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#66705D] text-white font-medium hover:bg-[#536449] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-[#92978B] mt-6">
          © {new Date().getFullYear()} Sahyadri Tour Company
        </p>

      </div>
    </div>
  )
}

export default Login