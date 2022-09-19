import express from 'express'
import {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} from '../controllers/postsController'
const posts = express.Router()

posts.get('/', getPosts)

posts.get('/:id', getPost)

posts.post('/newpost', createPost)

posts.patch('/:id/edit', editPost)

posts.delete('/:id/delete', deletePost)
export default posts
