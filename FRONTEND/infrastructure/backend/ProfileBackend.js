export default class ProfileBackend {
  constructor(api) {
    this.api = api;
  }

  // Get a profile by ID
  async getProfileById(profileId) {
    try {
      return await this.api.request(`/profiles/${profileId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all profiles for a user
  async getUserProfiles(userId) {
    try {
      return await this.api.request(`/users/${userId}/profiles`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get profiles by type
  async getProfilesByType(type) {
    try {
      return await this.api.request(`/profiles/type/${type}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Find a profile by user and type
  async findProfileByUserAndType(userId, type) {
    try {
      return await this.api.request(`/users/${userId}/profiles/type/${type}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a profile by ID
  async deleteProfile(profileId) {
    try {
      return await this.api.request(`/profiles/${profileId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete all profiles of a specific type
  async deleteProfilesByType(type) {
    try {
      return await this.api.request(`/profiles/type/${type}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }
}
