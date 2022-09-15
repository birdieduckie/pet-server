import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  img: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const Post = model('Post', postSchema)
