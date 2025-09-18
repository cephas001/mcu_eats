export default class OrderBackend {
  /**
   * @param {Object} orderData
   * @returns {Promise<Object>} Created order
   */
  async placeOrder(orderData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} orderId
   * @returns {Promise<Object>} Order details
   */
  async getOrder(orderId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Array>} List of user's orders
   */
  async getUserOrders(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} orderId
   * @param {String} status
   * @returns {Promise<Object>} Updated order
   */
  async updateOrderStatus(orderId, status) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} orderId
   * @returns {Promise<Object>} Cancelled order
   */
  async cancelOrder(orderId) {
    throw new Error("Method not implemented.");
  }
}
