// en  books.json faltan completar las propiedades de description y biographyAutor. Hay que investigar y completarlas en el json
const books=require("../data/books.json")

const detailController = {
  index: function (req, res) {
    const idDeseada = parseInt(req.params.id);
    let book = books.find(b => b.id == idDeseada);
    const biografiaParrafos = book.biographyAuthor.split('\n\n');
    res.render('products/detail', {books, book, biografiaParrafos})
  }
};


module.exports = detailController