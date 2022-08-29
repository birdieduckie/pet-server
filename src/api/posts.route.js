import express from 'express'

const posts = express.Router()

posts.get('/', (req, res) => {
  res.json({ mssg: 'all posts' })
})

posts.get('/:id', (req, res) => {
  res.json({ mssg: 'get post by id' })
})

posts.patch('/:id/edit', (req, res) => {
  res.json({ mssg: 'edit post' })
})

posts.delete('/:id/delete', (req, res) => {
  res.json({ mssg: 'delete post' })
})
export default posts
