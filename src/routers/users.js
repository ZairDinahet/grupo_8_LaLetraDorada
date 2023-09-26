const { Router } = require('express');
const usersController = require('../controllers/usersController')
const userLoginValidation = require('../middleware/userLoginValdation')
const userMiddleware = require('../middleware/userMiddleware') //middleware user
const router = Router();


router.get(['/index','/'], usersController.index)

router.get('/register',userMiddleware.auth, usersController.register)

// Formulario de Login
router.get('/login',userMiddleware.auth, usersController.login)

// Proceso de login
router.post('/login', userLoginValidation, usersController.loginProcess)

// Logout
router.get('/logout', usersController.logout)


module.exports = router;