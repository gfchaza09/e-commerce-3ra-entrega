class MemoriaDAO {
  constructor() {
    this.items = [];
    this.id = 0;
  }

  async list(id) {
    const itemSearch = this.items.find((item) => item.id === parseInt(id));
    return itemSearch ? itemSearch : null;
  }

  async listAll() {
    return this.items;
  }

  async save(item) {
    let timestamp = Date.now();
    const newItem = { ...item, id: ++this.id, timestamp };
    this.items.push(newItem);
    return newItem.id;
  }

  async update(itemUpdate, id) {
    const itemForUpdate = this.items.find((item) => item.id === parseInt(id));
    if (itemForUpdate) {
      const listItemsForUpdate = this.items.filter(
        (item) => item.id !== parseInt(id)
      );
      this.items = listItemsForUpdate;
      this.items.push({
        ...itemUpdate,
        id: parseInt(id),
        timestamp: Date.now(),
      });
      return itemForUpdate;
    } else {
      return null;
    }
  }

  async delete(id) {
    const itemForDelete = this.items.find((item) => item.id === parseInt(id));
    if (itemForDelete) {
      const items = this.items.filter((item) => item.id !== parseInt(id));
      this.items = items;
      return itemForDelete;
    } else {
      return null;
    }
  }

  async deleteAll() {
    this.items = [];
  }
}

export default MemoriaDAO;
