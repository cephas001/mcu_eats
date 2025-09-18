export default class ProfileRepository {
  /**
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  async createProfile(profileData) {
    throw new Error("Method not implemented.");
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
  async findByUserIdAndType(userId, type) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @param {Object} updateData
   * @returns {Promise<Object>}
   */
  async updateProfile(id, updateData) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async deleteProfile(id) {
    throw new Error("Method not implemented.");
  }

  /**
   * @param {String} type
   * @returns {Promise<Array>}
   */
  async getProfilesByType(type) {
    throw new Error("Method not implemented.");
  }

  /**
   * @returns {Promise<Array>}
   */
  async getAllProfiles() {
    throw new Error("Method not implemented.");
  }
}
