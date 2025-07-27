import ProfileRepository from "../../../APPLICATION/interfaces/repositories/local/ProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBProfileRepository extends ProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeProfiles(userProfiles) {
    try {
      const stringifiedUserProfiles = userProfiles.map((profileData) =>
        stringifyArrays(profileData)
      );

      await this.db.profiles.bulkPut(stringifiedUserProfiles);

      return parseArrays(await this.db.profiles.toArray());
    } catch (error) {
      throw error;
    }
  }

  async addProfile(profileData) {
    try {
      await this.db.profiles.add(stringifyArrays(profileData));
      return {
        savedProfile: profileData,
        profileId: profileData.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async existsByUserIdAndType(userId, type) {
    try {
      const profile = await this.db.profiles.where({ userId, type }).toArray();
      return profile.length > 0;
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

  async getProfile(profileId) {
    try {
      const profile = await this.db.profiles.get(profileId);
      return profile ? parseArrays(profile) : null;
    } catch (error) {
      throw error;
    }
  }

  async getProfileByType(type) {
    try {
      const profile = await this.db.profiles.where({ type }).toArray();
      return profile?.length > 0 ? parseArrays(profile[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async selectProfile(profileData) {
    try {
      await this.db.selectedProfile.put(stringifyArrays(profileData));
    } catch (error) {
      throw error;
    }
  }

  async clearSelectedProfile() {
    try {
      await this.db.selectedProfile.clear();
    } catch (error) {
      throw error;
    }
  }

  async getSelectedProfile() {
    try {
      const selectedProfile = await this.db.selectedProfile.toArray();
      return selectedProfile ? parseArrays(selectedProfile[0]) : null;
    } catch (error) {
      throw error;
    }
  }
}
