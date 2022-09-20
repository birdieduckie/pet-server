import express from 'express'
import {
  getComments,
  createComment,
  editComment,
  deleteComment,
} from '../controllers/commentsController.js'
const comments = express.Router()

comments.get('/', getComments)

export default comments
