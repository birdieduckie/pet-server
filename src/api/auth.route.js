import express from 'express'
import { userLogin } from '../controllers/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

import { User } from '../models/User.js'

const auth = express.Router()

auth.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.send(user)
  } catch (err) {
    console.err(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

export default auth
