import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }
  const [, token] = authHeader.split(' ')
  try {
    await promisify(jwt.verify)(token, authConfig.secret)
    const { id } = await jwt.decode(token, authConfig.secret)
    req.body.user_id = id
    return next()
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({ error: ' Invalid Token' })
  }
}
