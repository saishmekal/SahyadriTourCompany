
import { useEffect, useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, UserRound, Mail, ShieldCheck } from 'lucide-react'
import { apiRequest } from '../../services/api'
import { useAuth } from '../../context/useAuth'

type AdminProfile = {
  name: string
  email: string
  role: string
}

type ProfileResponse = {
  status: string
  data: { admin: AdminProfile }
}

type PasswordResponse = {
  status: string
  message: string
}

function Profile() {
  const { clearAuth } = useAuth()

  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadProfile() {
      try {
        const response = await apiRequest<ProfileResponse>('/admin/profile')
        if (!ignore) setProfile(response.data.admin)
      } catch (error) {
        if (!ignore) {
          setProfileError(
            error instanceof Error ? error.message : 'Unable to load profile.',
          )
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    void loadProfile()

    return () => {
      ignore = true
    }
  }, [])

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccess('')
    setPasswordError('')

    if (newPassword.length < 8 || newPassword.length > 128) {
      setPasswordError('New password must be between 8 and 128 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    if (currentPassword === newPassword) {
      setPasswordError('Your new password must be different from the current password.')
      return
    }

    setSaving(true)

    try {
      const response = await apiRequest<PasswordResponse>(
        '/admin/change-password',
        {
          method: 'PATCH',
          csrf: true,
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        },
      )

      setSuccess(response.message || 'Password changed successfully.')

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // The backend increments tokenVersion, invalidating this session.
      // Clear the frontend authentication state as well.
      clearAuth()
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : 'Unable to change password.',
      )
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#E8E5DA] bg-[#FEFAF4] px-4 py-3 text-sm text-[#354331] outline-none transition focus:border-[#66705D] focus:ring-2 focus:ring-[#66705D]/10'

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <h1 className="text-2xl font-semibold text-[#354331]">My Profile</h1>
        <p className="mt-1 text-sm text-[#92978B]">
          Manage your account details and security settings.
        </p>
      </div>

      {profileError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {profileError}
        </div>
      )}

      <section className="rounded-2xl border border-[#E8E5DA] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#E9EDE4] p-3 text-[#66705D]">
            <UserRound size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-[#354331]">Account Information</h2>
            <p className="text-sm text-[#92978B]">Your administrator details</p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-[#92978B]">Loading profile...</p>
        ) : profile ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#92978B]">
                Full Name
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-[#FEFAF4] p-4">
                <UserRound size={18} className="text-[#66705D]" />
                <span className="text-sm font-medium">{profile.name}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#92978B]">
                Email Address
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-[#FEFAF4] p-4">
                <Mail size={18} className="text-[#66705D]" />
                <span className="break-all text-sm font-medium">{profile.email}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#92978B]">
                Account Role
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-[#FEFAF4] p-4">
                <ShieldCheck size={18} className="text-[#66705D]" />
                <span className="text-sm font-medium capitalize">{profile.role}</span>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-[#E8E5DA] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#E9EDE4] p-3 text-[#66705D]">
            <LockKeyhole size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-[#354331]">Change Password</h2>
            <p className="text-sm text-[#92978B]">
              Update your administrator account password.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#536449]">
              Current Password
            </label>
            <input
              required
              type={showPasswords ? 'text' : 'password'}
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#536449]">
              New Password
            </label>
            <input
              required
              minLength={8}
              maxLength={128}
              type={showPasswords ? 'text' : 'password'}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter new password (8–128 characters)"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#536449]">
              Confirm New Password
            </label>
            <input
              required
              minLength={8}
              maxLength={128}
              type={showPasswords ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Confirm your new password"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#777E70]">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="accent-[#66705D]"
            />
            Show passwords
            {showPasswords ? <EyeOff size={15} /> : <Eye size={15} />}
          </label>

          {passwordError && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {passwordError}
            </p>
          )}

          {success && (
            <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {success} Please log in again with your new password.
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#66705D] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#536449] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default Profile