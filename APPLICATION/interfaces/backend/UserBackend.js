export default class UserBackend {
  /**
   * @param {String} email
   * @returns {Promise<Object>} User profile
   */
  async getUserByEmail(email) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Object>} User profile
   */
  async getUser(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {Object} updates
   * @returns {Promise<Object>} Updated user profile
   */
  async updateUser(userId, updates) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} profileData
   * @returns {Promise<Object>} Created profile
   */
  async createProfile(profileData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Object>} Deleted user
   */
  async deleteUser(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} query
   * @returns {Promise<Array>} Search results
   */
  async searchUsers(query) {
    throw new Error("Method not implemented.");
  }
}
