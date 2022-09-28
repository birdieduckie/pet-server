import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import users from './src/api/users.route.js'
import posts from './src/api/posts.route.js'
import comments from './src/api/comments.route.js'
import auth from './src/api/auth.route.js'

dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api/v1/users', users)
app.use('/api/v1/', posts)
// app.use('/api/v1/comments', comments)
app.use('/api/v1/auth', auth) 
// ???
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

mongoose
  .connect(process.env.PETS_URI)
  .then(() => {
    console.log('MongoDB is connected...')
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })

export default app
