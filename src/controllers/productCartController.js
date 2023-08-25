const { render } = require('ejs');
const books = require('../data/books.json');

const productCartController = {
  index: function (req, res) {
    res.render('products/productCart', { cart: [] });
  },
  addToCart: function (req,res) {
    const productId = parseInt(req.params.id);
    const productToAdd = books.find(book => book.id == productId);    
    res.render('products/productCart', { cart: [productToAdd] });
  }
}

module.exports = productCartController