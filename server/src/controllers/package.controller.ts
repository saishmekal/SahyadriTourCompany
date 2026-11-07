import type { Request, Response, NextFunction } from 'express'
import Package from '../models/Package.js'


export async function getPackages(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const packages = await Package.find({ isPublished: true })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({
      status: 'success',
      results: packages.length,
      data: { packages },
    })
  } catch (error) {
    next(error)
  }
}


export async function getPackageBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tourPackage = await Package.findOne({
      slug: req.params.slug,
      isPublished: true,
    })
      .select('-__v')
      .lean()

    if (!tourPackage) {
      res.status(404).json({
        status: 'error',
        message: 'Tour package not found',
      })
      return
    }

    res.status(200).json({
      status: 'success',
      data: { package: tourPackage },
    })
  } catch (error) {
    next(error)
  }
}