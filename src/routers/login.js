const { Router } = require('express')
const loginController = require('../controllers/loginController')

const router = Router()

router.get('/', loginController.index )


module.exports = router