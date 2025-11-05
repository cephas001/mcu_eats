export default class DeliveryPersonRepository {
  /**
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async createDeliveryPerson(profileData) {
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
   * @param {String} area
   * @returns {Promise<Array>}
   */
  async getAvailableByArea(area) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateDeliveryPerson(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteDeliveryPerson(id) {
    throw new Error("Method not implemented.");
  }
}
