import ProfileRepository from "../../../APPLICATION/interfaces/repositories/browser/ProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

import { formatProfileDataForStorage } from "../presenters/formatProfileDataForStorage.js";

export default class IndexedDBProfileRepository extends ProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async createUserProfiles(userProfiles) {
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

  async storeUserProfile(userProfile) {
    try {
      const formattedProfile = formatProfileDataForStorage(userProfile);

      await this.db.profiles.add(stringifyArrays(formattedProfile));

      return {
        savedProfile: userProfile,
        profileId: userProfile.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async checkForStoredUserProfile(userId, type) {
    try {
      const profile = await this.db.profiles.where({ userId, type }).toArray();
      return profile.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserProfiles() {
    try {
      await this.db.profiles.clear();
    } catch (error) {
      throw error;
    }
  }

  async getUserProfiles(userId) {
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

  async retrieveProfileById(profileId) {
    try {
      const profile = await this.db.profiles.get(profileId);
      return profile ? parseArrays(profile) : null;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfileByType(userId, type) {
    try {
      const profile = await this.db.profiles.where({ type }).toArray();
      return profile?.length > 0 ? parseArrays(profile[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async selectUserProfile(userProfile) {
    try {
      await this.db.selectedProfile.put(stringifyArrays(userProfile));
    } catch (error) {
      throw error;
    }
  }

  async clearUserSelectedProfile() {
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

  async clearVendorProfiles() {
    try {
      await this.db.vendors.clear();
    } catch (error) {
      throw error;
    }
  }

  async overwriteStoredUserProfile(profileId, newProfileValue) {
    try {
      await this.db.profiles.put({ id: profileId, ...newProfileValue });
      const profile = await this.db.profiles.get(profileId);
      return profile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
