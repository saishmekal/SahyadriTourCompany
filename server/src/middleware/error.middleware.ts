import mongoose from 'mongoose'
import type { ErrorRequestHandler, RequestHandler } from 'express'

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  // Let Express handle errors if response headers were already sent.
  if (res.headersSent) {
    next(err)
    return
  }

  console.error(err)

  // CSRF validation errors
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({
      status: 'error',
      message: 'Invalid or missing CSRF token.',
    })
    return
  }


  if (err.type === 'entity.too.large') {
    res.status(413).json({
      status: 'error',
      message: 'Request body is too large.',
    })
    return
  }


  if (err.code === 11000) {
    res.status(409).json({
      status: 'error',
      message: 'A record with this value already exists.',
    })
    return
  }


  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      status: 'error',
      message: 'Database validation failed.',
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    })
    return
  }


  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid value provided.',
    })
    return
  }

  // Unexpected server errors
  res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  })
}
