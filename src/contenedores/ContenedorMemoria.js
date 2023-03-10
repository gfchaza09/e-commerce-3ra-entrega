class ContenedorMemoria {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  async list(id) {
    const producto = this.productos.find((prod) => prod.id === parseInt(id));
    return producto ? producto : null;
  }

  async listAll() {
    return this.productos;
  }

  async save(prod) {
    let timestamp = Date.now();
    const productoNuevo = { ...prod, id: ++this.id, timestamp };
    this.productos.push(productoNuevo);
    return productoNuevo.id;
  }

  async update(prod, id) {
    const productoAModificar = this.productos.find(
      (producto) => producto.id === parseInt(id)
    );
    if (productoAModificar) {
      const productos = this.productos.filter(
        (producto) => producto.id !== parseInt(id)
      );
      this.productos = productos;
      this.productos.push({ ...prod, id: parseInt(id), timestamp: Date.now() });
      return productoAModificar;
    } else {
      return null;
    }
  }

  async delete(id) {
    const productoABorrar = this.productos.find(
      (producto) => producto.id === parseInt(id)
    );
    if (productoABorrar) {
      const productos = this.productos.filter(
        (prod) => prod.id !== parseInt(id)
      );
      this.productos = productos;
      return productoABorrar;
    } else {
      return null;
    }
  }

  async deleteAll() {
    this.productos = [];
  }
}

export default ContenedorMemoria;
