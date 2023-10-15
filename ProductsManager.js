const fs = require('fs');

class ProductManager {
constructor() {
    this.products = [];
    this.filePath = 'products.json';
    this.loadProductsFromFile();
}

generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

loadProductsFromFile() {
    try {
    const data = fs.readFileSync(this.filePath, 'utf8');
    this.products = JSON.parse(data);
    } catch (error) {
    this.products = [];
    }
}

saveProductsToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, 'utf8');
}

getProducts() {
    return this.products;
}

addProduct(productData) {
    const codeExists = this.products.some((product) => product.code === productData.code);

    if (codeExists) {
    throw new Error('El código del producto ya está en uso.');
    }

    const productId = this.generateUniqueId();

    const newProduct = {
    id: productId,
    ...productData,
    };

    this.products.push(newProduct);

    this.saveProductsToFile();

    return productId;
}

getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
    throw new Error('Producto no encontrado.');
    }

    return product;
}

updateProduct(productId, updatedData) {
    const productIndex = this.products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
    throw new Error('Producto no encontrado.');
    }

    updatedData.id = productId;

    this.products[productIndex] = updatedData;

    this.saveProductsToFile();
    console.log(products)
}

deleteProduct(productId) {
    const productIndex = this.products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
    throw new Error('Producto no encontrado.');
    }

    this.products.splice(productIndex, 1);

    this.saveProductsToFile();
}
}

const productManager = new ProductManager();

const products = productManager.getProducts();
console.log(products); 

try {
const productId = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
});

console.log('Producto agregado con ID:', productId);
} catch (error) {
console.error(error.message);
}

const updatedProducts = productManager.getProducts();
console.log(updatedProducts);

try {
const productById = productManager.getProductById(products[0].id);
console.log('Producto encontrado por ID:', productById);
} catch (error) {
console.error(error.message);
}

try {
productManager.updateProduct(products[0].id, {
    title: 'Producto actualizado',
    description: 'Este es un producto prueba',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
});

console.log('Producto actualizado con éxito.');
} catch (error) {
console.error(error.message);
}

try {
    productManager.deleteProduct(products[0].id);
    console.log('Producto eliminado con éxito.');
    } catch (error) {
    console.error(error.message);
    }


module.exports = ProductManager