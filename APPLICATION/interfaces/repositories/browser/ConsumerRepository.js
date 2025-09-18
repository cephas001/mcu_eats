export default class ConsumerRepository {
  /**
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async createConsumerProfile(profileData) {
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
   * @param {String} vendorId
   * @returns {Promise<Array>}
   */
  async getConsumersByVendor(vendorId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateConsumer(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteConsumer(id) {
    throw new Error("Method not implemented.");
  }
}
