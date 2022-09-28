import mongoose from 'mongoose'
// import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
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
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

// create a new user
export const createUser = async (req, res) => {
  const { username, avatar, email, password, registerdate } = req.body
  const candidate = await User.findOne({ email, username })

  if (candidate) {
    return res.status(400).json({ error: 'User already exists' })
  }

  try {
    const user = await User.create({
      username,
      avatar,
      email,
      password,
      registerdate,
    })

    user.password = bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt)
    })

    user.save()

    const secret = process.env.JWT_SECRET

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, secret, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

    // res.status(200).json(newUser)

    // res.send('User registered')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
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
