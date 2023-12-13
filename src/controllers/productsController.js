const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator');
const db = require('../database/models')
const { Op } = require("sequelize");

const productsController = {

  index: async function (req, res) {

    try{
      let data = await db.Book.findAll({
        include:[{
          model: db.Author,
          as: 'authors',
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }],
      })

      if(!data.length) {
        throw new Error("¡Ups!, hubo un problema al cargar los datos");
      }
      
      return res.render('products/index', {books: data})

    } catch (err) {

      res.status(500).json({ message: err.message })

    }
  },

  detail: async function (req, res) {
    const { id } = req.params;

    try {      

      const data = await db.Book.findByPk(id, {
        include:[{
          model: db.Author,
          as: 'authors',
        }],
      });

      const dataBooks = await db.Book.findAll({
        include:[{
          model: db.Author,
          as: 'authors',
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }],
      })

      if(!data || !dataBooks.length) {
        
        throw new Error("¡Ups!, hubo un problema al cargar los datos");
      } 

      res.render('products/detail', {books: dataBooks, book: data})

    } catch (err) {

      res.status(404).json({message: err.message})

    }
  },

  cart: async function (req,res) {

    const { id } = req.params

    try {

      const books = await db.Book.findAll({
        include:[{
          model: db.Author,
          as: 'authors',
        }],
      })

      if(id){
        const data = await db.Book.findByPk(id, {
          include:[{
            model: db.Author,
            as: 'authors',
          },
          {
            model: db.Genre,
            as: 'genres',
          }
        ],
        })
  
        if(!data) {
  
          throw new Error('El libro no fue encontrado');
  
        }
  
        return res.render('products/productCart', { cart: [data], books});
      }
      
      return res.render('products/productCart', { cart: [], books});

    } catch (err) {

      return res.status(404).json({ message: 'Error en la busqueda', err });

    }
    
  },

  create: async function (req, res) {

    try {      

      const data = await db.Genre.findAll()

      if(data.length === 0) {  

        throw new Error("¡Ups!, hubo un problema al cargar los generos");

      } 

      res.render('products/productCreate', {genres: data})
      
    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  },

  post: async function (req, res) {

    const {title, description, coverImg, priceHardCover, priceSoftCover, priceAudio, priceEpub, author, biography, genre } = req.body

    const file = req.file;

    const validationReq = validationResult(req);
    

    const dataBook = {
      title, 
      description,
      coverImg: `/img/products/${file?.filename}`,
      priceHardCover,
      priceSoftCover,
      priceAudio,
      priceEpub,
    }

    const dataAuthor = {
      name: author,
      biography,
    }
    

    try {

      if(validationReq.errors.length === 0) {
        
        const genreFind = await db.Genre.findByPk(genre)

        const [authorObj, createdAuthor] = await db.Author.findOrCreate({
          where: { name: dataAuthor.name },
          defaults: dataAuthor, 
        });

        const bookCreate = await db.Book.create(dataBook)
        await bookCreate.addGenre(genreFind)
        await bookCreate.addAuthor(authorObj)


        res.redirect('/products')
        
      } else {

        const data = await db.Genre.findAll()

        return res.render('products/productCreate', {
          errors: validationReq.mapped(),
          oldData: req.body,
          genres: data
        })
        
      }
    } catch (err) {
      
      res.status(400).json({ message: `Error al crear libro. ${err.message}` });

    }

  },

  edit: async function(req,res){
    const { id } = req.params;

    try {      
      

      let data = await db.Book.findByPk(id, {
        include:[{
          model: db.Author,
          as: 'authors',
        },
        {
          model: db.Genre,
          as: 'genres',
        }
      ],
      });

      const dataGenres = await db.Genre.findAll()

      if(!data) {
        
        throw new Error("¡Ups!, hubo un problema al buscar los datos");
      } 

        return res.render('products/productEdit', {book: data, allGenres: dataGenres})
        // res.json(data)

    } catch (err) {
      res.status(404).json({message: err.message})
    }
  },

  put: async function (req, res) {

    const {title, description, coverImg, priceHardCover, priceSoftCover, priceAudio, priceEpub, author, biography, genre } = req.body
    const { id } = req.params;

    const file = req.file;

    const validationReq = validationResult(req);

    try {
      
      if(validationReq.errors.length === 0) {

        let data = await db.Book.findByPk(id, {
          include: [{
            model: db.Author,
            as: 'authors',
          },
          {
            model: db.Genre,
            as: 'genres',
          }
          ],
        });

        const dataBook = {
          title,
          description,
          priceHardCover,
          priceSoftCover,
          priceAudio,
          priceEpub,
        }

        if(file){
          fs.unlinkSync(path.resolve(__dirname, `../../public${data.coverImg}`));

          dataBook.coverImg = `/img/products/${file.filename}`
        } else{
          dataBook.coverImg = data.coverImg
        }
        
        const [authorObj, createdAuthor] = await db.Author.findOrCreate({
          where: { name: author, biography: biography},
          defaults: { name: author, biography: biography},
        });

        const genreFind = await db.Genre.findByPk(genre)

        await data.update(dataBook); 

        await data.setGenres([genreFind]); 
        await data.setAuthors([authorObj]);

        res.redirect('/products')
        
      } else {

        const data = await db.Genre.findAll()

        return res.render('products/productEdit', {
          errors: validationReq.mapped(),
          oldData: req.body,
          book: {
            id,
            ...req.body,
            genres: [
              {id: genre}
            ],
            authors:[
              {
                name: author,
                biography
              }
            ]
          },
          allGenres: data
        })

      }

    } catch (err) {
      
      res.status(400).json({ message: `"Error al editar libro. ${err.message}` });

    }
    
  },

  delete: async function (req, res) {

    const { id } = req.params

    try {
      const data = await db.Book.findByPk(id)

      if (!data) {
        throw new Error('El libro no fue encontrado');
      }
      
      await data.setGenres([]); 
      await data.setAuthors([]);
      await data.setCarts([]);

      await data.destroy()
      
      res.redirect('/products')

    } catch (err) {

      return res.status(500).json({ message: 'Error al eliminar el libro y sus relaciones', err });

    }
    
  },

  search: async (req, res) => {
    const { title } = req.body   

    try{
      
      const data = await db.Book.findAll({
          where: {
              title: {
                  [Op.like]: `%${title}%`
              }
          },
          include:[{
            model: db.Author,
            as: 'authors',
            attributes: ['name'],
            through: {
              attributes: [],
            }
          }],
      })

      if(!data.length) {
        
        res.render('products/productSearch', {book: undefined})
      } 

      return res.render('products/productSearch', {book: data})
        
      
    } catch (err) {
        res.status(404).json({message: err.message})
        
    }

  },
}


module.exports = productsController