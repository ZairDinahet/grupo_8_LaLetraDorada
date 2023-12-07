const { Router } = require('express')
const  productsAPIController = require('../../controllers/api/productsAPIController')
const router = Router()

router.get('/api/products', productsAPIController.list)

module.exports = router