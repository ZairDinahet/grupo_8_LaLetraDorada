const books = require("../data/books.json")
const fs = require("fs")
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
    const idProduct = parseInt(req.params.id);
    let productE = books.find(p => p.id === idProduct)
    res.render('products/productEdit',{productE})
  },

  put: function (req, res) {
    //agregar la logica para editar un libro del objeto books. Primero hay que encontrarlo usando el id, books y despues actualizar el archivo books.json
    const idProduct = parseInt(req.params.id);
    const edit = req.body;
    //const index = books.find(p => p.id === idProduct)
    
    console.log(edit);
    /*fs.writeFileSync(path.join(__dirname,"../data/books.json"),JSON.stringify())
    res.render('products/',{})*/
  },

  delete: function (req, res) {
    //agregar la logica para buscar el libro que tenga el id que me pasan por params para eliminarlo de book, books.json y eliminar su foto.
  }
}


module.exports = productsController