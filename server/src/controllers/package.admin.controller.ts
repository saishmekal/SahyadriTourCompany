import type { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import Package from '../models/Package.js'
import Enquiry from '../models/Enquiry.js'

const allowedFields = [
  'title',
  'slug',
  'duration',
  'category',
  'description',
  'image',
  'itinerary',
  'inclusions',
  'exclusions',
  'isPublished',
]

export async function createPackage(
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
        message: `Unexpected fields: ${unknownFields.join(', ')}`,
      })
      return
    }

    const requiredFields = [
      'title',
      'slug',
      'duration',
      'category',
      'description',
      'image',
    ]

    for (const field of requiredFields) {
      if (
        typeof body[field] !== 'string' ||
        body[field].trim().length === 0
      ) {
        res.status(400).json({
          status: 'error',
          message: `${field} is required and must be a non-empty string.`,
        })
        return
      }
    }

    const title = body.title.trim()
    const slug = body.slug.trim().toLowerCase()
    const duration = body.duration.trim()
    const category = body.category.trim()
    const description = body.description.trim()
    const image = body.image.trim()

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      res.status(400).json({
        status: 'error',
        message: 'Slug must contain lowercase letters, numbers, and hyphens only.',
      })
      return
    }

    if (title.length > 150 || slug.length > 160 ||
        duration.length > 100 || category.length > 100 ||
        description.length > 5000 || image.length > 2048) {
      res.status(400).json({
        status: 'error',
        message: 'One or more fields exceed the allowed length.',
      })
      return
    }

    if (
      body.isPublished !== undefined &&
      typeof body.isPublished !== 'boolean'
    ) {
      res.status(400).json({
        status: 'error',
        message: 'isPublished must be a boolean.',
      })
      return
    }

    const itinerary = body.itinerary ?? []
    const inclusions = body.inclusions ?? []
    const exclusions = body.exclusions ?? []

    if (!Array.isArray(itinerary) ||
        !Array.isArray(inclusions) ||
        !Array.isArray(exclusions)) {
      res.status(400).json({
        status: 'error',
        message: 'Itinerary, inclusions, and exclusions must be arrays.',
      })
      return
    }

    const validItinerary = itinerary.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        !Array.isArray(item) &&
        Number.isInteger(item.day) &&
        item.day > 0 &&
        typeof item.title === 'string' &&
        item.title.trim().length > 0 &&
        typeof item.description === 'string' &&
        item.description.trim().length > 0,
    )

    if (!validItinerary) {
      res.status(400).json({
        status: 'error',
        message: 'Each itinerary item needs a valid day, title, and description.',
      })
      return
    }

    const validTextArrays = [inclusions, exclusions].every(
      (items) =>
        items.every(
          (item) =>
            typeof item === 'string' &&
            item.trim().length > 0 &&
            item.length <= 500,
        ),
    )

    if (!validTextArrays) {
      res.status(400).json({
        status: 'error',
        message: 'Inclusions and exclusions must contain non-empty strings.',
      })
      return
    }

    const existingPackage = await Package.findOne({ slug })

    if (existingPackage) {
      res.status(409).json({
        status: 'error',
        message: 'A package with this slug already exists.',
      })
      return
    }

    const newPackage = await Package.create({
      title,
      slug,
      duration,
      category,
      description,
      image,
      itinerary: itinerary.map((item) => ({
        day: item.day,
        title: item.title.trim(),
        description: item.description.trim(),
      })),
      inclusions: inclusions.map((item: string) => item.trim()),
      exclusions: exclusions.map((item: string) => item.trim()),
      isPublished: body.isPublished ?? false,
    })

    res.status(201).json({
      status: 'success',
      message: 'Package created successfully.',
      data: {
        package: newPackage,
      },
    })
  } catch (error) {
    // Duplicate Key Error Handling for MongoDB
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        status: 'error',
        message: 'A package with this slug already exists.',
      })
      return
    }

    next(error)
  }
}


