//Uso destructuring para extraer el metodo Router de express
const { Router } = require('express')
//Importo el controlador que sera el responsable de responder con determinado comportamiento a mi cliente.
//Mediante el path y el metodo http que tenga nuestra ruta sabremos que devolver. 
const indexController = require('../controllers/indexController')

// Eejecuto Router para empezar a crear mis rutas que devolveran las vistas.
const router = Router()

//indexController.index = function(){...}
//Es un callback(funcion que es pasada como parametro a otra funcion)

router.get('/', indexController.index )

//Exporto router, quien aloja todas las rutas que creo para que mi archivo de cabecera (en este caso app.js) decida donde usar esta ruta. 
module.exports = router