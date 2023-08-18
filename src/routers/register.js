const { Router } = require('express')
const registerController = require('../controllers/registerController')

const router = Router()

router.get('/', registerController.index )


module.exports = router