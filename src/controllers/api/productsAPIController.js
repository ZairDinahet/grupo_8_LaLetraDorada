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
    };
    

module.exports = apiProductsController
