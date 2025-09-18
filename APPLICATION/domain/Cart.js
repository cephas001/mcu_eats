export default class Cart {
  constructor({
    id,
    userId,
    items = [], // ARRAY OF CART ITEMS (CHECK DOMAIN)
    totalPrice,
    createdAt = new Date(),
    updatedAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
