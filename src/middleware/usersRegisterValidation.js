
const {body} = require("express-validator");
const userRegisterValidation = [
    body("firstName").notEmpty().withMessage("Debe llenar este campo"),
    body("lastName").notEmpty().withMessage("Debe llenar este campo"),
    body("age").notEmpty().withMessage("Debe llenar este campo").isNumeric().withMessage("Debe llenar este campo con un número"),
    body("imgUser").notEmpty().withMessage("Debe subir una imagen de perfil"),
    body("email").notEmpty().withMessage("Debe llenar este campo con un email").isEmail().withMessage("Debe llenar este campo con un email").normalizeEmail().withMessage("Debe llenar este campo con un email"),
    body("password").notEmpty().withMessage("Debe llenar este campo"),
    body("postalCode").notEmpty().withMessage("Debe llenar este campo")
]

module.exports = userRegisterValidation;