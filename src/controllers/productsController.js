const fs = require(`fs`);
const books = require("../data/books.json");
const path = require("path");

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
    //agregar la logica para agregar un libro al objeto books y actualizar el archivo books.jsonz
    const newBook = req.body;
    const file = req.file;
    console.log(newBook);
    newBook.tapaDura = +newBook.tapaDura;
    newBook.tapaBlanda = +newBook.tapaBlanda;
    newBook.pdf = +newBook.pdf;
    newBook.ebook = +newBook.ebook;
    newBook.img = `/img/products/${file.filename}`

    books.push(newBook);

    fs.writeFileSync(path.resolve(__dirname, "../data/books.json"), JSON.stringify(books, null, 4));
    res.redirect("/products") 
  },

  edit: function(req,res){
    //agregar la logica buscar el libro que tenga el id que me pasan por params y enviarlo a mi vista prodcutEdit para que se complete el formulario con esa informacion
    res.render('products/productEdit')
  },

  put: function (req, res) {
    //agregar la logica para editar un libro del objeto books. Primero hay que encontrarlo usando el id, books y despues actualizar el archivo books.json
  },

  delete: function (req, res) {
    //agregar la logica para buscar el libro que tenga el id que me pasan por params para eliminarlo de book, books.json y eliminar su foto.
  }
}


module.exports = productsController