import { Router } from 'express'
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
} from '../controllers/enquiry.controller.js'

import { protectAdmin } from '../middleware/auth.middleware.js'
import { doubleCsrfProtection } from '../middleware/csrf.middleware.js'
import { enquiryLimiter } from '../middleware/enquiry-rate-limit.middleware.js'
import {
  validate,
  validateParams,
} from '../middleware/validate.middleware.js'

import { mongoIdSchema } from '../validators/params.validator.js'
import {
  enquirySchema,
  updateEnquiryStatusSchema,
} from '../validators/enquiry.validator.js'

const router = Router()

// Public
router.post(
  '/',
  enquiryLimiter,
  validate(enquirySchema),
  createEnquiry,
)

// Admin
router.get('/', protectAdmin, getAllEnquiries)

router.get(
  '/:id',
  protectAdmin,
  validateParams(mongoIdSchema),
  getEnquiryById,
)

router.patch(
  '/:id',
  protectAdmin,
  doubleCsrfProtection,
  validateParams(mongoIdSchema),
  validate(updateEnquiryStatusSchema),
  updateEnquiryStatus,
)

export default router