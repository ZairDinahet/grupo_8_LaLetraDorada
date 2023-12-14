const path = require('path')
const { body } = require('express-validator');

const productsEditValidation = [
  body('title').notEmpty().withMessage("Su libro debe tener un titulo").bail().escape(),
  body('author').notEmpty().withMessage("Ingrese el nombre del autor").bail().escape(),
  body('genre').notEmpty().withMessage("Debe seleccionar el genero de su libro").bail(),
  body('description').notEmpty().withMessage("Debe completar la descripcion de su libro").bail().escape(),
  body('biography').notEmpty().withMessage("Debe completar la biografia del autor").bail().escape(),
  body(['priceHardCover', 'priceSoftCover', 'priceAudio', 'priceEpub']).custom((value, { req }) => {
    if (!req.body.priceHardCover && !req.body.priceSoftCover && !req.body.priceAudio && !req.body.priceEpub) {
      throw new Error('Debe especificar al menos un precio');
    }
    return true;
  }),
//   body('coverImg').custom((value, {req}) => {
//     let file = req.file;
//     let acceptedExtensions = [".jpg",".png", ".jpeg", ".gif"];
//     if(!file){
//         throw new Error("Debe subir una imagen")
//     }
//     let fileExtension = path.extname(file.originalname) 
//     if (!acceptedExtensions.includes(fileExtension)){
//         throw new Error("Las extensiones de archivo permitidas son .jpg, .png, .jpeg, .gif")
//     }
//     return true
// }).bail(),
]


module.exports = productsEditValidation