import type { RequestHandler } from 'express'
import { env } from '../config/env.js'

export const validateOrigin: RequestHandler = (
  req,
  res,
  next,
) => {
  const origin = req.get('Origin')

  if (!origin || origin !== env.clientOrigin) {
    res.status(403).json({
      status: 'error',
      message: 'Request origin is not allowed.',
    })
    return
  }

  next()
}