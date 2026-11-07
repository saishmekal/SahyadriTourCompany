import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
      maxlength: 20,
    },

    packageSlug: {
      type: String,
      required: [true, 'Package selection is required'],
      lowercase: true,
      trim: true,
    },

    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  },
)

export type EnquiryType = InferSchemaType<typeof enquirySchema>

const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model('Enquiry', enquirySchema)

export default Enquiry