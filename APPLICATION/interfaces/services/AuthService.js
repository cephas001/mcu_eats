export default class AuthService {
  /**
   * @param {string} email
   * @param {string} password
   * @returns {token}
   */
  async loginWithEmailAndPassword(email, password) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async signUp(email, password) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} token
   *  @returns {Promise<Object>}
   */
  async verifyToken(token) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getUser(id) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} email
   * @returns {Promise<Object>}
   */
  async getUserByEmail(email) {
    throw new Error("Not implemented");
  }
}
