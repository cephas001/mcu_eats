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
      if (profiles && profiles.length > 0) {
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

  async selectProfile(type) {
    try {
      const profiles = await this.getProfiles();
      if (!profiles) throw new Error("No profiles found");
      const profile = await profiles.find((profile) => profile.type === type);
      if (!profile) throw new Error("Profile not found");
      await this.db.selectedProfile.clear();
      await this.db.selectedProfile.add(stringifyArrays(profile));
      return parseArrays(profile);
    } catch (error) {
      throw error;
    }
  }

  async getSelectedProfile() {
    try {
      const profiles = await this.getProfiles();
      if (!profiles || profiles.length === 0) {
        this.db.selectedProfile.clear();
        return null;
      }
      const selectedProfile = await this.db.selectedProfile.toArray();
      if (!selectedProfile || selectedProfile.length === 0) return null;
      return parseArrays(selectedProfile[0]);
    } catch (error) {
      throw error;
    }
  }
}
