const { Router } = require('express');
const upload = require('../middleware/usersMulter');
const usersController = require('../controllers/usersController')
const userMiddleware = require('../middleware/userMiddleware') //middleware user
const guest = require('../middleware/guestMiddleware') // middleware huesped
const userLoginValidation = require('../middleware/userLoginValidation')
const userRegisterValidation = require(`../middleware/usersRegisterValidation`)
const userEditValidation = require(`../middleware/usersEditMiddleware`)

const router = Router();

router.get(['/index','/'], usersController.index)


//Creación de usuario
router.get('/register',userMiddleware.auth, usersController.register)
router.post('/register',upload.single("profileImg"), userRegisterValidation, usersController.registerPost)

// Formulario de Login
router.get('/login',userMiddleware.auth, usersController.login)

// Proceso de login
router.post('/login', userLoginValidation, usersController.loginProcess)

router.get('/profile',guest.auth,usersController.profile)

router.get('/edit/:id',guest.auth,usersController.edit)
router.put('/edit/:id',upload.single("profileImg"),userEditValidation, usersController.put)
// Logout
router.get('/logout',guest.auth, usersController.logout)


module.exports = router;