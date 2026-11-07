import mongoose, { Schema, type InferSchemaType } from 'mongoose'


const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Admin password is required'],
      select: false,
    },

    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export type AdminType = InferSchemaType<typeof adminSchema>

const Admin =
  mongoose.models.Admin ||
  mongoose.model('Admin', adminSchema)

export default Admin