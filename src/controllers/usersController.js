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
    const validationReq = validationResult(req); 
    if (validationReq.errors.length > 0){
      console.log(validationReq.errors)
      return res.render('users/register', {
        errors: validationReq.mapped(),
        oldData: req.body
      })}
      let newUser = req.body;
    
      const file = req.file;
      newUser.id = User.generateId();
      newUser.age = +newUser.age;
      newUser.postalCode = newUser.postalCode;

      newUser.password = bcrypt.hashSync(req.body.password, 10);
      
      allUsers.push(newUser);

      fs.writeFileSync(path.resolve(__dirname,"../data/users.json"), JSON.stringify(allUsers, null, 4));
      return res.redirect("/products")
     } 
    ,

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