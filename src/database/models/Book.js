module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },

    coverImg: {
      type: DataTypes.STRING(200)
    },

    priceHardCover: {
      type: DataTypes.DECIMAL(10, 2),
    },

    priceSoftCover: {
      type: DataTypes.DECIMAL(10, 2),
    },

    priceEpub: {      
      type: DataTypes.DECIMAL(10, 2),
    },

    priceAudio: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, 
  {
    timestamps: false
  })

  Book.associate = (models) => {
    
    Book.belongsToMany(models.Cart, {
        as: 'carts',
        through: 'cartsbooks',
        foreignKey: 'idBook',
        otherKey:'idCart',
        timestamps: false
    })

    Book.belongsToMany(models.Author, {
        as: 'authors',
        through: 'booksauthors',
        foreignKey: 'idBook',
        otherKey:'idAuthors',
        timestamps: false
    })

    Book.belongsToMany(models.Genre, {
        as: 'genres',
        through: 'booksgenres',
        foreignKey: 'idBook',
        otherKey:'idGenre',
        timestamps: false
    })
  }

  return Book
}