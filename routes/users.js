const express = require('express')

const userRoutes = express.Router()

const dbo = require('../db/conn')

const ObjectId = require('mongodb').ObjectId

userRoutes.route('/users').get(function (req, res) {
  let db_connect = dbo.getDb('PetPets')
  let users = db_connect
    .collection('users')
    .find()
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
      console.log(result)
    })
  console.log(users)
})

userRoutes.route('/user/:id').get(function (req, res) {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection('users').findOne(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
})

userRoutes.route('/user/add').post(function (req, response) {
  let db_connect = dbo.getDb()
  let myobj = {
    name: req.body.name,
    surname: req.body.surname,
  }
  db_connect.collection('records').insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})

userRoutes.route('/update/:id').post(function (req, response) {
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
  db_connect.collection('users').deleteOne(myquery, function (err, obj) {
    if (err) throw err
    console.log('1 document deleted')
    response.json(obj)
  })
})

module.exports = userRoutes
