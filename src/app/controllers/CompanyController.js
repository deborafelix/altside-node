import * as Yup from 'yup'
import Company from '../models/Company'

class CompanyController {
  async store (req, res) {
    const schema = Yup.object().shape({
      companyName: Yup.string().required(),
      imgUrl: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      cnpj: Yup.string()
        .required()
    })
    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Failed' })
      }
      const companyFound = await Company.findOne({ where: { cnpj: req.body.cnpj } })
      if (companyFound) {
        return res.status(400).json({ error: 'Company already exists' })
      }
      const { id, name, email, cnpj } = await Company.create(req.body)
      return res.json({
        id,
        name,
        email,
        cnpj
      })
    } catch (e) {
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
}

export default new CompanyController()
