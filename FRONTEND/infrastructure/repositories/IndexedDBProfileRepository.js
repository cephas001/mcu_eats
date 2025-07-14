import LocalProfileRepository from "../../../APPLICATION/interfaces/repositories/local/LocalProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";

export default class IndexedDBProfileRepository extends LocalProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeProfiles(userProfiles) {
    try {
      await this.db.profiles.clear();
      const stringifiedUserProfiles = userProfiles.map((profileData) => {
        return stringifyArrays(profileData);
      });
      await this.db.profiles.bulkPut(stringifiedUserProfiles);
    } catch (error) {
      throw error;
    }
  }

  async addProfile(profileData) {
    try {
      if (!profileData) {
        throw new Error("Profile data not defined");
      }
      await this.db.profiles.add(stringifyArrays(profileData));
    } catch (error) {
      throw error;
    }
  }
}
