import mongoose from 'mongoose'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

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
  const { text, img, username, createdAt } = req.body

  try {
    const owner = await User.findOne({ username })
    const post = await Post.create({
      text,
      img,
      createdAt,
      owner: owner.id,
    })
    console.log(post)
    res.status(200).json(post)
    res.send(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete post
export const deletePost = async (req, res) => {
  const { id } = req.params
  console.log(req.params)

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: 'Unfortunately No such post' })
  // }

  // const user = await User.findById(req.user.id)

  // if (!user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // if (post.owner.toString() !== user.id) {
  //   res.status(401)
  //   throw new Error("Cannot delete other users's posts")
  // }

  const post = await Post.findByIdAndDelete(id)

  if (!post) {
    return res.status(404).json({ error: 'oh no...not found' })
  }

  res.status(200).json(post)
}
// update post
export const editPost = async (req, res) => {
  const { id } = req.params
  const { text } = req.body
  console.log(req.body)
  console.log(req.params)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' })
  }

  // const user = await User.findById(req.user.id)

  // if (!user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // if (post.owner.toString() !== user.id) {
  //   res.status(401)
  //   throw new Error("Cannot edit other users's posts")
  const post = await Post.findOneAndUpdate(
    id,
    { text: text },
    {
      new: true,
    }
  )

  if (!post) {
    return res.status(404).json({ error: 'No such post' })
  }
  post.save()

  console.log(post.text)

  res.send(post)
}

export const likePost = async (req, res) => {}
