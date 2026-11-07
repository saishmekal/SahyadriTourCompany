import { Router } from 'express'

import {
  getDashboardStats,
  getAdminProfile,
  changeAdminPassword,
} from '../controllers/admin.controller.js'

import { protectAdmin } from '../middleware/auth.middleware.js'
import { doubleCsrfProtection } from '../middleware/csrf.middleware.js'

const router = Router()

// Admin Routes
router.get('/dashboard', protectAdmin, getDashboardStats)
router.get('/profile', protectAdmin, getAdminProfile)
router.patch('/change-password', protectAdmin, doubleCsrfProtection, changeAdminPassword)
export default router