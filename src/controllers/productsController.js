let books = require("../data/books.json")
const fs = require('fs')
const path = require('path')
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

      if(data.length > 0) {

        return res.render('products/index', {books: data})

      } else {
        throw new Error("¡Ups!, hubo un problema al cargar los datos");
      }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
  },

  detail: async function (req, res) {
    try {      
      const { id } = req.params;
      let data = await db.Book.findByPk(id, {
        include:[{
          model: db.Author,
          as: 'authors',
        }],
      });

      if(data !== null) {
        res.render('products/detail', {books, book: data})
      } else {
        throw new Error("¡Ups!, hubo un problema al cargar los datos");
      }
      // let biografia = data.biographyAuthor;
      // let biografiaArray = [];
      // if(data.biographyAuthor.includes("\r\n")){ 
      //   biografia = biografia.split('\r\n');
      // } else
      // {
      //   biografiaArray.push(biografia);
      //   biografia = biografiaArray
      // }
  
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  },

  cart: function (req,res) {
    const productId = parseInt(req.params.id);
    if(productId) {
      const productToAdd = books.find(book => book.id == productId);    
      res.render('products/productCart', { cart: [productToAdd] });
    } else {
      res.render('products/productCart', { cart: [] });
    }
    
  },

  create: async function (req, res) {
    const data = await db.Genre.findAll()
    try {      
      if(data !== null) {
        res.render('products/productCreate', {genres: data})
      } else {
        throw new Error("¡Ups!, hubo un problema al cargar los generos");
      }

    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  },

  post: async function (req, res) {

    const {title, description, coverImg, priceHardCover, priceSoftCover, priceAudio, priceEpub, author, biography, genre } = req.body

    const file = req.file;

    const dataBook = {
      title, 
      description,
      coverImg: `/img/products/${file.filename}`,
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

      if(title !== null && description !== null && coverImg !== null && genre !== null && author !== null) {
        
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

        throw new Error("Error al crear libro. Debes completar todos los campos");

      }
    } catch (err) {
      
      res.status(400).json({ message: err.message });

    }

  },

  edit: function(req,res){
    //agregar la logica buscar el libro que tenga el id que me pasan por params y enviarlo a mi vista prodcutEdit para que se complete el formulario con esa informacion
    const idProduct = parseInt(req.params.id);
    let productE = books.find(p => p.id === idProduct)
    res.render('products/productEdit',{productE})
  },

  put: function (req, res) {
    //agregar la logica para editar un libro del objeto books. Primero hay que encontrarlo usando el id, books y despues actualizar el archivo books.json
    const idProduct = parseInt(req.params.id);
    const edit = req.body;
    const file = req.file;

    const index = books.findIndex(p => p.id === idProduct)
    books[index].name = edit.name
    books[index].author = edit.author
    books[index].genre = !edit.genre ? books[index].genre : edit.genre
    books[index].description = edit.description
    books[index].biographyAuthor = edit.biographyAuthor
    books[index].tapaDura = +edit.tapaDura
    books[index].tapaBlanda = +edit.tapaBlanda
    books[index].epub = +edit.epub
    books[index].pdf = +edit.pdf

    if(file){
      fs.unlinkSync(path.resolve(__dirname, `../../public${books[index].img}`));
      books[index].img = `/img/products/${file.filename}`
    } else{
      books[index].img =  books[index].img 
    }

    fs.writeFileSync(path.resolve(__dirname,"../data/books.json"),JSON.stringify(books,null,4))
    res.redirect('/products')
    console.log(books[index]);
  },

  delete: function (req, res) {
    const bookId = parseInt(req.params.id);
    const book = books.find((book) => book.id === bookId);

    if (book) {
      const bookImg = path.resolve(__dirname, `../../public${book.img}`);
      fs.unlinkSync(bookImg);

      books = books.filter((book) => book.id !== bookId);
      fs.writeFileSync(path.resolve(__dirname, '../data/books.json'), JSON.stringify(books,null,4));
    }
    res.redirect('/products')
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

      if(data.length > 0) {
        return res.render('products/productSearch', {book: data})

      } else {
        res.render('products/productSearch', {book: undefined})
        //throw new Error("¡Ups!, hubo un problema al cargar los datos");
      }
    } catch (err) {
        res.status(500).json({message: err.message})
        
    }

  },
}


module.exports = productsController