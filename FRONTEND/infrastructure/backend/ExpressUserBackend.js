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
        body: userData,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.api.request("/getUserByEmail", {
        method: "POST",
        body: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      return await this.api.request("/verifyToken", {
        method: "POST",
        body: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async createProfile(profileData) {
    try {
      return await this.api.request("/profile", {
        method: "POST",
        body: profileData,
      });
    } catch (error) {
      throw error;
    }
  }
}
