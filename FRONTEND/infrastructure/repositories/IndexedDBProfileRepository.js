import ProfileRepository from "../../../APPLICATION/interfaces/repositories/local/ProfileRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

import { formatProfileDataForStorage } from "../presenters/formatProfileDataForStorage.js";

export default class IndexedDBProfileRepository extends ProfileRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async storeUserProfiles(userProfiles) {
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

  async addProfileToStoredUserProfiles(userProfile) {
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

  async clearUserProfiles() {
    try {
      await this.db.profiles.clear();
    } catch (error) {
      throw error;
    }
  }

  async retrieveUserProfiles(userId) {
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

  async retrieveUserProfileByType(type) {
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

  async retrieveUserSelectedProfile() {
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

  async storeVendorProfiles(vendorProfiles) {
    try {
      const stringifiedVendorProfiles = vendorProfiles.map((profileData) =>
        stringifyArrays(profileData)
      );

      await this.db.vendors.bulkPut(stringifiedVendorProfiles);

      return parseArrays(await this.db.vendors.toArray());
    } catch (error) {
      throw error;
    }
  }

  async retrieveVendorProfiles() {
    try {
      const vendorProfiles = await this.db.vendors.toArray();
      if (vendorProfiles && vendorProfiles.length > 0) {
        const profilesToReturn = vendorProfiles.map((profile) =>
          parseArrays(profile)
        );
        return profilesToReturn;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateStoredUserProfile(profileId, newProfileValue) {
    await this.db.profiles.update(profileId, newProfileValue);
    const profile = await this.db.profiles.get(profileId);
    return profile;
  }
}
