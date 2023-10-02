// 1. Guardar al usuario en la DB
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar al usuario por su ID
// 4. Editar la información del usuario
// 5. Eliminar al usuario de la DB
const users = require('../data/users.json')
const fs = require("fs")
const path = require("path")

const User = {
  getData: function(){
    return users
  },

  findByEmail: function(email){
    let allUsers = this.getData()
    let userFound = allUsers.find(user => user.email === email)
    return userFound
  },
  
  findByField: function(field, text){
    let allUsers = this.getData()
    let userFound = allUsers.find(oneUser => oneUser[field] === text)
    return userFound
  },

  findByPk: function (id){
    let allUsers = this.getData();
    let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound
  },

  generateId: function(){
    let allUsers = this.getData()
    let lastuser = allUsers.pop()
    if(lastuser){
      return lastuser.id + 1;
    }
    return 1;
  },

  //getCreateUser
  //Aqui pon tu logica para agregar usuarios al Json
  create: function(userData){
    let allUsers = this.getData;
    allUsers.push(userData);
    fs.writeFileSync(__dirname,"../data/users.json", JSON.stringify(allUsers, null, 4));
    return true;
  }
}

module.exports = User