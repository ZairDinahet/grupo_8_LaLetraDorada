module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    type: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2)
    },

    payMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    idCart: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
  }, 
  {
    timestamps: false
  })

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Cart, {
      as: 'cart',
      foreignKey: 'idCart'
    })
  }
  return Invoice
}