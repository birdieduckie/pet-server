import mongoose from 'mongoose'
import { Post } from '../models/Post/Post.js'

// get all posts
export const getPosts = async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
}

// get a single post
export const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' })
  }

  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ error: 'No such post' })
  }

  res.status(200).json(post)
}

// create a new post
export const createPost = async (req, res) => {
  const { text, images, likes, tags, createdAt, owner } = req.body

  try {
    const post = await Post.create({
      text,
      images,
      likes,
      tags,
      createdAt,
      owner,
    })
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete post
export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' })
  }

  const post = await Post.findByIdAndDelete(id)

  if (!post) {
    return res.status(404).json({ error: 'No such post' })
  }

  res.status(200).json(post)
}
// update post
export const editPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' })
  }

  const post = await POst.findByIdAndUpdate(id, { ...req.body })

  if (!post) {
    return res.status(404).json({ error: 'No such post' })
  }

  res.status(200).json(post)
}
