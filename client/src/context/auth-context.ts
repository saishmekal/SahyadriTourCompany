import { createContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  refreshAuth: () => Promise<void>
  logout: () => Promise<void>
  clearAuth: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)