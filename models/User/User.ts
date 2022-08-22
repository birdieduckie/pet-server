import { Model, Schema, Types, model } from 'mongoose'
import Isemail from 'isemail'

interface IUser {
  id: Types.ObjectId
  userName: string
  firstName: string
  lastName: string
  avatar?: string
  email: string
  phone?: string
  password: string
  registerDate: Date
}

type UserModel = Model<IUser, {}>

const userSchema = new Schema<IUser, UserModel>({
  id: { type: Schema.Types.ObjectId, ref: 'userId' },
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [Isemail.validate, 'Please enter a valid email'],
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please enter a valid password'],
    minlength: [8, 'Minimum password length must be 8 characters'],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
})

export const User = model<IUser, UserModel>('User', userSchema)
