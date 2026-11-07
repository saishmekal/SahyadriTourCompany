
import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const destinationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Destination slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Destination description is required'],
      trim: true,
    },

    image: {
      type: String,
      required: [true, 'Destination image is required'],
      trim: true,
    },

    location: {
      type: String,
      required: [true, 'Destination location is required'],
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export type DestinationType = InferSchemaType<
  typeof destinationSchema
>

const Destination =
  mongoose.models.Destination ||
  mongoose.model('Destination', destinationSchema)

export default Destination
