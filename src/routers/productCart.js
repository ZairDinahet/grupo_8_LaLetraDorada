const { Router } = require('express');
const productCartController = require('../controllers/productCartController');

const router = Router();

router.get('/', productCartController.index );

router.get('/:id', productCartController.addToCart);


module.exports = router;