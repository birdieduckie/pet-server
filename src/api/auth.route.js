import express from 'express'
import { authMw } from '../middleware/auth.js'

import { User } from '../models/User.js'

const auth = express.Router()

auth.get('/', authMw, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.send(user)
  } catch (err) {
    console.err(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

export default auth
