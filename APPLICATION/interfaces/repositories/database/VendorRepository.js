export default class VendorRepository {
  /**
   * @param {Object} vendorData
   * @returns {Promise<Object>}
   */
  async createVendor(vendorData) {
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
   * @returns {Promise<Array>}
   */
  async getAllVendors() {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} query
   * @returns {Promise<Array>}
   */
  async searchVendors(query) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateVendor(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteVendor(id) {
    throw new Error("Method not implemented.");
  }
}
