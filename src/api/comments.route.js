import express from 'express'

const comments = express.Router()

comments.get('/', (req, res) => {
  console.log('Better do not look here...')
})

export default comments
