import mongoose from 'mongoose'
import { Role } from '../models/Role.js'
import { User } from '../models/User.js'

// export const getUsers = async (req, res) => {
//   try {
//     const userRole = new Role()
//     const adminRole = new Role({ value: 'ADMIN' })
//     await userRole.save()
//     await adminRole.save()
//     console.log(userRole)
//     res.json(adminRole)
//   } catch (error) {
//     console.log(error)
//   }
// }

export const loginUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'login error' })
  }
}

export const userLogin = async (req, res) => {
  const { username, email, password } = req.body
  const candidate = await User.findOne({ email, username })

  if (!candidate) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  try {
    const user = await User.create({
      username,
      avatar,
      email,
      password,
      registerdate,
    })

    user.password = bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt)
    })

    user.save()

    const secret = process.env.JWT_SECRET

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, secret, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

    // res.status(200).json(newUser)

    // res.send('User registered')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
