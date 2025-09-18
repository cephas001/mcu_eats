import { formatProfileDataForStorage } from "../presenters/formatProfileDataForStorage.js";
import { formatVendorProfileDataForStorage } from "../presenters/formatVendorProfileDataForStorage.js";

export default class UserBackend {
  constructor(api) {
    this.api = api;
  }

  // Create a new user
  async createUser(userData) {
    try {
      return await this.api.request("/users", {
        method: "POST",
        body: { userData },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      return await this.api.request(`/users/${id}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a user
  async deleteUser(id) {
    try {
      return await this.api.request(`/users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update user details
  async updateUser(id, updates) {
    try {
      return await this.api.request(`/users/${id}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Deactivate a user
  async deactivateUser(id) {
    try {
      return await this.api.request(`/users/${id}/deactivate`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // Reactivate a user
  async reactivateUser(id) {
    try {
      return await this.api.request(`/users/${id}/reactivate`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // Ban a user
  async banUser(id, reason) {
    try {
      return await this.api.request(`/users/${id}/ban`, {
        method: "POST",
        body: { reason },
      });
    } catch (error) {
      throw error;
    }
  }

  // Unban a user
  async unbanUser(id) {
    try {
      return await this.api.request(`/users/${id}/unban`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // List users by role
  async listUsersByRole(role) {
    try {
      return await this.api.request(`/users/role/${role}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Search users by query
  async searchUsers(query) {
    try {
      return await this.api.request("/users/search", {
        method: "POST",
        body: { query },
      });
    } catch (error) {
      throw error;
    }
  }
}
