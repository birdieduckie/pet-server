const express = require('express')

const userRoutes = express.Router()

const dbo = require('../db/conn')

const ObjectId = require('mongodb').ObjectId

userRoutes.route('/users').get((req, res) => {
  let db_connect = dbo.getDb('users')
  db_connect
    .collection('users')
    .find()
    .toArray((err, result) => {
      if (err) throw err
      res.json(result)
      console.log(result)
    })
})

userRoutes.route('/user/:id').get((req, res) => {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection('records').findOne(myquery, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

userRoutes.route('/user/add').post((req, response) => {
  let db_connect = dbo.getDb()
  let myobj = {
    name: req.body.name,
    surname: req.body.surname,
  }
  db_connect.collection('records').insertOne(myobj, (err, res) => {
    if (err) throw err
    response.json(res)
  })
})

userRoutes.route('/update/:id').post((req, response) => {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  let newvalues = {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
    },
  }
})

userRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection('users').deleteOne(myquery, (err, obj) => {
    if (err) throw err
    console.log('1 document deleted')
    response.json(obj)
  })
})

module.exports = userRoutes
