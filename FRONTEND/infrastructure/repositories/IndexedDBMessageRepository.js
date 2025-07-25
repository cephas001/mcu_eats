import MessageRepository from "../../../APPLICATION/interfaces/repositories/local/MessageRepository.js";

export default class IndexedDBMessageRepository extends MessageRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async saveMessage(message, type) {
    try {
      const existingMessages = await this.checkForExistingMessage(message);
      if (existingMessages.length > 0) return;
      await this.db.messages.add({ message, createdAt: Date.now(), type });
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

  async getMessages(type) {
    try {
      if (type) {
        const messages = await this.db.messages
          .where("type")
          .equals(type)
          .toArray();
        return messages;
      }
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

  async clearMessages(type) {
    try {
      if (type) {
        return await db.messages.where("type").equals(type).delete();
      }
      return await this.db.messages.clear();
    } catch (error) {
      throw error;
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
