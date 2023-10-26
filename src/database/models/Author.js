module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    biography: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
  }, 
  {
    timestamps: false
  })

  Author.associate = (models) => {
    
    Author.belongsToMany(models.Book, {
      as: 'books',
      through: 'booksauthors',
      foreignKey: 'idAuthor',
      otherKey: 'idBook',
      timestamps: false
  })

  }
  return Author
}