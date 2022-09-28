import express from 'express'
import {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} from '../controllers/postsController.js'

const posts = express.Router()

posts.get('/', getPosts)

posts.get('/post/:id', getPost)

posts.post('/newpost', createPost)

posts.patch('/post/:id/edit', editPost)

posts.delete('/', deletePost)

export default posts
