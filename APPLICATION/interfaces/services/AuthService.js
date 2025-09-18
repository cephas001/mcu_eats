export default class AuthService {
  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<string>} Auth token
   */
  async loginWithEmailAndPassword(email, password) {
    throw new Error("Not implemented");
  }

  /**
   * @param {Object} credentials { email, password }
   * @returns {Promise<Object>} Newly created user
   */
  async signUpUserWithEmailAndPassword({ email, password }) {
    throw new Error("Not implemented");
  }

  /**
   * @param {Object} provider
   * @returns {Promise<Object>} Newly created user via OAuth provider
   */
  async signUpUserWithProvider(provider) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} token
   * @returns {Promise<Object>} Decoded user/session info
   */
  async verifyToken(token) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} token
   * @returns {Promise<string>} Refreshed token
   */
  async refreshToken(token) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} userId
   * @returns {Promise<void>} Ends user session
   */
  async logout(userId) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} email
   * @returns {Promise<void>} Sends password reset link
   */
  async sendPasswordReset(email) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} token
   * @param {string} newPassword
   * @returns {Promise<void>} Resets password
   */
  async resetPassword(token, newPassword) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<Object>} Fetches user profile
   */
  async getUser(id) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} email
   * @returns {Promise<Object>} Fetches user by email
   */
  async getUserByEmail(email) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} userId
   * @returns {Promise<Array>} List of roles or permissions
   */
  async getUserRoles(userId) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} userId
   * @param {string} role
   * @returns {Promise<void>} Assigns role to user
   */
  async assignRole(userId, role) {
    throw new Error("Not implemented");
  }
}
