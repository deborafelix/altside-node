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
    console.log(req.body)
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

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    const { email, oldPassword } = req.body
    try {
      const user = await User.findByPk(req.userId)

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } })

        if (userExists) {
          return res.status(400).json({ error: 'User already exists.' })
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' })
      }
      const { id, name } = await user.update(req.body)

      return res.json({
        id,
        name,
        email
      })
    } catch (e) {
      return res
        .status(500)
        .json({
          message: 'Internal Server Error'
        })
    }
  }
}

export default new UserController()
