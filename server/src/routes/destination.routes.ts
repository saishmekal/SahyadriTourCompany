import { Router } from 'express'
import { getDestinations, getDestinationBySlug } from '../controllers/destination.controller.js'
import { getAllDestinations, createDestination, updateDestination, deleteDestination } from '../controllers/destination.admin.controller.js'
import { protectAdmin } from '../middleware/auth.middleware.js'
import { doubleCsrfProtection } from '../middleware/csrf.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import {
  createDestinationSchema,
  updateDestinationSchema,
} from '../validators/destination.validator.js'
import { validateParams } from '../middleware/validate.middleware.js'
import { mongoIdSchema } from '../validators/params.validator.js'

const router = Router()

// Public Routes
router.get('/', getDestinations)
// Admin Route
router.get('/admin', protectAdmin, getAllDestinations)
// Public Route — keep this after /admin
router.get('/:slug', getDestinationBySlug)

// Admin Routes
router.post('/', protectAdmin, doubleCsrfProtection, validate(createDestinationSchema), createDestination)
router.patch('/:id', protectAdmin, doubleCsrfProtection, validateParams(mongoIdSchema), validate(updateDestinationSchema), updateDestination)
router.delete('/:id', protectAdmin, doubleCsrfProtection, validateParams(mongoIdSchema), deleteDestination)

export default router