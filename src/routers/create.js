const { Router } = require('express')
const createController = require('../controllers/createController')

const router = Router()

router.get('/', createController.index )


module.exports = router