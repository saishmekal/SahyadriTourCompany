import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { env } from '../config/env.js'
import mongoose from 'mongoose'

interface JwtPayload {
  adminId: string
  tokenVersion: number
}

export async function protectAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {

    const token = req.cookies?.adminToken

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required.',
      })
      return
    }


    const decoded = jwt.verify(token, env.jwtSecret)

    if (
      typeof decoded === 'string' ||
      typeof decoded.adminId !== 'string' ||
      !mongoose.isValidObjectId(decoded.adminId) ||
      typeof decoded.tokenVersion !== 'number'
    ) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token.',
      })
      return
    }

    const admin = await Admin.findById(decoded.adminId)

    if (
      !admin ||
      !admin.isActive ||
      admin.role !== 'admin' ||
      (admin.tokenVersion ?? 0) !== decoded.tokenVersion
    ) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid or inactive admin account.',
      })
      return
    }


    res.locals.admin = admin

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication token has expired.',
      })
      return
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token.',
      })
      return
    }

    next(error)
  }
}