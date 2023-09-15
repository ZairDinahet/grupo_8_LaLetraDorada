// const users = require("../data/users.json")

const usersController = {

  login: function (req, res) {
    res.render('users/login')
  },
  
  register: function (req, res) {
    res.render('users/register')
  },
  index: function (req, res) {
    res.render('users/index')
  }
}


module.exports = usersController