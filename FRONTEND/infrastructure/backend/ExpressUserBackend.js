import UserBackend from "../../../APPLICATION/interfaces/backend/UserBackend.js";

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
      return await this.api.request("/profile", {
        method: "POST",
        body: { profileData },
      });
    } catch (error) {
      throw error;
    }
  }

  async getProfilesDataByProfileIds(profileIds) {
    try {
      return await this.api.request("/get/profile/data/profileIds", {
        method: "POST",
        body: { profileIds },
      });
    } catch (error) {
      throw error;
    }
  }

  async getProfilesDataByType({ type, userId } = {}) {
    try {
      return await this.api.request("/get/profile/data/type", {
        method: "POST",
        body: { type, userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async getVendorProfiles() {
    try {
      return await this.api.request("/vendors", {
        method: "GET",
        body: {},
      });
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
}
