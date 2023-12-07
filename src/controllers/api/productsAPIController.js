const db = require('../../database/models');

const apiProductsController = {
    list: async function (req, res) {
        // const { QueryTypes } = require('sequelize');
        // const productsByCategory = await sequelize.query("SELECT * FROM `genres`", { type: QueryTypes.SELECT });
        // console.log(productsByCategory)
        try {
            const products = await db.Book.findAll({
                include: [{ 
                    model: db.Genre, 
                    as: 'genres', 
                    through: 'booksgenres' }],
                });
            res.status(200).json({
            meta: {
              status: res.statusCode,
              count: products.length,
              url: req.protocol + '://' + req.get('host') + req.url,
            }, 
            data:{
                countByCategory: products.reduce((acc, product) => {
                    product.genres.forEach((genre) => {
                    acc[genre.name] = (acc[genre.name] || 0) + 1;
                    });
                    return acc;
                    }, {}),
                products: products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    categories: product.genres.map((genre) => genre.name),
                    detail: req.protocol + '://' + req.get('host') + req.url + `/${product.id}` , 
                    })),
            },
            });
            } catch (error) {
            console.error(error);
            res.status(500).json({
                meta: {
                code: res.statusCode,
                message: "Hubo un error en la base de datos",
                },
            });
            res.status(400).json({
                meta: {
                code: res.statusCode,
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
            return res.status(200).json({
              meta: {
                status: res.statusCode,
                url: req.protocol + '://' + req.get('host') + req.url
              },
              data: {
                id: product.id,
                title: product.title,
                description: product.description,
                coverImgUrl: product.coverImg ? req.protocol + '://' + req.get('host') + product.coverImg : null,
                priceHardCover: product.priceHardCover,
                priceSoftCover: product.priceSoftCover,
                priceEpub: product.priceEpub,
                priceAudio: product.priceAudio,
                genres: product.genres.map((genre) => genre.name),
                authors: product.authors.map((author) => author.name)
              }
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
