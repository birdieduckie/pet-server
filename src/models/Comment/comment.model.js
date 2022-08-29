// import { Model, Schema, Types, model } from 'mongoose'

// interface IComment {
//   id: Types.ObjectId
//   text: string
//   publishDate: Date
//   // author:
// }

// type CommentModel = Model<IComment, {}>

// const commentSchema = new Schema<IComment, CommentModel>({
//   id: { type: Schema.Types.ObjectId, ref: 'commentId' },
//   text: {
//     type: String,
//     required: true,
//   },
//   publishDate: {
//     type: Date,
//     default: Date.now,
//   },
// })

// export const Comment = model<IComment, CommentModel>('Comment', commentSchema)
