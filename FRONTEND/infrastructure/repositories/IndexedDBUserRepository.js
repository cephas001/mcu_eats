import UserRepository from "../../../APPLICATION/interfaces/repositories/local/UserRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBUserRepository extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeUser(user) {
    try {
      await this.db.user.put(stringifyArrays(user));
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

  async retrieveUserById(id) {
    try {
      const user = await this.db.user.get(id);
      return user ? parseArrays(user) : null;
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
