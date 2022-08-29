import mongoose from 'mongoose'
import Isemail from 'isemail'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  registerdate: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)
export default User
