const { Router } = require('express')
const  productsAPIController = require('../../controllers/api/productsAPIController')
const router = Router()

router.get('/api/products', productsAPIController.list)
router.get('/api/products/:id', productsAPIController.detail)

module.exports = router