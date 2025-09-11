import UserBackend from "../../../APPLICATION/interfaces/backend/UserBackend.js";
import { formatProfileDataForStorage } from "../presenters/formatProfileDataForStorage.js";
import { formatVendorProfileDataForStorage } from "../presenters/formatVendorProfileDataForStorage.js";

export default class ExpressUserBackend extends UserBackend {
  constructor(api) {
    super();
    this.api = api;
  }

  async registerUser(userData) {
    try {
      return await this.api.request("/users", {
        method: "POST",
        body: { userData },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.api.request("/get/user/email", {
        method: "POST",
        body: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createUserProfile(profileData) {
    try {
      const { savedProfile, updatedUser } = await this.api.request("/profile", {
        method: "POST",
        body: { profileData },
      });

      const formattedProfile = formatProfileDataForStorage(savedProfile);

      return { createdProfile: formattedProfile, updatedUser };
    } catch (error) {
      throw error;
    }
  }

  async getProfilesDataByProfileIds(profileIds) {
    try {
      const profiles = await this.api.request("/get/profile/data/profileIds", {
        method: "POST",
        body: { profileIds },
      });

      return formatProfileDataForStorage(profiles);
    } catch (error) {
      throw error;
    }
  }

  async getUserProfiles(userId, profileTypes) {
    try {
      const profiles = await this.api.request("/user/profiles", {
        method: "POST",
        body: { userId, profileTypes },
      });

      return formatProfileDataForStorage(profiles);
    } catch (error) {
      throw error;
    }
  }

  async getProfilesDataByType({ type, userId } = {}) {
    try {
      const profiles = await this.api.request("/get/profile/data/type", {
        method: "POST",
        body: { type, userId },
      });

      return formatProfileDataForStorage(profiles);
    } catch (error) {
      throw error;
    }
  }

  async getVendorProfiles() {
    try {
      const profiles = await this.api.request("/vendors", {
        method: "GET",
        body: {},
      });

      return formatVendorProfileDataForStorage(profiles);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newUserData) {
    try {
      return await this.api.request(`/users/${userId}`, {
        method: "PUT",
        body: { id: userId, userData: newUserData },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile({ userId, profileType, profileId, data }) {
    try {
      const updatedProfile = await this.api.request("/user/profile", {
        method: "PUT",
        body: { userId, profileType, profileId, data },
      });

      return formatProfileDataForStorage(updatedProfile);
    } catch (error) {
      throw error;
    }
  }
}
