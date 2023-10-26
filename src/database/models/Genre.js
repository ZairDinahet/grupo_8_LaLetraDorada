module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  }, 
  {
    timestamps: false
  })

  Genre.associate = (models) => {
    
    Genre.belongsToMany(models.Book, {
      as: 'books',
      through: 'booksgenres',
      foreignKey: 'idGenre',
      otherKey:'idBook',
      timestamps: false
  })
  }
  return Genre
}