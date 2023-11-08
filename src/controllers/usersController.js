// let allUsers = require("../data/users.json");
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const db = require('../database/models');

const usersController = {

  index: function (req, res) {
    res.render('users/landing')
  },

  register: function (req, res) {
    res.render('users/register')
  },

  registerPost: async function (req, res) {

    const { firstName, lastName, age, email, password, category, street, number, city, postalCode } = req.body;
    const file = req.file;

    try {
      const userToRegister = await db.User.findOne({
        where: { email: email }
      })

      const validationReq = validationResult(req);

      if (validationReq.errors.length > 0) {
        return res.render('users/register', {
          errors: validationReq.mapped(),
          oldData: req.body
        })
      } else {

        if (userToRegister) {
          return res.render('users/register', {
            errors: {
              email: {
                msg: 'Email ya registrado',
              }
            },
            oldData: req.body,

          })
        } else {
          const userDate = {
            firstName,
            lastName,
            age,
            email,
            child: age < 18 ? 1 : 0,
            category: category,
            password: bcrypt.hashSync(password, 10),
            profileImg: `/img/users/${file.filename}`
          }
          const addresDate = {
            street,
            number,
            city,
            postalCode
          }

          const [addreesFind, Add] = await db.Address.findOrCreate({
            where: {
              street,
              number,
              city,
              postalCode
            },
            defaults: addresDate,
          });
          userDate.idAddress = addreesFind.id
          const userCreate = await db.User.create(userDate)
          //await userCreate.addAddress(addreesFind)   
          return res.redirect("/products")
        }
      }

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: function (req, res) {
    res.render('users/login')
  },

  logout: function (req, res) {
    req.session.destroy()
    res.clearCookie('userLogged')
    return res.redirect('/')
  },

  loginProcess: async function (req, res) {
    const { email, password } = req.body
    try {
      const validation = validationResult(req)
      if (validation.errors.length > 0) {
        return res.render('users/login', {
          errors: validation.mapped(),
          oldData: {
            email: email
          }
        })
      } else {

        const userToLogin = await db.User.findOne({
          where: { email: email }
        })

        if (userToLogin) {
          let isOkThePassword = bcrypt.compareSync(password, userToLogin.password)

          if (isOkThePassword) {
            req.session.userLogged = userToLogin.email

            if (req.body.Recordarme) {
              res.cookie('userLogged',
                req.session.userLogged, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            }
            console.log(req.session);
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

    } catch (err) {
      console.log("entrando");
      res.status(400).json({ message: err.message });
    }

  },

  profile: async function (req, res) {
    try {
      const users = await db.User.findOne({
        where: {
          email: req.session.userLogged
        },
        include: [
          {
            model: db.Address,
            as: 'address',
          }
        ]
      });

      if (users) {
        res.render('users/profile', { user: users })
      }

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  edit: async function (req, res) {
    console.log(req.session.userLogged);

    try {
      const findUser = await db.User.findByPk(req.params.id, {
        include: [
          {
            model: db.Address,
            as: 'address',
          }
        ]
      });

      if (findUser) {
        res.render('users/profileEdit', { user: findUser })
      }

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  put: async function (req, res) {
    const { firstName, lastName, age, email, password, category, street, number, city, postalCode } = req.body;
    const file = req.file;
 const findUser = await db.User.findByPk(
          req.params.id, {
          raw: true
        })
    try {

      const validationReq = validationResult(req);
      if (validationReq.errors.length > 0) {
        return res.render('users/profileEdit', {
          errors: validationReq.mapped(),
          oldData: req.body,
          user: {
            id: req.params.id,
            ...req.body,
            address: {
              street,
              postalCode,
              number,
              city
            }
          }
        },
        console.log(validationReq.array())
        )
        
      } else {
       
        console.log(req.body);
        if (findUser.email !== email) {
          req.session.userLogged = email
        }

        if (findUser) {
          findUser.firstName = firstName
          findUser.lastName = lastName
          findUser.age = age
          findUser.email = email
          findUser.child = age < 18 ? 1 : 0
          findUser.category = category
          findUser.password = password

          if (file) {
            if (findUser.profileImg) {
              fs.unlinkSync(path.resolve(__dirname, `../../public${findUser.profileImg}`));
            }
            findUser.profileImg = `/img/users/${file.filename}`;
          }
        }

        const addresDate = {
          street,
          number,
          city,
          postalCode
        }

        const addreesFind = await db.Address.update({
          street,
          number,
          city,
          postalCode
        }, {
          where: {
            id: findUser.idAddress
          }
        }
        );

        const updateUser = await db.User.update(findUser, {
          where: {
            id: req.params.id
          }
        })

        return res.redirect("/user/profile")
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = usersController