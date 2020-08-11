import * as Yup from 'yup'
import Event from '../models/Event'
import Company from '../models/Company'

class EventController {
  async index (req, res) {
    try {
      const events = await Event.findAll({
        include: [{
          model: Company,
          as: 'company',
          required: true
        }]
      })

      return res.status(200).json(events)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json(
          {
            message: 'Internal Server Error'
          })
    }
  }

  async getCompanyEvent (req, res) {
    const { user_id: companyId } = req.body
    try {
      const companyFound = await Company.findByPk(companyId)
      if (!companyFound) {
        return res.status(400).json({ message: 'Company Not Found' })
      }
      const events = await Event.findAll({
        where: {
          company_id: companyId
        }
      })

      return res.status(200).json(events)
    } catch (e) {
      return res
        .status(500)
        .json(
          {
            message: 'Internal Server Error'
          })
    }
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      imgUrl: Yup.string(),
      city: Yup.string().required(),
      user_id: Yup.number().required(),
      cep: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      state: Yup.string().required(),
      value: Yup.number().required(),
      includeValue: Yup.string().required(),
      date: Yup.date().required(),
      category: Yup.string().required()
    })
    const test = await schema.isValid(req.body)
    if (!(test)) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    try {
      const { user_id: companyId } = req.body
      req.body.user_id = undefined
      const companyFound = await Company.findByPk(companyId)
      if (!companyFound) {
        return res.status(400).json({ message: 'Company Not Found' })
      }
      const newEvent = await Event.create({ ...req.body, company_id: companyId })
      return res.status(201).json(newEvent)
    } catch (e) {
      return res
        .status(500)
        .json(
          {
            message: 'Internal Server Error'
          })
    }
  }
}

export default new EventController()
