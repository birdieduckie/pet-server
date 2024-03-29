import express from 'express'
import {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} from '../controllers/postsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const posts = express.Router()

posts.get('/', getPosts)

posts.get('/:id', authMiddleware, getPost)

posts.post('/newpost', createPost)

posts.patch('/:id/edit', editPost)

posts.delete('/:id/delete', deletePost)

export default posts
