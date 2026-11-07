import type { Request } from 'express'
import { doubleCsrf } from 'csrf-csrf'
import { env } from '../config/env.js'

if (!env.csrfSecret || env.csrfSecret.length < 32) {
  throw new Error('CSRF_SECRET must be at least 32 characters long.')
}

export const {
  generateCsrfToken,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => env.csrfSecret,

  getSessionIdentifier: (req: Request) =>
    req.cookies?.adminToken ?? '',

  cookieName: 'csrfToken',

  cookieOptions: {
    httpOnly: false,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/',
  },

  getCsrfTokenFromRequest: (req: Request) =>
    req.headers['x-csrf-token'] as string,
})
