export default class OrderRepository {
  /**
   * @param {Object} orderData
   * @returns {Promise<Object>}
   */
  async createOrder(orderData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Array>}
   */
  async getOrdersByUser(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} vendorId
   * @returns {Promise<Array>}
   */
  async getOrdersByVendor(vendorId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} deliveryPersonId
   * @returns {Promise<Array>}
   */
  async getOrdersByDeliveryPerson(deliveryPersonId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {String} status
   * @returns {Promise<Object>}
   */
  async updateOrderStatus(id, status) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Object>}
   */
  async cancelOrder(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} status
   * @returns {Promise<Array>}
   */
  async listOrdersByStatus(status) {
    throw new Error("Method not implemented.");
  }
}
