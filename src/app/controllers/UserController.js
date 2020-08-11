import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      imgUrl: Yup.string(),
      password: Yup.string()
        .required()
        .min(6),
      cpf: Yup.string()
        .required()
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    try {
      const userFound = await User.findOne({ where: { email: req.body.email } })
      if (userFound) {
        return res.status(400).json({ error: 'User already exists' })
      }
      const { id, name, email } = await User.create(req.body)
      return res.json({
        id,
        name,
        email
      })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
}

export default new UserController()
