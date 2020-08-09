import nodemailer from 'nodemailer'
import * as Yup from 'yup'
import smtpConfig from '../../config/smtp'
import Order from '../models/Order'
import User from '../models/User'
import Event from '../models/Event'

const nodemailerTransport = () => {
  const transport = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  return transport
}

class OrderController {
  async index (req, res) {
    const { user_id: userId } = req.body
    try {
      const userFound = await User.findByPk(userId)
      if (!userFound) {
        return res.status(400).json({ message: 'User Not Found' })
      }
      const orders = await Order.findAll({
        where: {
          user_id: userId
        },
        include: [{
          model: Event,
          as: 'event',
          required: true
        }]
      })
      console.log(orders)
      return res.status(200).json(orders)
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      user_id: Yup.string()
        .required(),
      event_id: Yup.number()
        .required()
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    try {
      const userFound = await User.findByPk(req.body.user_id)
      if (!userFound) {
        return res.status(400).json({ message: 'User Not Found' })
      }
      const newOrder = await Order.create({ ...req.body, payed: true })
      const transport = nodemailerTransport()

      await transport.sendMail({
        text: 'Compra realizada com sucesso',
        subject: 'Compra Altside',
        from: 'noreply@altside.com.br',
        to: userFound.email
      })
      return res.status(201).json(newOrder)
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async book (req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      user_id: Yup.string()
        .required(),
      event_id: Yup.string()
        .required()
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' })
    }
    try {
      const userFound = await User.findByPk(req.body.user_id)
      if (!userFound) {
        return res.status(400).json({ message: 'User Not Found' })
      }
      const newOrder = await Order.create({ ...req.body, payed: false })
      const transport = nodemailerTransport()

      await transport.sendMail({
        text: 'Reserva realizada com sucesso',
        subject: 'Reserva Altside',
        from: 'noreply@altside.com.br',
        to: userFound.email
      })
      return res.status(201).json(newOrder)
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default new OrderController()
