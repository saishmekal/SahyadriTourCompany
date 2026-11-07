import mongoose from 'mongoose'

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing from the environment')
  }

  // Monitor MongoDB connection events
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully')
  })

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Waiting for reconnection...')
  })

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })
}
