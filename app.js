const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"))

})
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"))
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"))
})
app.get('/productcart', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productCart.html"))
})
app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/detail.html"))
})

app.listen(PORT, () =>{
  console.log(`[server] levantando en http://localhost:${PORT}`);
})