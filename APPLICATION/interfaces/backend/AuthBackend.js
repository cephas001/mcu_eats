export default class AuthBackend {
  /**
   * @param {String} token
   * @returns {Promise<Object>} Decoded user info or session
   */
  async verifyToken(token) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} token
   * @returns {Promise<Object>} Authenticated user session
   */
  async login(token) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} credentials { email, password }
   * @returns {Promise<Object>} Authenticated user session
   */
  async loginWithCredentials(credentials) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} userData
   * @returns {Promise<Object>} Newly registered user
   */
  async register(userData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} email
   * @returns {Promise<void>} Sends password reset link
   */
  async sendPasswordReset(email) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} token
   * @param {String} newPassword
   * @returns {Promise<void>} Resets password
   */
  async resetPassword(token, newPassword) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<void>} Logs out the user
   */
  async logout(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @returns {Promise<Object>} Fetches current session or profile
   */
  async getCurrentUser(userId) {
    throw new Error("Method not implemented.");
  }
}
