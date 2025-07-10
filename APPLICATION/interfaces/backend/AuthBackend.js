export default class AuthBackend {
  /**
   * @param {String} token
   * @returns {Promise<Object>}
   */
  async verifyToken(token) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} token
   * @returns {Promise<Object>}
   */
  async login(token) {
    throw new Error("Method not implemented");
  }
}
