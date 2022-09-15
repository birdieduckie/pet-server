import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  toPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
})

export const Comment = model('Comment', commentSchema)
