import { z } from 'zod'

const destinationFields = {
  name: z.string().trim().min(1).max(100),

  slug: z.string()
    .trim()
    .toLowerCase()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  description: z.string().trim().min(1).max(2000),

  image: z.string().trim().min(1).max(2048),

  location: z.string().trim().min(1).max(150),

  isPublished: z.boolean(),
}

export const createDestinationSchema = z.object({
  ...destinationFields,
}).strict()

export const updateDestinationSchema = z.object({
  ...destinationFields,
})
  .partial()
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Provide at least one field to update.',
  )