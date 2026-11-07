import { rateLimit } from 'express-rate-limit'

export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many enquiries submitted. Please try again after 15 minutes.',
  },
})