import type { Request, Response, NextFunction } from 'express'
import Admin from '../models/Admin.js'
import {
  comparePassword,
  generateToken,
} from '../utils/auth.utils.js'
import { adminCookieOptions } from '../utils/cookie.utils.js'

export async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Email and password are required.',
      })
      return
    }


    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select('+password')

    if (
      !admin ||
      !admin.isActive ||
      !(await comparePassword(password, admin.password))
    ) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password.',
      })
      return
    }


    const token = generateToken(
      admin._id.toString(),
      admin.tokenVersion ?? 0
    )

    res.cookie('adminToken', token, adminCookieOptions)

    res.status(200).json({
    status: 'success',
    message: 'Admin login successful.',
    data: {
        admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        },
    },
    })
  } catch (error) {
    next(error)
  }
}