import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { env } from './config/env.js'
import { connectDatabase } from './config/database.js'
import healthRoutes from './routes/health.routes.js'
import packageRoutes from './routes/package.routes.js'
import destinationRoutes from './routes/destination.routes.js'
import enquiryRoutes from './routes/enquiry.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import mongoose from 'mongoose'

import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware.js'

const app = express()

app.use(helmet())

app.use(cors({
  origin: (origin, callback) => {
    if (origin === env.clientOrigin) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.json({
    message: 'Sahyadri Tour Company API is running',
    status: 'success',
  })
})

app.use('/api', healthRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

async function startServer() {
  try {
    await connectDatabase()

    const server = app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`)
    })

    let isShuttingDown = false

    const shutdown = (signal: string) => {
      if (isShuttingDown) return

      isShuttingDown = true
      console.log(`${signal} received. Starting graceful shutdown...`)

      server.close(async (error) => {
        if (error) {
          console.error('Error closing HTTP server:', error)
          process.exitCode = 1
        }

        try {
          await mongoose.disconnect()
          console.log('MongoDB connection closed.')
        } catch (dbError) {
          console.error('Error closing MongoDB connection:', dbError)
          process.exitCode = 1
        }

        process.exit(process.exitCode ?? 0)
      })
    }

    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('SIGTERM', () => shutdown('SIGTERM'))

  } catch (error) {
    console.error('Failed to start the server:', error)
    process.exit(1)
  }
}

startServer()