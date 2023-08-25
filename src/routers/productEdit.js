const {Router} = require('express')
const productEditController = require('../controllers/productEditController')

const router = Router()

router.get('/', productEditController.index)

module.exports = router