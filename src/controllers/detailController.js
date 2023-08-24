// en  books.json faltan completar las propiedades de description y biographyAutor. Hay que investigar y completarlas en el json

const detailController = {
  index: function (req, res) {
    res.render('products/detail')
  }
}


module.exports = detailController