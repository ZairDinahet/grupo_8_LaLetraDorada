const { Router } = require('express')
const detailController = require('../controllers/detailController')

const router = Router()

router.get('/:id?', detailController.index )


module.exports = router