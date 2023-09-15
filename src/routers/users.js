const { Router } = require('express');
const usersController = require('../controllers/usersController')

const router = Router();


router.get('/login', usersController.login)

router.get('/register', usersController.register)

router.get(['/index','/'], usersController.index)

module.exports = router;