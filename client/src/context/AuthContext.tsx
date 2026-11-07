
import {
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import {
  apiRequest,
  fetchCsrfToken,
  clearCsrfToken,
} from '../services/api'

import { AuthContext } from './auth-context'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

let authStatus: AuthStatus = 'loading'

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot() {
  return authStatus
}

function updateAuthStatus(status: AuthStatus) {
  authStatus = status
  listeners.forEach((listener) => listener())
}

let verificationPromise: Promise<void> | null = null

async function verifySession() {
  if (verificationPromise) return verificationPromise

  verificationPromise = (async () => {
    try {
      await apiRequest('/admin/profile')
      await fetchCsrfToken()
      updateAuthStatus('authenticated')
    } catch {
      clearCsrfToken()
      updateAuthStatus('unauthenticated')
    } finally {
      verificationPromise = null
    }
  })()

  return verificationPromise
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const status = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  )

  useEffect(() => {
    void verifySession()
  }, [])

  const refreshAuth = () => verifySession()

  const clearAuth = () => {
    verificationPromise = null
    clearCsrfToken()
    updateAuthStatus('unauthenticated')
  }

  const logout = async () => {
    await apiRequest('/auth/logout', {
      method: 'POST',
      csrf: true,
    })

    clearAuth()
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading',
        refreshAuth,
        logout,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
