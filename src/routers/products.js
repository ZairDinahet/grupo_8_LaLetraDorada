const { Router } = require('express')

const productsController = require('../controllers/productsController')
const upload = require('../middleware/productsMulter')
const guest = require('../middleware/guestMiddleware') // middleware huesped
const productsCreateValidation = require('../middleware/productsCreateValidation')
const productsEditValidation = require('../middleware/productsEditValidation')

const router = Router()


router.get('/', productsController.index)

router.get('/create',guest.auth,guest.authAdmin, productsController.create)
router.post('/create', upload.single("coverImg"), productsCreateValidation, productsController.post)

router.get('/cart/:id?',guest.auth, productsController.cart);

router.get('/edit/:id',guest.auth,guest.authAdmin, productsController.edit)
router.put('/edit/:id',upload.single("coverImg"), productsEditValidation, productsController.put)

router.get('/:id', productsController.detail)

router.delete('/delete/:id',guest.auth,guest.authAdmin, productsController.delete)

router.post('/search', productsController.search)

//Exporto router, quien aloja todas las rutas que creo para que mi archivo de cabecera (en este caso app.js) decida donde usar esta ruta. 
module.exports = router