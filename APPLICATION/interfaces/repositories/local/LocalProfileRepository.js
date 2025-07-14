export default class LocalProfileRepository {
  /**
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async storeProfiles(profileData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {Object} profileToAdd
   * @returns {Promise<Object>}
   */
  async addProfile(profileToAdd) {
    throw new Error("Method not implemented");
  }

  /**
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} userId
   * @param {String} type
   * @returns {Promise<Object|null>}
   */
  async checkProfileByUserId(userId, type) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateProfileData
   * @returns {Promise<Object>}
   */
  async update(id, updateProfileData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async delete(id) {
    throw new Error("Method not implemented.");
  }
}
// This file defines the UserRepository interface, which outlines the methods for managing user profiles in the application.
