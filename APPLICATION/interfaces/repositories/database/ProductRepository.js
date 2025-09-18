export default class ProductRepository {
  /**
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  async createProduct(productData) {
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
  async getProductsByVendor(vendorId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} query
   * @returns {Promise<Array>}
   */
  async searchProducts(query) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateProduct(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteProduct(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Boolean} isAvailable
   * @returns {Promise<Object>}
   */
  async setProductAvailability(id, isAvailable) {
    throw new Error("Method not implemented.");
  }
}
