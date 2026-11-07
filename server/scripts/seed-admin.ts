import mongoose from 'mongoose'
import { env } from '../src/config/env.js'
import { connectDatabase } from '../src/config/database.js'
import Admin from '../src/models/Admin.js'
import { hashPassword } from '../src/utils/auth.utils.js'

async function seedAdmin() {
  try {
    // Read admin credentials from environment variables
    const name = process.env.ADMIN_NAME
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const password = process.env.ADMIN_PASSWORD

    // Validate environment variables
    if (!name || !email || !password) {
      throw new Error('Admin environment variables are missing.')
    }

    if (password.length < 12) {
      throw new Error('Admin password must be at least 12 characters.')
    }

    // Connect to MongoDB Atlas
    await connectDatabase()

    // Prevent duplicate admin accounts
    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      console.log('An admin account with this email already exists.')
      return
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create the initial admin account
    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    })

    console.log('Initial admin account created successfully.')
  } catch (error) {
    console.error('Admin seeding failed:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedAdmin()