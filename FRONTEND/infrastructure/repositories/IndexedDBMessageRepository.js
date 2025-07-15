import LocalMessageRepository from "../../../APPLICATION/interfaces/repositories/local/LocalMessageRepository.js";

export default class IndexedDBMessageRepository extends LocalMessageRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async saveMessage(message) {
    try {
      const existingMessages = await this.checkForExistingMessage(message);
      if (existingMessages.length > 0) return;
      await this.db.messages.add({ message, createdAt: Date.now() });
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id) {
    try {
      await this.db.messages.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async getMessages() {
    try {
      const messages = await this.db.messages.toArray();
      const messagesToBeReturned = messages.map((message) => {
        return {
          message: message.message,
          createdAt: new Date(message.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      });
      return messagesToBeReturned;
    } catch (error) {
      throw error;
    }
  }

  async clearMessages() {
    try {
      return await this.db.messages.clear();
    } catch (error) {
      throw error;
      s;
    }
  }

  async checkForExistingMessage(message) {
    try {
      return await this.db.messages.where("message").equals(message).toArray();
    } catch (error) {
      throw error;
    }
  }
}
