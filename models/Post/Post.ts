import { Model, Schema, Types, model } from 'mongoose'

interface IPost {
  id: Types.ObjectId
  text: string
  image: string
  likes: number
  tags: string[]
  publishDate: Date
  // author:
}

type PostModel = Model<IPost, {}>

const postSchema = new Schema<IPost, PostModel>({
  id: { type: Schema.Types.ObjectId, ref: 'postId' },
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
  publishDate: {
    type: Date,
    default: Date.now,
  },
})

export const Post = model<IPost, PostModel>('Post', postSchema)
