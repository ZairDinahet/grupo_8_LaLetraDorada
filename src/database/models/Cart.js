module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.BIGINT(10),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },

    quantity: {
      type: DataTypes.INRTEGER,
    },

    shipping: {
      type: DataTypes.STRING(50),
    },

    dicount: {
      type: DataTypes.DECIMAL(10, 2),
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2)
    },

    payMethod: {
      type: DataTypes.STRING(50),
    },

    idUser: {
      type: DataTypes.BIGINT(10),
    }
  }, 
  {
    timestamps: false
  })

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'idUser',
    })

    Cart.hasMany(models.Invoice, {
      as: 'invoices',
      foreignKey: 'idCart'
    })

    Cart.belongsToMany(models.Book, {
      as: 'books',
      through: 'cartsbooks',
      foreignKey: 'idCart',
      otherKey: 'idBook',
      timestamps: false
    })
  }
  
  return Cart
}