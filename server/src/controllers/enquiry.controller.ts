import mongoose from 'mongoose'
import type { Request, Response, NextFunction } from 'express'
import Enquiry from '../models/Enquiry.js'
import Package from '../models/Package.js'

export async function createEnquiry(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name, phone, packageSlug, message } = req.body

    if (
      typeof name !== 'string' ||
      typeof phone !== 'string' ||
      typeof packageSlug !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !phone.trim() ||
      !packageSlug.trim() ||
      !message.trim()
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Name, phone, package and message are required.',
      })
      return
    }

    if (
      name.trim().length > 100 ||
      phone.trim().length > 20 ||
      packageSlug.trim().length > 100 ||
      message.trim().length > 1000
    ) {
      res.status(400).json({
        status: 'error',
        message: 'One or more fields exceed the allowed length.',
      })
      return
    }

    const tourPackage = await Package.findOne({
      slug: packageSlug.trim().toLowerCase(),
      isPublished: true,
    }).select('_id slug')

    if (!tourPackage) {
      res.status(400).json({
        status: 'error',
        message: 'The selected tour package is unavailable.',
      })
      return
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      packageSlug: tourPackage.slug,
      message: message.trim(),
    })

    res.status(201).json({
      status: 'success',
      message: 'Your enquiry has been submitted successfully.',
      data: {
        enquiryId: enquiry._id,
      },
    })
  } catch (error) {
    next(error)
  }
}


export async function getAllEnquiries(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // 1. Read filtering and pagination values
    const { status } = req.query

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    // 2. Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid page or limit. Limit must be between 1 and 100.',
      })
      return
    }

    // 3. Build the database filter
    const filter: {
      status?: 'new' | 'contacted' | 'closed'
    } = {}

    if (status !== undefined) {
      if (
        typeof status !== 'string' ||
        !['new', 'contacted', 'closed'].includes(status)
      ) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid enquiry status.',
        })
        return
      }

      filter.status = status as 'new' | 'contacted' | 'closed'
    }

    // 4. Calculate how many records to skip
    const skip = (page - 1) * limit

    // 5. Fetch enquiries and total count
    const [enquiries, totalEnquiries] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean(),

      Enquiry.countDocuments(filter),
    ])

    // 6. Send response
    res.status(200).json({
      status: 'success',
      results: enquiries.length,
      pagination: {
        currentPage: page,
        limit,
        totalEnquiries,
        totalPages: Math.ceil(totalEnquiries / limit),
      },
      data: {
        enquiries,
      },
    })
  } catch (error) {
    next(error)
  }
}


export async function getEnquiryById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    
    const { id } = req.params

    
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid enquiry ID.',
      })
      return
    }

    
    const enquiry = await Enquiry.findById(id)
      .select('-__v')
      .lean()

    
    if (!enquiry) {
      res.status(404).json({
        status: 'error',
        message: 'Enquiry not found.',
      })
      return
    }

    
    res.status(200).json({
      status: 'success',
      data: {
        enquiry,
      },
    })
  } catch (error) {
    next(error)
  }
}


export async function updateEnquiryStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    
    const { id } = req.params

    
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid enquiry ID.',
      })
      return
    }

    
    const { status } = req.body

    
    if (
      typeof status !== 'string' ||
      !['new', 'contacted', 'closed'].includes(status)
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Status must be new, contacted, or closed.',
      })
      return
    }

    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      {
        new: true,
        runValidators: true,
      },
    )
      .select('-__v')
      .lean()

    
    if (!enquiry) {
      res.status(404).json({
        status: 'error',
        message: 'Enquiry not found.',
      })
      return
    }

    
    res.status(200).json({
      status: 'success',
      message: 'Enquiry status updated successfully.',
      data: {
        enquiry,
      },
    })
  } catch (error) {
    next(error)
  }
}
