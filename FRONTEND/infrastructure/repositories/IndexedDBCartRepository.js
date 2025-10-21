export default class IndexedDBCartRepository {
  constructor(db) {
    this.db = db;
  }

  async addItemToCart(cartId, cartItem) {
    try {
      const cartItemId = await this.db.cartItems.add(cartItem);
      const cartItemAdded = await this.db.cartItems.get(cartItemId);
      return { cartItem: cartItemAdded, cartItemId };
    } catch (error) {
      throw new Error("Error adding item to cart: " + error.message);
    }
  }

  async checkProductInCart(cartId, productId) {
    try {
      const productInCart = await this.db.cartItems
        .where({ productId: productId })
        .first();
      return !!productInCart;
    } catch (error) {
      throw new Error("Error checking product in cart: " + error.message);
    }
  }

  async getProductInCart(cartId, productId) {
    try {
      const product = await this.db.cartItems
        .where({ productId: productId })
        .first();
      return product || null;
    } catch (error) {
      throw new Error("Error getting product in cart: " + error.message);
    }
  }

  async updateCartItem(cartId, productId, itemData) {
    try {
      const productInCart = await this.db.cartItems
        .where({ productId: productId })
        .first();

      if (!productInCart) {
        throw new Error("Product not found in cart");
      }

      const updatedData = { ...productInCart, ...itemData };
      await this.db.cartItems.put(updatedData);
      return { cartItem: updatedData, cartItemId: updatedData.id };
    } catch (error) {
      throw new Error("Error updating cart item: " + error.message);
    }
  }
}
