export default class DeliveryBackend {
  /**
   * @param {String} orderId
   * @returns {Promise<Object>} Assigned delivery person
   */
  async assignDelivery(orderId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} deliveryPersonId
   * @returns {Promise<Array>} List of assigned deliveries
   */
  async getDeliveries(deliveryPersonId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} deliveryId
   * @returns {Promise<Object>} Delivery status
   */
  async trackDelivery(deliveryId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} deliveryId
   * @param {String} status
   * @returns {Promise<Object>} Updated delivery
   */
  async updateDeliveryStatus(deliveryId, status) {
    throw new Error("Method not implemented.");
  }
}
