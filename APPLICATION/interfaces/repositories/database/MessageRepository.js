export default class MessageRepository {
  /**
   * @param {Object} messageData
   * @returns {Promise<Object>}
   */
  async createMessage(messageData) {
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
   * @param {String} userId
   * @returns {Promise<Array>}
   */
  async getMessagesByUser(userId) {
    throw new Error("Method not implemented.");
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAllMessages() {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateMessage(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteMessage(id) {
    throw new Error("Method not implemented.");
  }
}
