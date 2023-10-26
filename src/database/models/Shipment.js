module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(50),
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
    }
  }, 
  {
    timestamps: false
  })

  Shipment.associate = (models) => {

    Shipment.belongsToMany(models.Cart, {
      as: 'carts',
      through: 'cartsshipments',
      foreignKey: 'idShipment',
      otherKey: 'idCart',
      timestamps: false
    })
  }
  return Shipment
}