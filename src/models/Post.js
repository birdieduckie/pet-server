import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  // tags: {
  //   type: [String],
  // },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
})

export const Post = mongoose.model('Post', postSchema)
