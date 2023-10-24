module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.BIGINT(10),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    street: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    number: {
      type: DataTypes.INTEGER
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
  },
  {
    timestamps: false,
    tableName: 'adresses',
  })

  Address.associate = function (models) {
    Address.hasMany(models.User, { 
        as: 'users',
        foreignKey: 'idAddress'
    })
  }

  return Address
}