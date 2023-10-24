const express = require('express');
const productManager = require('./productManager');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/products', async (req, res) => {
  const { query } = req;
  const { limit } = query;
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
  const search = await productManager.getProductsbyId(parseId);
  return res.send(search);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});