import LocalUserRepository from "../../../APPLICATION/interfaces/repositories/local/LocalUserRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";

export default class IndexedDBUserRepository extends LocalUserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeUser(userData) {
    try {
      throw new Error("Method not implemented.");
      return;
      await this.db.user.clear();
      await this.db.user.put(stringifyArrays(userData));
      return this.db.user.toArray();
    } catch (error) {
      throw error;
    }
  }

  async clearUser() {
    try {
      await this.db.user.clear();
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      const userFromIndexDB = await this.db.user?.toArray();
      if (userFromIndexDB && userFromIndexDB?.length > 0) {
        return userFromIndexDB[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
