export default class PaymentBackend {
  /**
   * @param {Object} paymentDetails
   * @returns {Promise<Object>} Payment confirmation or error
   */
  async initiatePayment(paymentDetails) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} transactionId
   * @returns {Promise<Object>} Payment status
   */
  async verifyPayment(transactionId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Array>} List of past transactions
   */
  async getPaymentHistory(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} transactionId
   * @returns {Promise<Object>} Refund result
   */
  async issueRefund(transactionId) {
    throw new Error("Method not implemented.");
  }
}
