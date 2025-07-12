export default class LocalUserRepository {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async storeUser(userData) {
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
   * @param {String} profileId
   * @param {String} userId
   * @returns {Promise<Object|null>}
   */
  async linkProfile(userId, profileId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async update(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} user
   * @returns {Promise<Boolean>}
   */
  async userHasProfile(user) {
    throw new Error("Method not implemented.");
  }
}
