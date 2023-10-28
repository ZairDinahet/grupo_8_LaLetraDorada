let books = require("../data/books.json")
const fs = require('fs')
const path = require('path')
const db = require('../database/model')

const productsController = {

  index: async function (req, res) {
    //res.render('products/index', {books})

    try{
      const data = await db.Book.findAll({
        raw: true
      })
      if(data.length > 0) {

        return res.render('products/index', {books: dat})
      } else {
        throw new Error("¡Ups!, hubo un problema al cargar los datos");
      }
    } catch (err) {
        res.status(404).json({message: err.message})
    }
  },

  detail: function (req, res) {
    const idDeseada = parseInt(req.params.id);
    let book = books.find(b => b.id == idDeseada);
    //resolviendo problema de separación en párrafos de la biografía:
    let biografia = book.biographyAuthor;
    let biografiaArray = [];
    if(book.biographyAuthor.includes("\r\n")){ biografia = biografia.split('\r\n');}else{biografiaArray.push(biografia);biografia = biografiaArray}
    //renderizado de la página:
    res.render('products/detail', {books, book, biografia})
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

  create: function (req, res) {
    res.render('products/productCreate')
  },

  post: function (req, res) {
    //agregar la logica para agregar un libro al objeto books y actualizar el archivo books.jsonz
    const newBook = req.body;
    const file = req.file;
    console.log(newBook);
    //volviendo a los precios números en vez de strings
    newBook.tapaDura = +newBook.tapaDura;
    newBook.tapaBlanda = +newBook.tapaBlanda;
    newBook.pdf = +newBook.pdf;
    newBook.epub = +newBook.epub;
    newBook.img = `/img/products/${file.filename}`
    //creando una nueva Id a product
    let oldBook = books[books.length - 1];
    let ultimaId = oldBook ? oldBook.id : 0;
    newBook.id = ultimaId + 1;
    //pusheando el cambio a books
    books.push(newBook);
    //sobreescribiendo el json
    fs.writeFileSync(path.resolve(__dirname, "../data/books.json"), JSON.stringify(books, null, 4));
    res.redirect("/products") 
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
  }
}


module.exports = productsController