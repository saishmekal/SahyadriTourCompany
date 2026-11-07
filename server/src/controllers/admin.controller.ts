import type { Request, Response, NextFunction } from 'express'
import Admin from '../models/Admin.js'
import { hashPassword, comparePassword } from '../utils/auth.utils.js'
import Package from '../models/Package.js'
import Destination from '../models/Destination.js'
import Enquiry from '../models/Enquiry.js'

export async function getDashboardStats(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const [
      totalPackages,
      publishedPackages,
      totalDestinations,
      publishedDestinations,
      totalEnquiries,
      newEnquiries,
    ] = await Promise.all([
      Package.countDocuments(),
      Package.countDocuments({ isPublished: true }),
      Destination.countDocuments(),
      Destination.countDocuments({ isPublished: true }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
    ])

    res.status(200).json({
      status: 'success',
      data: {
        statistics: {
          totalPackages,
          publishedPackages,
          totalDestinations,
          publishedDestinations,
          totalEnquiries,
          newEnquiries,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getAdminProfile(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const admin = res.locals.admin

    res.status(200).json({
      status: 'success',
      data: {
        admin: {
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

export async function changeAdminPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (
      typeof currentPassword !== 'string' ||
      typeof newPassword !== 'string' ||
      typeof confirmPassword !== 'string' ||
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      res.status(400).json({
        status: 'error',
        message: 'All password fields are required.',
      })
      return
    }

    if (newPassword.length < 8 || newPassword.length > 128) {
      res.status(400).json({
        status: 'error',
        message: 'New password must be between 8 and 128 characters.',
      })
      return
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        status: 'error',
        message: 'New password and confirmation do not match.',
      })
      return
    }

    if (currentPassword === newPassword) {
      res.status(400).json({
        status: 'error',
        message: 'New password must be different from current password.',
      })
      return
    }

    const adminId = res.locals.admin._id


    const admin = await Admin.findById(adminId).select('+password')

    if (!admin) {
      res.status(404).json({
        status: 'error',
        message: 'Admin account not found.',
      })
      return
    }

    const isPasswordCorrect = await comparePassword(
      currentPassword,
      admin.password,
    )

    if (!isPasswordCorrect) {
      res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect.',
      })
      return
    }

    admin.password = await hashPassword(newPassword)
    admin.tokenVersion = (admin.tokenVersion ?? 0) + 1
    
    await admin.save()

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully.',
    })
  } catch (error) {
    next(error)
  }
}