import type { Request, Response, NextFunction } from 'express'
import Destination from '../models/Destination.js'
import mongoose from 'mongoose'

const allowedFields = [
  'name',
  'slug',
  'description',
  'image',
  'location',
  'isPublished',
]

export async function createDestination(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request body.',
      })
      return
    }

    const unknownFields = Object.keys(body).filter(
      (field) => !allowedFields.includes(field),
    )

    if (unknownFields.length > 0) {
      res.status(400).json({
        status: 'error',
        message: `Unknown fields: ${unknownFields.join(', ')}`,
      })
      return
    }

    const { name, slug, description, image, location, isPublished } = body

    const requiredFields = {
      name,
      slug,
      description,
      image,
      location,
    }

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== 'string' || !value.trim()) {
        res.status(400).json({
          status: 'error',
          message: `${field} is required and must be a non-empty string.`,
        })
        return
      }
    }

    if (
      name.trim().length > 100 ||
      slug.trim().length > 100 ||
      description.trim().length > 2000 ||
      image.trim().length > 2048 ||
      location.trim().length > 150
    ) {
      res.status(400).json({
        status: 'error',
        message: 'One or more fields exceed their maximum allowed length.',
      })
      return
    }

    const normalizedSlug = slug.trim().toLowerCase()

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
      res.status(400).json({
        status: 'error',
        message: 'Slug must contain lowercase letters, numbers and hyphens only.',
      })
      return
    }

    if (
      isPublished !== undefined &&
      typeof isPublished !== 'boolean'
    ) {
      res.status(400).json({
        status: 'error',
        message: 'isPublished must be a boolean.',
      })
      return
    }

    const existingDestination = await Destination.findOne({
      slug: normalizedSlug,
    })

    if (existingDestination) {
      res.status(409).json({
        status: 'error',
        message: 'A destination with this slug already exists.',
      })
      return
    }

    const destination = await Destination.create({
      name: name.trim(),
      slug: normalizedSlug,
      description: description.trim(),
      image: image.trim(),
      location: location.trim(),
      ...(isPublished !== undefined && { isPublished }),
    })

    res.status(201).json({
      status: 'success',
      message: 'Destination created successfully.',
      data: { destination },
    })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        status: 'error',
        message: 'A destination with this slug already exists.',
      })
      return
    }

    next(error)
  }
}


export async function updateDestination(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid destination ID.',
      })
      return
    }

    const body = req.body

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request body.',
      })
      return
    }

    if (Object.keys(body).length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'Provide at least one field to update.',
      })
      return
    }

    const unknownFields = Object.keys(body).filter(
      (field) => !allowedFields.includes(field),
    )

    if (unknownFields.length > 0) {
      res.status(400).json({
        status: 'error',
        message: `Unknown fields: ${unknownFields.join(', ')}`,
      })
      return
    }

    const updates: Record<string, unknown> = {}

    for (const field of ['name', 'description', 'image', 'location'] as const) {
      if (body[field] !== undefined) {
        if (
          typeof body[field] !== 'string' ||
          !body[field].trim()
        ) {
          res.status(400).json({
            status: 'error',
            message: `${field} must be a non-empty string.`,
          })
          return
        }

        const maxLengths = {
          name: 100,
          description: 2000,
          image: 2048,
          location: 150,
        }

        if (body[field].trim().length > maxLengths[field]) {
          res.status(400).json({
            status: 'error',
            message: `${field} exceeds its maximum allowed length.`,
          })
          return
        }

        updates[field] = body[field].trim()
      }
    }

    if (body.slug !== undefined) {
      if (
        typeof body.slug !== 'string' ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(body.slug.trim())
      ) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid slug.',
        })
        return
      }

      updates.slug = body.slug.trim().toLowerCase()
    }

    if (body.isPublished !== undefined) {
      if (typeof body.isPublished !== 'boolean') {
        res.status(400).json({
          status: 'error',
          message: 'isPublished must be a boolean.',
        })
        return
      }

      updates.isPublished = body.isPublished
    }

    const destination = await Destination.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    )
      .select('-__v')
      .lean()

    if (!destination) {
      res.status(404).json({
        status: 'error',
        message: 'Destination not found.',
      })
      return
    }

    res.status(200).json({
      status: 'success',
      message: 'Destination updated successfully.',
      data: { destination },
    })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        status: 'error',
        message: 'A destination with this slug already exists.',
      })
      return
    }

    next(error)
  }
}


export async function getAllDestinations(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const destinations = await Destination.find()
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


export async function deleteDestination(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid destination ID.',
      })
      return
    }

    const destination = await Destination.findByIdAndDelete(id)

    if (!destination) {
      res.status(404).json({
        status: 'error',
        message: 'Destination not found.',
      })
      return
    }

    res.status(200).json({
      status: 'success',
      message: 'Destination deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}