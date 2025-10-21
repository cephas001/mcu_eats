export default class CartItem {
  constructor({
    id,
    productId,
    quantity,
    unitPrice,
    // isCombo,
    // comboItems = [], // ARRAY OF COMBO ITEMS (CHECK DOMAIN)
    // notes,
  }) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    // this.isCombo = isCombo;
    // this.comboItems = comboItems;
    // this.notes = notes;
  }
}
