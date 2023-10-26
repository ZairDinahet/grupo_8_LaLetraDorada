module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    category: {      
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    child: {
      type: DataTypes.INTEGER
    }, 

    profileImg: {      
      type: DataTypes.STRING(200),
    },

    idAddress: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
  }, 
  {
    timestamps: false
  })

  User.associate = (models) => {
    User.belongsTo(models.Address, {
      as: 'address',
      foreignKey: 'idAddress'
    })

    User.hasMany(models.Cart, {
      as: 'carts',
      foreignKey: 'idUser'
    })
  }

  return User
}