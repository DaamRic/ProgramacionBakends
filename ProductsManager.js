class ProductManager {
    constructor() {
    this.products = [];
    }

    generateUniqueId() {
        return '' + Math.random().toString(36).substr(2, 9);
    }

    getProducts() {
    return this.products;
    }

    addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;
    
    if (this.products.some(product => product.code === code)) {
        throw new Error('El código ya está en uso');
    }

    const id = this.generateUniqueId();
    const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    this.products.push(product);
    return product;
    }

    getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    return product;
    }
}


const productManager = new ProductManager();


const product1 = productManager.addProduct({
    title: 'Producto prueba',
    description: 'Este producto es una prueba',
    price: 10,
    thumbnail: 'No hay imagen',
    code: 'abc123',
    stock: 10,
});

console.log(productManager.getProducts()); 

try {
    productManager.addProduct({
    title: 'producto repetible',
    description: 'Este es un producto repetible',
    price: 100,
    thumbnail: 'Otra imagen',
    code: 'abc123',
    stock: 100,
    });
} catch (error) {
    console.error(error.message);
}


const productById = productManager.getProductById(product1.id);
console.log(productById);