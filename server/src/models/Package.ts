import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const itinerarySchema = new Schema(
  {
    day: {
      type: Number,
      required: true,
      min: 1,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
)

const packageSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Package slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    duration: {
      type: String,
      required: [true, 'Package duration is required'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Package category is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Package description is required'],
      trim: true,
    },

    image: {
      type: String,
      required: [true, 'Package image is required'],
      trim: true,
    },

    itinerary: {
      type: [itinerarySchema],
      default: [],
    },

    inclusions: {
      type: [String],
      default: [],
    },

    exclusions: {
      type: [String],
      default: [],
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

export type PackageType = InferSchemaType<typeof packageSchema>

const Package = mongoose.model('Package', packageSchema)

export default Package
