import Sequelize, { Model } from 'sequelize'

class Order extends Model {
  static init (sequelize) {
    super.init(
      {
        value: Sequelize.STRING,
        event_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        payed: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    )
    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', foreignKeyConstraint: 'users' })
    this.hasOne(models.Event, { foreignKey: { name: 'event_id', field: 'id' }, constraints: 'id', foreignKeyConstraint: 'events', as: 'event' })
  }
}

export default Order
