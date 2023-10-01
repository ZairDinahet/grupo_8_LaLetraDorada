let allUsers = require("../data/users.json");
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

const usersController = {
  
  index: function (req, res) {
  res.render('users/landing')
  },

  register: function (req, res) {
    res.render('users/register')
  },

  registerPost: function(req,res){
     const validation = validationResult(req);
     if (validation.errors.length = 0){ 
      let newUser = req.body;
    
      const file = req.file;
      newUser.id = User.generateId();
      newUser.firstName = newUser.firstName;
      newUser.lastName = newUser.lastName;
      newUser.age = +newUser.age;
      newUser.email = newUser.email;
      newUser.postalCode = newUser.postalCode;
      newUser.shippingAdress = newUser.shippingAdress;
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      
      allUsers.push(newUser);

      fs.writeFileSync(path.resolve(__dirname,"../data/users.json"), JSON.stringify(allUsers, null, 4));
      res.redirect("/products")
     } else if (validation.errors.length > 0){
      return res.render('users/login', {
        errors: validation.errors.mapped(),
        oldData: req.body
      })}
    },

  login: function(req, res) {
    res.render('users/login')
  },

  logout: function (req, res) {
    req.session.destroy()
    //En este controller se deben eliminar las coockies
    return res.redirect('/')
  },

  loginProcess: function (req, res) {
    const validation = validationResult(req)
    const {email, password} = req.body

    if(validation.errors.length > 0) {

      return res.render('users/login', {
        errors: validation.mapped(),
        oldData: {
          email: email
        }
      })

    }

    const userToLogin = User.findByField('email', email)

    if(userToLogin) {

      let isOkThePassword = bcrypt.compareSync(password, userToLogin.password)

      if(isOkThePassword) {

        req.session.userLogged = userToLogin.email
        return res.redirect("/products")

      } else {

        return res.render('users/login', {
          errors: {
            password: {
              msg: 'Contraseña invalida',
            }
          },
          oldData: {
            email: email
          }
        })

      }

    }

    return res.render('users/login', {
      errors: {
        email: {
          msg: 'No tienes una cuenta registrada'
        },
      },
      oldData: {
        email: email
      }
    })
  }
}


module.exports = usersController