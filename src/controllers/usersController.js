import mongoose from 'mongoose'
// import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

// dotenv.config()
// get all users
export const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}

// get a single user - can be separate checks, but they made the same thing
export const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'Cannot find such user' })
  }

  res.status(200).json(user)
}

export const getMe = async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    username,
    email,
  })
}

// create a new user
export const createUser = async (req, res) => {
  const { username, avatar, email, password, registerdate } = req.body
  console.log(req.body)
  const userExists = await User.findOne({ email, username })

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log(hashedPassword)

    const user = await User.create({
      username,
      avatar,
      email,
      password: hashedPassword,
      registerdate,
    })

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.username,
        token: generateToken(user._id),
      })
    }

    user.save()

    // res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Wrong credentials' })
    }

    if (user && isMatch) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findByIdAndDelete(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}
// update user
export const editUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findByIdAndUpdate(id, { ...req.body })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}
