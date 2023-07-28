const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"))

})



app.listen(PORT, () =>{
  console.log(`[server] levantando en http://localhost:${PORT}`);
})