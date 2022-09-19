import express from 'express'
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  editUser,
} from '../controllers/usersController.js'

const users = express.Router()

// get all users - unnecessary? remove later
users.get('/', getUsers)

users.get('/:id', getUser)

users.post('/signup', createUser)

users.delete('/:id/delete', deleteUser)

users.patch('/:id/edit', editUser)

export default users
