export default class UserBackend {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async registerUser(userData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} email
   * @returns {Promise<Object>}
   */
  async getUserByEmail(email) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} token
   * @returns {Promise<Object>}
   */
  async verifyToken(token) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async createProfile(profileData) {
    throw new Error("Method not implemented");
  }

  /**
   * @param {String} token
   * @returns {Promise<Object>}
   */
  async login(token) {
    throw new Error("Method not implemented");
  }
}
