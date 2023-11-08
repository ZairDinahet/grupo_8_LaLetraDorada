const path = require("path")
const {body} = require("express-validator");
const userEditValidation = [
    body("firstName").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("lastName").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("age").notEmpty().withMessage("Debe llenar este campo").bail().escape().isNumeric().withMessage("Debe llenar este campo con un número"),
    body("email").notEmpty().withMessage("Debe llenar este campo con un email").bail().escape().isEmail().withMessage("Debe llenar este campo con un formato de email válido").normalizeEmail(),
    body("street").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("postalCode").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("number").notEmpty().withMessage("Debe llenar este campo").bail().escape().isNumeric().withMessage("Debe llenar este campo con un número"),
    body("city").notEmpty().withMessage("Debe llenar este campo").bail().escape(),
    body("category").notEmpty().withMessage("Debe elegir una categoria").bail().escape(),
]

module.exports = userEditValidation;