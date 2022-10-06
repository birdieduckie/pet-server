import express from 'express'
import {
  getUsers,
  getUser,
  getMe,
  createUser,
  deleteUser,
  editUser,
  userLogin,
} from '../controllers/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const users = express.Router()

// get all users - unnecessary? remove later
users.get('/', getUsers)

users.get('/:id', getUser)

users.get('/me', authMiddleware, getMe)

users.post('/signup', createUser)

users.post('/login', authMiddleware, userLogin)

users.delete('/:id/delete', authMiddleware, deleteUser)

users.patch('/:id/edit', authMiddleware, editUser)

export default users
