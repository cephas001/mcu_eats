export default class UserRepository {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
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
   * @param {String} email
   * @returns {Promise<Object|null>}
   */
  async findByEmail(email) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {String} profileId
   * @returns {Promise<Object>}
   */
  async linkProfileToUser(userId, profileId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateUser(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteUser(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Boolean>}
   */
  async userHasProfile(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} query
   * @returns {Promise<Array>}
   */
  async searchUsers(query) {
    throw new Error("Method not implemented.");
  }
}
