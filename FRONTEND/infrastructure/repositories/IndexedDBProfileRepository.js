import LocalProfileRepository from "../../../APPLICATION/interfaces/repositories/local/LocalProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";

export default class IndexedDBProfileRepository extends LocalProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeProfiles(userProfiles) {
    try {
      this.db.profiles.clear();
      const stringifiedUserProfiles = userProfiles.map((profileData) => {
        return stringifyArrays(profileData);
      });
      this.db.profiles.bulkPut(stringifiedUserProfiles);
    } catch (error) {
      throw error;
    }
  }
}
