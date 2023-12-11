const db = require('../../database/models');
const { QueryTypes } = require('sequelize');

const apiProductsController = {
    list: async function (req, res) {
        //console.log(productsByCategory)
        try {
          const productsByCategory = await db.sequelize.query(
            "SELECT genres.name AS genero, COUNT(books.id) AS cantidad_De_Libros " +
            "FROM genres " +
            "JOIN booksgenres ON genres.id = booksgenres.idGenre " +
            "JOIN books ON booksgenres.idBook = books.id " +
            "GROUP BY genres.name",
            { type: QueryTypes.SELECT }
          );

            const products = await db.Book.findAll({
                include: [{ 
                    model: db.Genre, 
                    as: 'genres', 
                    through: 'booksgenres' 
                  },
                    {
                      model: db.Author,
                      as: 'authors',
                    },
                  ],
                });

            res.status(200).json({
            meta: {
              status: res.statusCode,
              count: products.length,
              url: req.protocol + '://' + req.get('host') + req.url,
            }, 

            data:{
                countByCategory: 
                productsByCategory,
                // products.reduce((acc, product) => {
                //     product.genres.forEach((genre) => {
                //     acc[genre.name] = (acc[genre.name] || 0) + 1;
                //     });
                //     return acc;
                //     }, {}),
                products: products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.priceHardCover,
                    genres: product.genres.map((genre) => genre.name),
                    authors: product.authors.map((author) => author.name),
                    detail: req.protocol + '://' + req.get('host') + req.url + `/${product.id}` , 
                    })),
            },
            });
            } catch (error) {
            console.error(error);
            res.status(500).json({
                meta: {
                status: res.statusCode,
                message: "Hubo un error en la base de datos",
                },
            });
            res.status(400).json({
                meta: {
                status: res.statusCode,
                message: "No se pueden mostrar los datos",
                },
            });
            }
        },

    detail: async function (req, res) {
        const { id } = req.params;
    
        try {
          const product = await db.Book.findOne({
            where: {
              id
            },
            include: [
                {
                  model: db.Genre,
                  as: 'genres'
                },
                {
                  model: db.Author,
                  as: 'authors'
                },
              ]
          });
    
          if (product) {
            product.coverImg = req.protocol + '://' + req.get('host') + product.coverImg
            return res.status(200).json({
              meta: {
                status: res.statusCode,
                url: req.protocol + '://' + req.get('host') + req.url
              },
              data: product
            });
          }
    
          throw new Error('El producto con el ID ingresado no existe en la base de datos');
        } catch (error) {
          res.status(404).json({
            meta: {
              status: res.statusCode,
              url: req.protocol + '://' + req.get('host') + req.url
            },
            message: error.message
          });
        }
      }
};
    

module.exports = apiProductsController
