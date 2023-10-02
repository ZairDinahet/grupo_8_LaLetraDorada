const express = require('express');
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const methodOverride = require('method-override')
const session = require('express-session')
const userMiddleware = require('./middleware/userMiddleware')
const cookies = require('cookie-parser');
const cookieMiddleware = require('./middleware/cookieMiddleware')


const app = express();
const PORT = 8080

app.use(session({
  secret: "Shh",
  resave: false,
  saveUninitialized: false,
}))

app.use(cookies());
app.use(cookieMiddleware);

app.use(express.static('public'))
// Configuro el entorno de la aplicacion para poder capturar la informacion de los forularios en forma de objeto literal:
app.use(express.urlencoded({ extended: true }))
// Configuro el template engine:
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
//Configuro methodOverride para poder usar los metodos put y delete:
app.use(methodOverride('_method'))

//middleware global 
app.use(userMiddleware.logged)

app.use('/products', productsRouter)
app.use(['/user',"/"], usersRouter)



app.use((req, res) => {
  res.status(404).send("ERROR 404 - Not Found")
});

app.listen(PORT, () =>{
  console.log(`[server] levantando en http://localhost:${PORT}`);
})