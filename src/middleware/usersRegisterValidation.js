const path = require("path")
const { error } = require("console");
const {body} = require("express-validator");
const userRegisterValidation = [
    body("firstName").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("lastName").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("age").notEmpty().withMessage("Debe llenar este campo").bail().escape().isNumeric().withMessage("Debe llenar este campo con un número"),
    body("email").notEmpty().withMessage("Debe llenar este campo con un email").bail().escape().isEmail().withMessage("Debe llenar este campo con un formato de email válido").normalizeEmail(),
    body("password").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("postalCode").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("shippingAdress").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("imgUser").custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions = [".jpg",".png"];
        if(!file){
            throw new Error("Debe subir una imagen")
        }
        let fileExtension = path.extname(file.originalname) 
        if (!acceptedExtensions.includes(fileExtension)){
            throw new Error("Las extensiones de archivo permitidas son .jpg y .png")
        }
        return true
    }).bail()
]

module.exports = userRegisterValidation;