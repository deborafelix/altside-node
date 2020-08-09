import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Company extends Model {
  static init (sequelize) {
    super.init(
      {
        companyName: Sequelize.STRING,
        email: Sequelize.STRING,
        imgUrl: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    )
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
    return this
  }

  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default Company
