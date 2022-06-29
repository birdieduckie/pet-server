const express = require('express')
const cors = require('cors')

require('dotenv').config({ path: './config.env' })

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(require('./routes/users'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/admin', (req, res) => {
  res.send('Top secret admin page')
})

const dbo = require('./db/conn')

app.listen(PORT, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err)
  })
  console.log(`Server is running on port: ${PORT}`)
})
