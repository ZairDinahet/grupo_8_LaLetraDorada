//Creo el objeto que contendra los libros que mostrare en home
// Completar las propiedades de description y biographyAutor para despues copiar el objeto y usarlo en detailController.js

const books = [
  {
    id: 1,
    name: "Trilogía de la Fundación",
    author: "Isaac Asimov",
    description: "",
    biographyAuthor: "",
    price: "$1989",
    img: "/img/home/asimov.png"
  },
  {
    id: 2,
    name: "Cuento de hadas",
    author: "Stephen King",
    description: "",
    biographyAuthor: "",
    price: "$3100",
    img: "/img/home/cuentos-de-hadas.png"
  },
  {
    id: 3,
    name: "El retrato de Dorian Gray",
    author: "Oscar Wilde",
    description: "",
    biographyAuthor: "",
    price: "$6000",
    img: "/img/home/dorian-gray.png"
  },
  {
    id: 4,
    name: "Dune",
    author: "Frank Herbert",
    description: "",
    biographyAuthor: "",
    price: "$3000",
    img:"/img/home/dune.png"
  },
  {
    id: 5,
    name: "La verdad sobre el caso del señor Valderman",
    author: "Edgar Allan Poe",
    description: "",
    biographyAuthor: "",
    price: "$2000",
    img: "/img/home/edgar-allan-poe.png"
  },
  {
    id: 6,
    name: "El corazón delator",
    author: "Edgar Allan Poe",
    description: "",
    biographyAuthor: "",
    price: "$5000",
    img: "/img/home/el-corazon-delator.png"
  },
  {
    id: 7,
    name: "El Hobbit",
    author: "J.R.R. Tolkien",
    description: "",
    biographyAuthor: "",
    price: "$7000",
    img: "/img/home/el-hobbit.png"
  },
  {
    id: 8,
    name: "El lobo estepario",
    author: "Hermann Hesse",
    description: "",
    biographyAuthor: "",
    price: "$3000",
    img: "/img/home/el-lobo-estepario.png"
  },
  {
    id: 9,
    name: "En la colonia penitenciaria",
    author: "Franz Kafka",
    description: "",
    biographyAuthor: "",
    price: "$3000",
    img: "/img/home/frank-kafka.png"
  },
  {
    id: 10,
    name: "Obras Completa",
    author: "Sigmund Freud",
    description: "",
    biographyAuthor: "",
    price: "$10000",
    img: "/img/home/sigmund-freud.png"
  },
  {
    id: 11,
    name: "1984",
    author: "George Orwell",
    description: "",
    biographyAuthor: "",
    price: "$5000",
    img: "/img/home/george-orwell-1984.png"
  },
  {
    id: 12,
    name: "¿Cuánta tierra necesita un hombre?",
    author: "León Tolstói",
    description: "",
    biographyAuthor: "",
    price: "$3000",
    img: "/img/home/leon-tolstoi.png"
  }
]

// Creo el objeto archivo+Controller que tendra los metodos(funciones) que utilizare para renderizar mis vistas y mostrarlas al cliente.
const indexController = {
  //El metodo index de este controlador es quien devolvera la vista prinpical de la ruta index. 
  //En este caso mediante el metodo render devuelvo mi archivo index.ejs
  index: function (req, res) {
    res.render('products/index', {books})
  }
}


module.exports = indexController