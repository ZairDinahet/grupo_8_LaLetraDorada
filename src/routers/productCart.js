const { Router } = require('express')
const productCartController = require('../controllers/productCartController')

const router = Router()

router.get('/', productCartController.index )


module.exports = router