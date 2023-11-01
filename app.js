const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ProductManager = require('./productManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/products', async (req, res) => {
  const { query } = req;
  const { limit } = query;
  const productManager = new ProductManager();
  const product = await productManager.getProducts();
  if (!limit) {
    res.json(product);
  } else {
    const filtrated = product.filter((prod) => prod.id <= limit);
    console.log("filtrado");
    return res.json(filtrated);
  }
});

app.get('/products/:pId', async (req, res) => {
  const prodId = req.params.pId;
  const parseId = parseInt(prodId);
  const productManager = new ProductManager();
  const search = await productManager.getProductsbyId(parseId);
  return res.send(search);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

io.on('connection', async (socket) => {
  console.log('Cliente conectado');
  const productManager = new ProductManager();
  const products = await productManager.getProducts();
  socket.emit('products', products);
});
  
  const productManager = new ProductManager();
  const products = await productManager.getProducts();
  socket.emit('products', products);