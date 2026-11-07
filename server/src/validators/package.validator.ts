import { z } from 'zod'

const itineraryItemSchema = z.object({
  day: z.number().int().positive(),
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(5000),
}).strict()

const packageFields = {
  title: z.string().trim().min(1).max(150),

  slug: z.string()
    .trim()
    .toLowerCase()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  duration: z.string().trim().min(1).max(100),

  category: z.string().trim().min(1).max(100),

  description: z.string().trim().min(1).max(5000),

  image: z.string().trim().min(1).max(2048),

  itinerary: z.array(itineraryItemSchema),

  inclusions: z.array(
    z.string().trim().min(1).max(500),
  ),

  exclusions: z.array(
    z.string().trim().min(1).max(500),
  ),

  isPublished: z.boolean(),
}

export const createPackageSchema = z.object({
  ...packageFields,

  itinerary: packageFields.itinerary.default([]),
  inclusions: packageFields.inclusions.default([]),
  exclusions: packageFields.exclusions.default([]),
  isPublished: packageFields.isPublished.default(false),
}).strict()

export const updatePackageSchema = z.object({
  ...packageFields,
})
  .partial()
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Please provide at least one field to update.',
  )