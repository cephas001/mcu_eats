import UserRepository from "../../../APPLICATION/interfaces/repositories/local/UserRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBUserRepository extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeUser(userData) {
    try {
      await this.db.user.put(stringifyArrays(userData));
      return parseArrays(await this.db.user.toArray());
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

  async getUser(id) {
    try {
      if (id) {
        const user = await this.db.user.get(id);
        return user ? parseArrays(user) : null;
      }
      const userFromIndexDB = await this.db.user.toArray();

      if (userFromIndexDB?.length > 0) {
        return parseArrays(userFromIndexDB[0]);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      if (id) {
        await this.db.user.update(id, stringifyArrays(userData));
        return parseArrays(await this.db.user.get(id));
      }
      await this.db.user.put(stringifyArrays(userData));
      return parseArrays(await this.db.user.toArray()[0]);
    } catch (error) {
      throw error;
    }
  }
}
