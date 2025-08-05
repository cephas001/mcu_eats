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

  /**
   * @param {String} type
   * @returns {Promise<Array|null>}
   */
  async getProfilesDataByType(type) {
    throw new Error("Method not implemented.");
  }
}
