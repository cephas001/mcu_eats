export default class CartRepository {
  /**
   * @param {String} userId
   * @returns {Promise<Object|null>}
   */
  async getCartByUser(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {Object} cartItem
   * @returns {Promise<Object>}
   */
  async addItemToCart(userId, cartItem) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {Object} cartItem
   * @returns {Promise<Object>}
   */
  async updateCartItem(userId, cartItem) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {String} productId
   * @returns {Promise<Boolean>}
   */
  async removeItemFromCart(userId, productId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Boolean>}
   */
  async clearCart(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Boolean>}
   */
  async deleteCart(userId) {
    throw new Error("Method not implemented.");
  }
}
