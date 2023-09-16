const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersController = {

  register: function (req, res) {
    res.render('users/register')
  },

  login: function (req, res) {
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