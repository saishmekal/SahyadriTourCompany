import type { RequestHandler } from 'express'
import type { ZodType } from 'zod'

export const validate = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed.',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
      return
    }

    req.body = result.data
    next()
  }
}

export const validateParams = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params)

    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid route parameters.',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
      return
    }

    next()
  }
}