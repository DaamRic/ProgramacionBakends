const express = require('express');
const ProductManager = require('./ProductsManager');


const app = express();
const port = 8080;

const productManager = new ProductManager();

app.use(express.json());

app.get('/products', (req, res) => {
const { limit } = req.query;
let products = productManager.getProducts();

if (limit) {
    const limitNumber = parseInt(limit, 10);
    products = products.slice(0, limitNumber);
}

res.json(products);
});

app.get('/products/:id', (req, res) => {
const productId = req.params.id;
try {
    const product = productManager.getProductById(productId);
    res.json(product);
} catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
}
});

app.listen(port, () => {
console.log(`Servidor corriendo en el puerto ${port}`);
});