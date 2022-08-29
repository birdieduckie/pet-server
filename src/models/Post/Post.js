import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  tags: {
    type: [String],
  },
  publishdate: {
    type: Date,
    default: Date.now,
  },
})

export const Post = model('Post', postSchema)
