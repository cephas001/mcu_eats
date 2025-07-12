import LocalUserRepository from "../../../APPLICATION/interfaces/repositories/local/LocalUserRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";

export default class IndexedDBUserRepository extends LocalUserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeUser(userData) {
    try {
      await this.db.user.clear();
      await this.db.user.put(stringifyArrays(userData));
      return this.db.user.toArray();
    } catch (error) {
      throw error;
    }
  }
}
