import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }
  const [, token] = authHeader.split(' ')
  try {
    const { isCompany } = await jwt.decode(token, authConfig.secret)
    if (isCompany) {
      return next()
    }
    return res.status(401).json({ error: 'You Are Not A Company' })
  } catch (err) {
    return res.status(401).json({ error: ' Invalid Token' })
  }
}
