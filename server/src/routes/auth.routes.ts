import { Router } from 'express'
import {
  loginAdmin,
} from '../controllers/auth.controller.js'
import { loginLimiter } from '../middleware/rate-limit.middleware.js'
import { adminCookieOptions } from '../utils/cookie.utils.js'
import {
  generateCsrfToken,
  doubleCsrfProtection,
} from '../middleware/csrf.middleware.js'
import { protectAdmin } from '../middleware/auth.middleware.js'
import { validateOrigin } from '../middleware/origin.middleware.js'

const router = Router()

// Admin login
router.post('/login', validateOrigin, loginLimiter, loginAdmin)

// Generate CSRF token for authenticated admin
router.get('/csrf-token', protectAdmin, (req, res) => {
  const csrfToken = generateCsrfToken(req, res)

  res.status(200).json({
    status: 'success',
    csrfToken,
  })
})

// Secure admin logout
router.post(
  '/logout',
  protectAdmin,
  doubleCsrfProtection,
  async (_req, res, next) => {
    try {
      const admin = res.locals.admin

      // Invalidate existing JWT sessions
      admin.tokenVersion = (admin.tokenVersion ?? 0) + 1
      await admin.save()

      // Clear authentication cookie
      res.clearCookie('adminToken', {
        ...adminCookieOptions,
        maxAge: undefined,
      })

      // Clear CSRF cookie
      res.clearCookie('csrfToken', {
        httpOnly: false,
        secure: adminCookieOptions.secure,
        sameSite: 'lax',
        path: '/',
      })

      res.status(200).json({
        status: 'success',
        message: 'Admin logged out successfully.',
      })
    } catch (error) {
      next(error)
    }
  },
)

export default router