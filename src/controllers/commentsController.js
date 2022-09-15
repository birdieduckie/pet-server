import mongoose from 'mongoose'
import Comment from '../models/Comment/Comment.js'

// get all comments
export const getComments = async (req, res) => {
  const comments = await Comment.find({})
  res.status(200).json(comments)
}

// get a single comment
export const getComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' })
  }

  const comment = await Comment.findById(id)

  if (!comment) {
    return res.status(404).json({ error: 'No such comment' })
  }

  res.status(200).json(comment)
}

// create a new Comment
export const createComment = async (req, res) => {
  const { text, createdAt, owner, toPost } = req.body

  try {
    const comment = await Comment.create({
      text,
      createdAt,
      owner,
      toPost,
    })
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete Comment
export const deleteComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' })
  }

  const comment = await Comment.findByIdAndDelete(id)

  if (!comment) {
    return res.status(404).json({ error: 'No such comment' })
  }

  res.status(200).json(comment)
}
// update Comment
export const editComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' })
  }

  const comment = await Comment.findByIdAndUpdate(id, { ...req.body })

  if (!comment) {
    return res.status(404).json({ error: 'No such comment' })
  }

  res.status(200).json(comment)
}
