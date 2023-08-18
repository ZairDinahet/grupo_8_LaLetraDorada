// Creo el objeto archivo+Controller que tendra los metodos(funciones) que utilizare para renderizar mis vistas y mostrarlas al cliente.

const indexController = {
  //El metodo index de este controlador es quien devolvera la vista prinpical de la ruta index. 
  //En este caso mediante el metodo render devuelvo mi archivo index.ejs
  index: function (req, res) {
    res.render('products/index')
  }
}


module.exports = indexController