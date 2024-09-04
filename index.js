const express = require('express')
const app = express();
const port = 3000;

app.set('views', './views') //tìm đến thư mục tên là views
app.set('view engine', 'pug') // xác định view engine có đuôi .pug

app.get('/', (req, res) => {
  res.render("client/pages/home/index.pug") // .pug ở đuôi 
})

app.get('/products', (req, res) => {
  res.render('client/pages/products/index.pug')
})

app.get('/about', (req, res) => {
  res.render("about")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})