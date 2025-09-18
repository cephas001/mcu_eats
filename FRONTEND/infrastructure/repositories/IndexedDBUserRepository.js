import UserRepository from "../../../APPLICATION/interfaces/repositories/browser/UserRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBUserRepository extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async createUser(user) {
    try {
      await this.db.user.clear();
      await this.db.user.put(stringifyArrays(user));
      return parseArrays(await this.db.user.toArray());
    } catch (error) {
      throw error;
    }
  }

  async deleteUser() {
    try {
      await this.db.user.clear();
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
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
