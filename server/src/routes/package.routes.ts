import { Router } from 'express'
import { getPackages, getPackageBySlug } from '../controllers/package.controller.js'
import { getAllPackages, createPackage, updatePackage, deletePackage } from '../controllers/package.admin.controller.js'
import { protectAdmin } from '../middleware/auth.middleware.js'
import { doubleCsrfProtection } from '../middleware/csrf.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import {
  createPackageSchema,
  updatePackageSchema,
} from '../validators/package.validator.js'
import { validateParams } from '../middleware/validate.middleware.js'
import { mongoIdSchema } from '../validators/params.validator.js'

const router = Router()

// Public Routes
router.get('/', getPackages)

// Admin Route
router.get('/admin', protectAdmin, getAllPackages)

// Public Route — keep this after /admin
router.get('/:slug', getPackageBySlug)

// Admin Routes
router.post('/', protectAdmin, doubleCsrfProtection, validate(createPackageSchema), createPackage)
router.patch('/:id', protectAdmin, doubleCsrfProtection, validateParams(mongoIdSchema), validate(updatePackageSchema), updatePackage)
router.delete('/:id', protectAdmin, doubleCsrfProtection, validateParams(mongoIdSchema), deletePackage)

export default router