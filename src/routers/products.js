//Uso destructuring para extraer el metodo Router de express
const { Router } = require('express')
//Importo el controlador que sera el responsable de responder con determinado comportamiento a mi cliente.
//Mediante el path y el metodo http que tenga nuestra ruta sabremos que devolver. 
const productsController = require('../controllers/productsController')
const upload = require('../middleware/productsMulter')
const guest = require('../middleware/guestMiddleware') // middleware huesped

// Ejecuto Router para empezar a crear mis rutas que devolveran las vistas.
const router = Router()

// Agrego esta porcion de codigo "upload.single('nameInput')" entre la ruta(las que usare para cargar imagenes o modificarlas) y el controlador. Tomando en cuanta que hay que pasarle a single el name del input que queremos guardar.

// Aregar este atributo enctype="multipart/form-data" en la etiqueda form de los formularios que vayan a cargar imagenes

// Dentro de la etiqueda form de los formularios que quieran que se comporten como put o delete agregar al final del path del atributo action esto ?_method=PUT o DELETE. Ej: action="usuarios/actualizar?_method=PUT"

router.get('/', productsController.index)

router.get('/create',guest.auth, productsController.create)
router.post('/create', upload.single("coverImg") , productsController.post)

router.get('/cart/:id?',guest.auth, productsController.cart);

router.get('/edit/:id',guest.auth, productsController.edit)
router.put('/edit/:id',upload.single("coverImg"), productsController.put)

router.get('/:id', productsController.detail)

router.delete('/delete/:id',guest.auth, productsController.delete)

router.post('/search', productsController.search)

//Exporto router, quien aloja todas las rutas que creo para que mi archivo de cabecera (en este caso app.js) decida donde usar esta ruta. 
module.exports = router