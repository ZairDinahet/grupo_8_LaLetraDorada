const books = require("../data/books.json")
const fs = require('fs')
const path = require('path')

const productsController = {

  index: function (req, res) {
    res.render('products/index', {books})
  },

  detail: function (req, res) {
    const idDeseada = parseInt(req.params.id);
    let book = books.find(b => b.id == idDeseada);
    const biografiaParrafos = book.biographyAuthor.split('\n\n');
    res.render('products/detail', {books, book, biografiaParrafos})
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
    //agregar la logica para agregar un libro al objeto books y actualizar el archivo books.json
  },

  edit: function(req,res){
    //agregar la logica buscar el libro que tenga el id que me pasan por params y enviarlo a mi vista prodcutEdit para que se complete el formulario con esa informacion
    res.render('products/productEdit')
  },

  put: function (req, res) {
    //agregar la logica para editar un libro del objeto books. Primero hay que encontrarlo usando el id, books y despues actualizar el archivo books.json
  },

  delete: function (req, res) {
    const bookId = parseInt(req.params.id);
    const book = books.find((book) => book.id === bookId);

  if (book) {
    const bookImg = path.resolve(__dirname, `../../public${book.img}`);
    fs.unlinkSync(bookImg);

    const bookDeleted = books.filter((book) => book.id !== bookId);
    fs.writeFileSync(path.resolve(__dirname, '../data/books.json'), JSON.stringify(bookDeleted));
  }

    res.redirect('/products')
}
}


module.exports = productsController