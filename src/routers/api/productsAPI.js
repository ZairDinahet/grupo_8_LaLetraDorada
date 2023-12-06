const { Router } = require('express')
const  productsAPIController = require('../../controllers/api/productsAPIController')
const router = Router()

router.get('/products', productsAPIController.list)

module.exports = router