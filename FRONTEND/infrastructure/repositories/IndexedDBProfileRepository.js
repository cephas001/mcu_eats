import LocalProfileRepository from "../../../APPLICATION/interfaces/repositories/local/LocalProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBProfileRepository extends LocalProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeProfiles(userProfiles) {
    try {
      await this.db.profiles.clear();
      const stringifiedUserProfiles = userProfiles.map((profileData) =>
        stringifyArrays(profileData)
      );
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

  async clearProfiles() {
    try {
      await this.db.profiles.clear();
    } catch (error) {
      throw error;
    }
  }

  async getProfiles() {
    try {
      const profiles = await this.db.profiles.toArray();
      if (profiles && profiles.length > 1) {
        const profilesToReturn = profiles.map((profile) =>
          parseArrays(profile)
        );
        return profilesToReturn;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async selectProfile(id) {
    try {
      const profiles = await this.getProfiles();
      if (!profiles) return null;
      const profile = await profiles.find(profile);
      await this.db.selectedProfile.clear();
      return await this.db.selectedProfile.add(stringifyArrays(profile));
    } catch (error) {
      throw error;
    }
  }

  async getSelectedProfile() {
    try {
      const profiles = await this.db.selectedProfile.toArray();
      return profiles;
    } catch (error) {
      throw error;
    }
  }
}
