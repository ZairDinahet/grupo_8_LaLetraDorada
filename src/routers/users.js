const { Router } = require('express');
const userMiddleware = require('../middleware/userMiddleware') //middleware user
const router = Router();
const upload = require('../middleware/usersMulter');
const usersController = require('../controllers/usersController')
const userLoginValidation = require('../middleware/userLoginValidation')
const userRegisterValidation = require(`../middleware/usersRegisterValidation`)


router.get(['/index','/'], usersController.index)


//Creación de usuario
router.get('/register',userMiddleware.auth, usersController.register)
router.post('/register',upload.single("imgUser"), userRegisterValidation, usersController.registerPost)

// Formulario de Login
router.get('/login',userMiddleware.auth, usersController.login)

// Proceso de login
router.post('/login', userLoginValidation, usersController.loginProcess)

// Logout
router.get('/logout', usersController.logout)


module.exports = router;