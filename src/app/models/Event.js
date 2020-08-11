import Sequelize, { Model } from 'sequelize'

class Event extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        imgUrl: Sequelize.STRING,
        city: Sequelize.STRING,
        company_id: Sequelize.INTEGER,
        cep: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        state: Sequelize.STRING,
        value: Sequelize.DOUBLE,
        includeValue: Sequelize.STRING,
        date: Sequelize.DATE,
        category: Sequelize.STRING
      },
      {
        sequelize
      }
    )
    return this
  }

  static associate (models) {
    this.belongsTo(models.Company, { foreignKey: { name: 'company_id', field: 'id' }, foreignKeyConstraint: 'companies', as: 'company' })
  }
}

export default Event
