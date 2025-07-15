export default class LocalMessageRepository {
  /**
   * @param {String} Message
   * @returns {Promise<Object>}
   */
  async saveMessage(userData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async deleteMessage(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @returns {Promise<Array|null>}
   */
  async getMessages() {
    throw new Error("Method not implemented.");
  }
}
