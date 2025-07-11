import LocalUserRepository from "../../../APPLICATION/interfaces/repositories/local/LocalUserRepository";
import { db } from "../../utils/db";

export default class IndexedDBUserRepository extends LocalUserRepository {
  constructor() {
    super();
  }

  async saveUser(userData) {
    console.log(userData);
  }
}
