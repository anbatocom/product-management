const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Trang chủ") // .pug ở đuôi 
})

app.get('/products', async (req, res) => {
  res.send('Trang danh sach san pham')
})

app.get('/about', (req, res) => {
  res.render("about")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})