import jwt from 'jsonwebtoken'

export const authMw = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
