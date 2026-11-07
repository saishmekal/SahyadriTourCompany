import type { Request, Response, NextFunction } from 'express'
import Destination from '../models/Destination.js'


export async function getDestinations(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const destinations = await Destination.find({
      isPublished: true,
    })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({
      status: 'success',
      results: destinations.length,
      data: { destinations },
    })
  } catch (error) {
    next(error)
  }
}


export async function getDestinationBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const destination = await Destination.findOne({
      slug: req.params.slug,
      isPublished: true,
    })
      .select('-__v')
      .lean()

    if (!destination) {
      res.status(404).json({
        status: 'error',
        message: 'Destination not found',
      })
      return
    }

    res.status(200).json({
      status: 'success',
      data: { destination },
    })
  } catch (error) {
    next(error)
  }
}