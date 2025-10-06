export default class Product {
  constructor({
    id,
    vendorId,
    name,
    description,
    price,
    isCombo,
    comboItems = [], // ARRAY OF COMBO ITEMS (CHECK DOMAIN)
    category,
    isAvailable,
    isArchived = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.vendorId = vendorId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.isCombo = isCombo;
    this.comboItems = comboItems;
    this.category = category;
    this.isArchived = isArchived;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
