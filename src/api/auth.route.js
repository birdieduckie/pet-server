import express from 'express'

const auth = express.Router()

auth.get('/', (req, res) => {
  console.log('Please log in or join us for free')
})

export default auth
