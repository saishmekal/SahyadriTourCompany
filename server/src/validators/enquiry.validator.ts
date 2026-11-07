import { z } from 'zod'

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .max(100, 'Name cannot exceed 100 characters.'),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number.'),

  packageSlug: z
    .string()
    .trim()
    .min(1, 'Package slug is required.')
    .max(150, 'Package slug is too long.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid package slug.'),

  message: z
    .string()
    .trim()
    .max(1000, 'Message cannot exceed 1000 characters.')
    .optional()
    .default(''),
}).strict()

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']),
}).strict()