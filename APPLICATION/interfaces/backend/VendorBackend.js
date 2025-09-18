export default class VendorBackend {
  /**
   * @param {Object} vendorData
   * @returns {Promise<Object>} Registered vendor
   */
  async registerVendor(vendorData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} vendorId
   * @returns {Promise<Object>} Vendor profile
   */
  async getVendor(vendorId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} vendorId
   * @param {Object} updates
   * @returns {Promise<Object>} Updated vendor profile
   */
  async updateVendor(vendorId, updates) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} vendorId
   * @returns {Promise<Array>} List of vendor products
   */
  async getVendorProducts(vendorId) {
    throw new Error("Method not implemented.");
  }
}
