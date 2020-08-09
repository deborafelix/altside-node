import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import Company from '../models/Company'
import authConfig from '../../config/auth'

class SessionCompanyController {
  async store (req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    const { email, password } = req.body
    try {
      const company = await Company.findOne({ where: { email } })

      if (!company) {
        return res.status(401).json({ error: 'Company not found' })
      }
      if (!(await company.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match' })
      }

      const { id, name } = company
      return res.json({
        company: {
          id,
          name,
          email
        },
        token: jwt.sign({ id, isCompany: true, isUser: false }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    } catch (e) {
      console.log(e.message)
      return res
        .status(500)
        .json(
          {
            message: 'Internal Server Error'
          })
    }
  }
}

export default new SessionCompanyController()