export async function updatePackage(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params
    const body = req.body


    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid package ID.',
      })
      return
    }

  
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request body.',
      })
      return
    }

    // Check allowed fields
    const updateFields = Object.keys(body)

    if (updateFields.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'Please provide at least one field to update.',
      })
      return
    }

    const unknownFields = updateFields.filter(
      (field) => !allowedFields.includes(field),
    )

    if (unknownFields.length > 0) {
      res.status(400).json({
        status: 'error',
        message: `Unexpected fields: ${unknownFields.join(', ')}`,
      })
      return
    }

    const updates: Record<string, unknown> = { ...body }

  
    const stringFields = [
      'title',
      'slug',
      'duration',
      'category',
      'description',
      'image',
    ]

    const maxLengths: Record<string, number> = {
      title: 150,
      slug: 160,
      duration: 100,
      category: 100,
      description: 5000,
      image: 2048,
    }

    for (const field of stringFields) {
      if (updates[field] !== undefined) {
        if (
          typeof updates[field] !== 'string' ||
          updates[field].trim().length === 0 ||
          updates[field].trim().length > maxLengths[field]
        ) {
          res.status(400).json({
            status: 'error',
            message: `Invalid ${field} value.`,
          })
          return
        }

        updates[field] = updates[field].trim()
      }
    }


    if (updates.slug !== undefined) {
      const slug = (updates.slug as string).toLowerCase()

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid package slug.',
        })
        return
      }

      updates.slug = slug
    }


    if (
      updates.isPublished !== undefined &&
      typeof updates.isPublished !== 'boolean'
    ) {
      res.status(400).json({
        status: 'error',
        message: 'isPublished must be a boolean.',
      })
      return
    }


    if (updates.itinerary !== undefined) {
      if (!Array.isArray(updates.itinerary)) {
        res.status(400).json({
          status: 'error',
          message: 'Itinerary must be an array.',
        })
        return
      }

      const validItinerary = updates.itinerary.every(
        (item) =>
          item &&
          typeof item === 'object' &&
          !Array.isArray(item) &&
          Number.isInteger(item.day) &&
          item.day > 0 &&
          typeof item.title === 'string' &&
          item.title.trim().length > 0 &&
          typeof item.description === 'string' &&
          item.description.trim().length > 0,
      )

      if (!validItinerary) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid itinerary data.',
        })
        return
      }

      updates.itinerary = updates.itinerary.map((item) => ({
        day: item.day,
        title: item.title.trim(),
        description: item.description.trim(),
      }))
    }


    for (const field of ['inclusions', 'exclusions']) {
      if (updates[field] !== undefined) {
        if (
          !Array.isArray(updates[field]) ||
          !updates[field].every(
            (item: unknown) =>
              typeof item === 'string' &&
              item.trim().length > 0 &&
              item.trim().length <= 500,
          )
        ) {
          res.status(400).json({
            status: 'error',
            message: `${field} must contain valid strings.`,
          })
          return
        }

        updates[field] = (updates[field] as string[]).map(
          (item) => item.trim(),
        )
      }
    }


    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedPackage) {
      res.status(404).json({
        status: 'error',
        message: 'Package not found.',
      })
      return
    }


    res.status(200).json({
      status: 'success',
      message: 'Package updated successfully.',
      data: {
        package: updatedPackage,
      },
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
        message: 'A package with this slug already exists.',
      })
      return
    }

    next(error)
  }
}

export async function getAllPackages(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const packages = await Package.find()
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


export async function deletePackage(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let session: mongoose.ClientSession | undefined

  try {
    session = await mongoose.startSession()

    const { id } = req.params

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid package ID.',
      })
      return
    }

    // TypeScript now knows session is defined
    const activeSession = session

    await activeSession.withTransaction(async () => {
      // Find package
      const packageToDelete = await Package.findById(id).session(activeSession)

      if (!packageToDelete) {
        const error = new Error('Package not found.')
        error.name = 'PackageNotFoundError'
        throw error
      }

      // Delete related enquiries
      await Enquiry.deleteMany({
        packageSlug: packageToDelete.slug,
      }).session(activeSession)

      // Delete package
      await Package.deleteOne({
        _id: packageToDelete._id,
      }).session(activeSession)
    })

    res.status(200).json({
      status: 'success',
      message: 'Package and its associated enquiries deleted successfully.',
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'PackageNotFoundError') {
      res.status(404).json({
        status: 'error',
        message: error.message,
      })
      return
    }

    next(error)
  } finally {
    await session?.endSession()
  }
}