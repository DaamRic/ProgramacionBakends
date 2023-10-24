const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.path = 'productos.txt';
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      console.log('El archivo no se encuentra');
      return [];
    }

    try {
      const listJSON = await fs.promises.readFile(this.path, 'utf-8');
      const list = JSON.parse(listJSON);
      console.log('Lista de productos:', list);
      return list;
    } catch (error) {
      console.error(`Ocurrió un error: ${error.message}`);
      return [];
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.warn("Todos los campos son requeridos");
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log(`Ya existe este código ${code} de producto`);
      return;
    }

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    console.log('Producto agregado:', newProduct);

    const content = JSON.stringify(this.products, null, '\t');

    try {
      await fs.promises.writeFile(this.path, content, 'utf-8');
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }

  async getProductsbyId(prodid) {
    const products = await this.getProducts();
    const getId = products.find((p) => p.id == prodid);
    if (!getId) {
      console.warn("Producto no encontrado");
      return null;
    }

    console.log("Producto Buscado:", getId);
    return getId;
  }

  async updateProduct(prodid, newTitle, newDescription, newPrice, NewThumbnail, newCode, newStock) {
    const products = await this.getProducts();
    const index = products.findIndex((e) => e.id === prodid);
    if (index === -1) {
      console.warn("Producto no encontrado");
      return;
    }

    const updatedObj = {
      ...products[index],
      title: newTitle || products[index].title,
      description: newDescription || products[index].description,
      price: newPrice || products[index].price,
      thumbnail: NewThumbnail || products[index].thumbnail,
      code: newCode || products[index].code,
      stock: newStock || products[index].stock,
    };

    products[index] = updatedObj;
    console.log(products);

    const content = JSON.stringify(products, null, '\t');

    try {
      await fs.promises.writeFile(this.path, content, 'utf-8');
      console.log('Producto actualizado');
    } catch (error) {
      console.error(`No pudo actualizarse el producto: ${error.message}`);
    }
  }

  async deleteProduct(prodid) {
    const products = await this.getProducts();
    const updatedList = products.filter((e) => e.id !== prodid);

    if (updatedList.length === products.length) {
      console.warn("Producto no encontrado");
      return;
    }

    const content = JSON.stringify(updatedList, null, '\t');
    try {
      await fs.promises.writeFile(this.path, content, 'utf-8');
      console.log('Producto borrado');
    } catch (error) {
      console.error(`No se pudo borrar el producto: ${error.message}`);
    }
  }
}


const productManager = new ProductManager();

productManager.addProduct(
  "Producto Alpha",
  "Descripción Alpha",
  55000,
  "imagen_alpha.jpg",
  12345,
  10
);

productManager.addProduct(
  "Producto Beta",
  "Descripción Beta",
  72000,
  "imagen_beta.jpg",
  54321,
  15
);

productManager.addProduct(
  "Producto Gamma",
  "Descripción Gamma",
  48000,
  "imagen_gamma.jpg",
  11111,
  25
);

productManager.addProduct(
  "Producto Delta",
  "Descripción Delta",
  60000,
  "imagen_delta.jpg",
  98765,
  8
);

productManager.addProduct(
  "Producto Epsilon",
  "Descripción Epsilon",
  23000,
  "imagen_epsilon.jpg",
  22222,
  30
);

productManager.addProduct(
  "Producto Zeta",
  "Descripción Zeta",
  13000,
  "imagen_zeta.jpg",
  88888,
  12
);

productManager.addProduct(
  "Producto Eta",
  "Descripción Eta",
  45000,
  "imagen_eta.jpg",
  44444,
  18
);

productManager.addProduct(
  "Producto Theta",
  "Descripción Theta",
  36000,
  "imagen_theta.jpg",
  33333,
  14
);

productManager.addProduct(
  "Producto Iota",
  "Descripción Iota",
  69000,
  "imagen_iota.jpg",
  77777,
  20
);

productManager.addProduct(
  "Producto Kappa",
  "Descripción Kappa",
  80000,
  "imagen_kappa.jpg",
  66666,
  22
);

module.exports = productManager;