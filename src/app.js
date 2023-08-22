const express = require('express');
// Importo las rutas de mis diferentes vistas:
const indexRoute = require('./routers/index')
const registerRouter = require('./routers/register')
const loginRouter = require('./routers/login')
const productCartRouter = require('./routers/productCart')
const detailRouter = require('./routers/detail')
const productEditRouter = require('./routers/productEdit')

const app = express();
const PORT = 8080


app.use(express.static('public'))

// Configuro el template engine:
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

// Configuro el servidor usando app.use para que al usar determinado path(ej: "/login") se derive la responsabilidad de respoder a las rutas que importe previamente.
app.use('/', indexRoute)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/productcart', productCartRouter)
app.use('/detail', detailRouter)
app.use('/productedit',productEditRouter)

app.listen(PORT, () =>{
  console.log(`[server] levantando en http://localhost:${PORT}`);
})