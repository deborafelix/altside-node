import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }
  const [, token] = authHeader.split(' ')
  try {
    const { isUser } = await jwt.decode(token, authConfig.secret)
    if (isUser) {
      return next()
    }
    return res.status(401).json({ error: 'You Are Not An User' })
  } catch (err) {
    return res.status(401).json({ error: ' Invalid Token' })
  }
}
